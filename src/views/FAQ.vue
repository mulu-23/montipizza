<template>
  <div class="faq-page">
    <div class="faq-header">
      <div class="container">
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about MontoPizza delivery tracking</p>
      </div>
    </div>

    <div class="faq-content">
      <div class="container">
        <div class="faq-categories">
          <div class="category-tabs">
            <button 
              v-for="category in categories" 
              :key="category.id"
              :class="['category-tab', { active: activeCategory === category.id }]"
              @click="activeCategory = category.id"
            >
              {{ category.name }}
            </button>
          </div>

          <div class="faq-items">
            <div 
              v-for="faq in filteredFaqs" 
              :key="faq.id"
              class="faq-item"
              :class="{ active: activeFaq === faq.id }"
            >
              <div class="faq-question" @click="toggleFaq(faq.id)">
                <span>{{ faq.question }}</span>
                <span class="faq-toggle">{{ activeFaq === faq.id ? '−' : '+' }}</span>
              </div>
              <div v-show="activeFaq === faq.id" class="faq-answer">
                <div v-html="faq.answer"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="help-section">
          <h2>Still Need Help?</h2>
          <div class="help-cards">
            <div class="help-card">
              <div class="help-icon">📞</div>
              <h3>Call Us</h3>
              <p>Speak with our customer service team</p>
              <a href="tel:+79640417047" class="help-btn">+7 (964) 041-70-47</a>
            </div>

            <div class="help-card">
              <div class="help-icon">✉️</div>
              <h3>Email Support</h3>
              <p>Get help via email within 24 hours</p>
              <a href="mailto:support@montopizza.ru" class="help-btn">Email Us</a>
            </div>

            <div class="help-card">
              <div class="help-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Chat with us in real-time</p>
              <button class="help-btn" @click="startChat">Start Chat</button>
            </div>
          </div>
        </div>

        <div class="info-sections">
          <div class="info-section">
            <h2>Order & Delivery</h2>
            <div class="info-grid">
              <div class="info-item">
                <h3>Delivery Time</h3>
                <p>Standard delivery time is 30-45 minutes from order confirmation. During peak hours, delivery may take up to 60 minutes.</p>
              </div>
              <div class="info-item">
                <h3>Delivery Area</h3>
                <p>We currently deliver within 15km radius of our restaurant in Nalchik. Enter your address to check if you're in our delivery zone.</p>
              </div>
              <div class="info-item">
                <h3>Minimum Order</h3>
                <p>Minimum order amount is 500 RUB for delivery. No minimum for pickup orders.</p>
              </div>
              <div class="info-item">
                <h3>Delivery Fee</h3>
                <p>Delivery is free for orders over 1500 RUB. Orders below this amount incur a 100 RUB delivery fee.</p>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h2>Payment Methods</h2>
            <div class="info-grid">
              <div class="info-item">
                <h3>Cash on Delivery</h3>
                <p>Pay cash when your order arrives. Please have exact change ready for faster service.</p>
              </div>
              <div class="info-item">
                <h3>Card Payment</h3>
                <p>We accept Visa, Mastercard, and MIR cards. Payment is processed securely when you place your order.</p>
              </div>
              <div class="info-item">
                <h3>Online Payment</h3>
                <p>Pay via our website or mobile app using various online payment methods including Yandex Pay and SberPay.</p>
              </div>
              <div class="info-item">
                <h3>Gift Cards</h3>
                <p>Use MontoPizza gift cards for online or phone orders. Gift cards can be purchased at our restaurant.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('general')
const activeFaq = ref(null)

const categories = [
  { id: 'general', name: 'General' },
  { id: 'tracking', name: 'Tracking' },
  { id: 'orders', name: 'Orders' },
  { id: 'payment', name: 'Payment' },
  { id: 'delivery', name: 'Delivery' }
]

const faqs = [
  {
    id: 1,
    category: 'general',
    question: 'What is MontoPizza?',
    answer: 'MontoPizza is a premium pizza delivery service based in Nalchik. We combine traditional pizza recipes with modern delivery technology to bring you the best pizza experience right to your doorstep.'
  },
  {
    id: 2,
    category: 'general',
    question: 'Where are you located?',
    answer: 'Our restaurant is located at 123 Pizza Street, Nalchik, Kabardino-Balkaria, 360000, Russia. We deliver within a 15km radius of our location.'
  },
  {
    id: 3,
    category: 'general',
    question: 'What are your business hours?',
    answer: 'We are open Monday-Thursday: 10:00 AM - 11:00 PM, Friday-Saturday: 10:00 AM - 1:00 AM, and Sunday: 11:00 AM - 10:00 PM.'
  },
  {
    id: 4,
    category: 'tracking',
    question: 'How do I track my order?',
    answer: 'Once you place an order, you\'ll receive a tracking number via email and SMS. Go to our website, click "Track Order", enter your tracking number, and you\'ll see real-time updates on your order status.'
  },
  {
    id: 5,
    category: 'tracking',
    question: 'What do the tracking statuses mean?',
    answer: '<strong>Pending:</strong> Order received and confirmed<br><strong>Processing:</strong> Pizza is being prepared<br><strong>In Transit:</strong> Order is on the way to you<br><strong>Delivered:</strong> Order has been successfully delivered'
  },
  {
    id: 6,
    category: 'tracking',
    question: 'How accurate is the estimated delivery time?',
    answer: 'Our estimated delivery time is highly accurate, updated in real-time based on traffic conditions and order preparation time. The system refreshes every 30 seconds to provide the most accurate ETA.'
  },
  {
    id: 7,
    category: 'orders',
    question: 'How do I place an order?',
    answer: 'You can order through our website, mobile app, or by calling us at +7 (964) 041-70-47. Online ordering is the fastest way to place your order and track it in real-time.'
  },
  {
    id: 8,
    category: 'orders',
    question: 'Can I modify or cancel my order?',
    answer: 'Yes, you can modify or cancel your order within 5 minutes of placing it. After that, please call our customer service, and we\'ll do our best to accommodate your request.'
  },
  {
    id: 9,
    category: 'orders',
    question: 'What if I\'m not satisfied with my order?',
    answer: 'Customer satisfaction is our priority. If you\'re not satisfied with your order, please contact us immediately, and we\'ll either replace the item or provide a refund.'
  },
  {
    id: 10,
    category: 'payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept cash on delivery, credit/debit cards (Visa, Mastercard, MIR), online payments (Yandex Pay, SberPay), and MontoPizza gift cards.'
  },
  {
    id: 11,
    category: 'payment',
    question: 'Is online payment secure?',
    answer: 'Yes, all online payments are processed through secure, encrypted payment gateways that comply with industry security standards. We never store your card information.'
  },
  {
    id: 12,
    category: 'payment',
    question: 'Can I get a refund?',
    answer: 'Refunds are provided for orders that don\'t meet our quality standards or for delivery issues. Please contact customer service within 30 minutes of delivery for refund requests.'
  },
  {
    id: 13,
    category: 'delivery',
    question: 'What is your delivery area?',
    answer: 'We deliver within a 15km radius of our restaurant in Nalchik. You can check if your address is within our delivery zone when placing your order online.'
  },
  {
    id: 14,
    category: 'delivery',
    question: 'How much does delivery cost?',
    answer: 'Delivery is free for orders over 1500 RUB. For orders below this amount, there\'s a 100 RUB delivery fee.'
  },
  {
    id: 15,
    category: 'delivery',
    question: 'What if my delivery is late?',
    answer: 'If your order is more than 15 minutes late, you\'ll receive a 20% discount on your next order. If it\'s more than 30 minutes late, the delivery fee is waived.'
  }
]

const filteredFaqs = computed(() => {
  return faqs.filter(faq => faq.category === activeCategory.value)
})

const toggleFaq = (faqId) => {
  activeFaq.value = activeFaq.value === faqId ? null : faqId
}

const startChat = () => {
  // Implement chat functionality
  alert('Live chat feature coming soon! Please call us for immediate assistance.')
}
</script>

<style scoped>
.faq-page {
  min-height: 100vh;
  background: #fffaf5;
}

.faq-header {
  background: linear-gradient(135deg, #b81b1b 0%, #8b0000 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.faq-header h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.faq-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.faq-content {
  padding: 60px 0;
}

.category-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.category-tab {
  padding: 12px 24px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: #666;
}

.category-tab:hover {
  border-color: #b81b1b;
  color: #b81b1b;
}

.category-tab.active {
  background: #b81b1b;
  border-color: #b81b1b;
  color: white;
}

.faq-items {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.faq-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.faq-item.active {
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  cursor: pointer;
  font-weight: 600;
  color: #333;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background: #f9f9f9;
}

.faq-toggle {
  font-size: 1.5rem;
  color: #b81b1b;
  font-weight: bold;
  min-width: 30px;
  text-align: center;
}

.faq-answer {
  padding: 0 25px 25px;
  color: #666;
  line-height: 1.8;
  border-top: 1px solid #f0f0f0;
}

.faq-answer :deep(strong) {
  color: #b81b1b;
}

.help-section {
  text-align: center;
  margin: 60px 0;
}

.help-section h2 {
  color: #b81b1b;
  font-size: 2.5rem;
  margin-bottom: 40px;
  font-weight: 600;
}

.help-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.help-card {
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  text-align: center;
  transition: transform 0.3s ease;
}

.help-card:hover {
  transform: translateY(-5px);
}

.help-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.help-card h3 {
  color: #b81b1b;
  font-size: 1.3rem;
  margin-bottom: 15px;
  font-weight: 600;
}

.help-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 25px;
}

.help-btn {
  display: inline-block;
  background: #b81b1b;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.help-btn:hover {
  background: #8b0000;
  transform: translateY(-2px);
}

.info-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 60px;
}

.info-section {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.info-section h2 {
  color: #b81b1b;
  font-size: 1.8rem;
  margin-bottom: 30px;
  font-weight: 600;
}

.info-grid {
  display: grid;
  gap: 25px;
}

.info-item h3 {
  color: #b81b1b;
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.info-item p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .faq-header h1 {
    font-size: 2rem;
  }
  
  .faq-header p {
    font-size: 1rem;
  }
  
  .category-tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .category-tab {
    width: 200px;
    text-align: center;
  }
  
  .faq-question {
    padding: 15px 20px;
  }
  
  .faq-answer {
    padding: 0 20px 20px;
  }
  
  .help-section h2 {
    font-size: 2rem;
  }
  
  .info-sections {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .info-section {
    padding: 30px 20px;
  }
}
</style>
