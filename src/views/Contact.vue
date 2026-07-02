<template>
  <div class="contact-page">
    <div class="contact-header">
      <div class="container">
        <h1>Contact Us</h1>
        <p>Get in touch with MontoPizza for orders, feedback, or support</p>
      </div>
    </div>

    <div class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>Get in Touch</h2>
            <p>We'd love to hear from you! Whether you have a question about our menu, 
               need to track an order, or want to provide feedback, we're here to help.</p>
            
            <div class="contact-items">
              <div class="contact-item">
                <div class="contact-icon location"></div>
                <div class="contact-details">
                  <h3>Address</h3>
                  <p>IT HUB College<br>Nalchik, Kabardino-Balkarian Republic<br>360000, Russia</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon phone"></div>
                <div class="contact-details">
                  <h3>Phone</h3>
                  <p>Main: +7 (964) 041-70-47<br>Orders: +7 (964) 041-70-48<br>Support: +7 (964) 041-70-49</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon email"></div>
                <div class="contact-details">
                  <h3>Email</h3>
                  <p>Orders: orders@montopizza.ru<br>Support: support@montopizza.ru<br>General: info@montopizza.ru</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon hours"></div>
                <div class="contact-details">
                  <h3>Business Hours</h3>
                  <p>Monday - Thursday: 10:00 AM - 11:00 PM<br>
                     Friday - Saturday: 10:00 AM - 01:00 AM<br>
                     Sunday: 11:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>

           
          </div>

          <div class="contact-form">
            <h2>Send us a Message</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  required 
                  placeholder="Enter your full name"
                >
              </div>

              <div class="form-group">
                <label for="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required 
                  placeholder="your.email@example.com"
                >
              </div>

              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone" 
                  placeholder="+7 (___) ___-__-__"
                >
              </div>

              <div class="form-group">
                <label for="subject">Subject</label>
                <select id="subject" v-model="form.subject" required>
                  <option value="">Select a subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="tracking">Tracking Issue</option>
                  <option value="feedback">Feedback</option>
                  <option value="complaint">Complaint</option>
                  <option value="catering">Catering Services</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">Message</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  required 
                  rows="6" 
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <div class="form-actions">
                <button type="submit" class="submit-btn" :disabled="isSubmitting">
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </button>
                <button type="button" class="reset-btn" @click="resetForm">
                  Reset Form
                </button>
              </div>
            </form>

            <div v-if="submitMessage" class="submit-message" :class="submitMessage.type">
              {{ submitMessage.text }}
            </div>
          </div>
        </div>

        <div class="map-section">
          <h2>Find Us</h2>
          <div class="map-container">
            <div id="contact-map" class="contact-map"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = '8667634213:AAGNbtRiebZ_a9eDRoS6IDRjfxAtPRGK1oE'
const TELEGRAM_CHAT_ID = '8417304518'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref(null)

const sendToTelegram = async (formData) => {
  const subjectMap = {
    'order': 'Order Inquiry',
    'tracking': 'Tracking Issue',
    'feedback': 'Feedback',
    'complaint': 'Complaint',
    'catering': 'Catering Services',
    'other': 'Other'
  }

  const messageText = `
NEW CONTACT FORM MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${subjectMap[formData.subject] || formData.subject}

Message:
${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━
Sent: ${new Date().toLocaleString('en-US')}
  `

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: messageText
    })
  })

  const data = await response.json()
  
  if (!data.ok) {
    throw new Error(data.description || 'Failed to send message')
  }
  
  return true
}

const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = null

  try {
    await sendToTelegram(form)
    
    submitMessage.value = {
      type: 'success',
      text: 'Thank you for your message! We will get back to you within 24 hours.'
    }
    
    resetForm()
  } catch (error) {
    console.error('Submit error:', error)
    submitMessage.value = {
      type: 'error',
      text: 'Sorry, there was an error sending your message. Please try again or contact us by phone.'
    }
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.keys(form).forEach(key => {
    form[key] = ''
  })
  submitMessage.value = null
}

// Инициализация Яндекс карты
const initYandexMap = () => {
  // Координаты IT HUB College, Nalchik
  // Широта: 43.485, Долгота: 43.607
  const collegeLat = 43.485
  const collegeLng = 43.607
  
  // @ts-ignore
  ymaps.ready(() => {
    // @ts-ignore
    const map = new ymaps.Map('contact-map', {
      center: [collegeLat, collegeLng],
      zoom: 16,
      controls: ['zoomControl', 'fullscreenControl']
    })
    
    // Создаем метку
    // @ts-ignore
    const placemark = new ymaps.Placemark(
      [collegeLat, collegeLng],
      {
        hintContent: 'IT HUB College',
        balloonContent: `
          <div style="padding: 10px;">
            <strong>IT HUB College</strong><br>
            Nalchik, Kabardino-Balkaria<br>
            <strong>MontoPizza</strong><br>
            <a href="https://maps.yandex.ru/?text=${collegeLat},${collegeLng}" target="_blank">Get directions</a>
          </div>
        `
      },
      {
        preset: 'islands#redCircleIcon',
        iconColor: '#b81b1b'
      }
    )
    
    map.geoObjects.add(placemark)
    
    // Добавляем круг доставки (15 км)
    // @ts-ignore
    const circle = new ymaps.Circle(
      [[collegeLat, collegeLng], 15000],
      {
        hintContent: 'Delivery Zone',
        balloonContent: 'Delivery radius: 15 km'
      },
      {
        fillColor: '#b81b1b',
        fillOpacity: 0.1,
        strokeColor: '#b81b1b',
        strokeOpacity: 0.8,
        strokeWidth: 2
      }
    )
    
    map.geoObjects.add(circle)
  })
}

// Загрузка Яндекс карт
onMounted(() => {
  // Загружаем скрипт Яндекс карт
  const script = document.createElement('script')
  script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_YANDEX_API_KEY&lang=en_US'
  script.onload = () => {
    setTimeout(initYandexMap, 100)
  }
  document.head.appendChild(script)
})
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: #fffaf5;
}

.contact-header {
  background: linear-gradient(135deg, #b81b1b 0%, #8b0000 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.contact-header h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.contact-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.contact-content {
  padding: 60px 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;
}

.contact-info h2,
.contact-form h2 {
  color: #b81b1b;
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.contact-info p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.contact-items {
  margin-bottom: 40px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.contact-icon {
  width: 50px;
  height: 50px;
  background-size: 24px;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 20px;
  flex-shrink: 0;
}

.contact-icon.location {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23b81b1b'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E");
}

.contact-icon.phone {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23b81b1b'%3E%3Cpath d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z'/%3E%3C/svg%3E");
}

.contact-icon.email {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23b81b1b'%3E%3Cpath d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'/%3E%3C/svg%3E");
}

.contact-icon.hours {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23b81b1b'%3E%3Cpath d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z'/%3E%3C/svg%3E");
}

.contact-details h3 {
  color: #b81b1b;
  font-size: 1.2rem;
  margin-bottom: 8px;
  font-weight: 600;
}

.contact-details p {
  color: #555;
  line-height: 1.5;
  margin: 0;
}

.social-links h3 {
  color: #b81b1b;
  font-size: 1.3rem;
  margin-bottom: 15px;
  font-weight: 600;
}

.social-icons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background: #f0f0f0;
  border-radius: 25px;
  font-size: 0.9rem;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.social-icon:hover {
  background: #b81b1b;
  color: white;
}

.contact-form {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #b81b1b;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.submit-btn,
.reset-btn {
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.submit-btn {
  background: #b81b1b;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-btn {
  background: #f0f0f0;
  color: #666;
}

.reset-btn:hover {
  background: #e0e0e0;
}

.submit-message {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  font-weight: 500;
}

.submit-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.submit-message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.map-section {
  text-align: center;
}

.map-section h2 {
  color: #b81b1b;
  font-size: 2.5rem;
  margin-bottom: 30px;
  font-weight: 600;
}

.map-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  overflow: hidden;
}

.contact-map {
  height: 450px;
  width: 100%;
}

@media (max-width: 768px) {
  .contact-header h1 {
    font-size: 2rem;
  }
  
  .contact-header p {
    font-size: 1rem;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .contact-form {
    padding: 30px 20px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .submit-btn,
  .reset-btn {
    width: 100%;
  }
  
  .contact-item {
    flex-direction: column;
    text-align: center;
  }
  
  .contact-icon {
    margin-right: 0;
    margin-bottom: 10px;
    align-self: center;
  }
  
  .contact-map {
    height: 350px;
  }
}
</style>