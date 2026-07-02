<template>
  <div class="track-page">
    <div class="track-header">
      <div class="container">
        <h1>Track Your Order</h1>
        <p>Enter your tracking number to see real-time delivery status</p>
      </div>
    </div>

    <div class="track-content">
      <div class="container">
        <div class="tracking-form">
          <form @submit.prevent="handleTrack">
            <div class="form-group">
              <label for="trackingNumber">Tracking Number</label>
              <div class="input-group">
                <input 
                  type="text" 
                  id="trackingNumber" 
                  v-model="trackingNumber" 
                  placeholder="Enter your tracking number (e.g., MP1234567890)"
                  required
                >
                <button type="submit" class="track-btn" :disabled="loading">
                  {{ loading ? 'Tracking...' : 'Track Order' }}
                </button>
              </div>
            </div>
          </form>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div v-if="recentTrackings.length > 0" class="recent-trackings">
            <h3>Recent Trackings</h3>
            <div class="recent-list">
              <div 
                v-for="item in recentTrackings" 
                :key="item.tracking_number"
                class="recent-item"
                @click="trackShipment(item.tracking_number)"
              >
                <span class="tracking-number">{{ item.tracking_number }}</span>
                <span class="tracking-status" :class="item.status">{{ getStatusText(item.status) }}</span>
                <span class="tracking-date">{{ formatDate(item.created_at) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="track-info">
          <div class="info-cards">
            <div class="info-card">
              <div class="info-icon">📋</div>
              <h3>How to Track</h3>
              <p>Enter your tracking number from your order confirmation email or receipt</p>
            </div>

            <div class="info-card">
              <div class="info-icon">📍</div>
              <h3>Real-Time Updates</h3>
              <p>See live location updates and estimated delivery time</p>
            </div>

            <div class="info-card">
              <div class="info-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Track your order on any device, anywhere, anytime</p>
            </div>
          </div>

          <div class="faq-section">
            <h3>Frequently Asked Questions</h3>
            <div class="faq-items">
              <div class="faq-item" @click="toggleFaq(0)">
                <div class="faq-question">
                  <span>Where can I find my tracking number?</span>
                  <span class="faq-toggle">{{ activeFaq === 0 ? '−' : '+' }}</span>
                </div>
                <div v-show="activeFaq === 0" class="faq-answer">
                  Your tracking number is sent to your email immediately after placing an order. 
                  You can also find it in your order history or on your receipt.
                </div>
              </div>

              <div class="faq-item" @click="toggleFaq(1)">
                <div class="faq-question">
                  <span>How often is tracking information updated?</span>
                  <span class="faq-toggle">{{ activeFaq === 1 ? '−' : '+' }}</span>
                </div>
                <div v-show="activeFaq === 1" class="faq-answer">
                  Tracking information is updated in real-time. The system refreshes every 30 seconds 
                  to provide you with the most current location and status updates.
                </div>
              </div>

              <div class="faq-item" @click="toggleFaq(2)">
                <div class="faq-question">
                  <span>What do the different status meanings?</span>
                  <span class="faq-toggle">{{ activeFaq === 2 ? '−' : '+' }}</span>
                </div>
                <div v-show="activeFaq === 2" class="faq-answer">
                  <strong>Pending:</strong> Order received and being prepared<br>
                  <strong>Processing:</strong> Pizza is being made<br>
                  <strong>In Transit:</strong> Order is on the way<br>
                  <strong>Delivered:</strong> Order has been successfully delivered
                </div>
              </div>

              <div class="faq-item" @click="toggleFaq(3)">
                <div class="faq-question">
                  <span>My tracking number is not working. What should I do?</span>
                  <span class="faq-toggle">{{ activeFaq === 3 ? '−' : '+' }}</span>
                </div>
                <div v-show="activeFaq === 3" class="faq-answer">
                  Double-check the tracking number for any typos. If it still doesn't work, 
                  please contact our customer support at +7 (964) 041-70-47 for assistance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'

const router = useRouter()
const trackingNumber = ref('')
const loading = ref(false)
const error = ref('')
const activeFaq = ref(-1)
const recentTrackings = ref([])

const handleTrack = async () => {
  if (!trackingNumber.value.trim()) {
    error.value = 'Please enter a tracking number'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const result = await store.trackShipment(trackingNumber.value.trim())
    
    if (result.error) {
      error.value = result.error
    } else {
      // Save to recent trackings
      saveToRecentTrackings(result)
      // Navigate to tracking result page
      router.push(`/tracking/${trackingNumber.value.trim()}`)
    }
  } catch (err) {
    error.value = 'Failed to track shipment. Please try again.'
  } finally {
    loading.value = false
  }
}

const trackShipment = (number) => {
  trackingNumber.value = number
  handleTrack()
}

const saveToRecentTrackings = (trackingData) => {
  const existing = recentTrackings.value.find(item => item.tracking_number === trackingData.tracking_number)
  if (!existing) {
    recentTrackings.value.unshift(trackingData)
    if (recentTrackings.value.length > 5) {
      recentTrackings.value = recentTrackings.value.slice(0, 5)
    }
    localStorage.setItem('recentTrackings', JSON.stringify(recentTrackings.value))
  }
}

const getStatusText = (status) => {
  const statusMap = {
    'pending': 'Order Received',
    'processing': 'Preparing',
    'in_transit': 'On the Way',
    'delivered': 'Delivered'
  }
  return statusMap[status] || status
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? -1 : index
}

onMounted(() => {
  // Load recent trackings from localStorage
  const saved = localStorage.getItem('recentTrackings')
  if (saved) {
    try {
      recentTrackings.value = JSON.parse(saved)
    } catch (e) {
      recentTrackings.value = []
    }
  }
})
</script>

<style scoped>
.track-page {
  min-height: 100vh;
  background: #fffaf5;
}

.track-header {
  background: linear-gradient(135deg, #b81b1b 0%, #8b0000 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.track-header h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.track-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.track-content {
  padding: 60px 0;
}

.tracking-form {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  margin-bottom: 40px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.input-group {
  display: flex;
  gap: 15px;
}

.input-group input {
  flex: 1;
  padding: 15px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: #b81b1b;
}

.track-btn {
  padding: 15px 30px;
  background: #b81b1b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.track-btn:hover:not(:disabled) {
  background: #8b0000;
  transform: translateY(-2px);
}

.track-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  border: 1px solid #f5c6cb;
}

.recent-trackings {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #e0e0e0;
}

.recent-trackings h3 {
  color: #b81b1b;
  font-size: 1.3rem;
  margin-bottom: 15px;
  font-weight: 600;
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.recent-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background: #f9f9f9;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.recent-item:hover {
  background: #f0f0f0;
  transform: translateX(5px);
}

.tracking-number {
  font-family: monospace;
  font-weight: 600;
  color: #333;
}

.tracking-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
}

.tracking-status.pending {
  background: #ffc107;
  color: #333;
}

.tracking-status.processing {
  background: #17a2b8;
  color: white;
}

.tracking-status.in_transit {
  background: #b81b1b;
  color: white;
}

.tracking-status.delivered {
  background: #28a745;
  color: white;
}

.tracking-date {
  color: #666;
  font-size: 0.9rem;
}

.track-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  text-align: center;
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
}

.info-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.info-card h3 {
  color: #b81b1b;
  font-size: 1.3rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.info-card p {
  color: #666;
  line-height: 1.6;
}

.faq-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.faq-section h3 {
  color: #b81b1b;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.faq-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.faq-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 600;
  color: #333;
}

.faq-question:hover {
  background: #f0f0f0;
}

.faq-toggle {
  font-size: 1.5rem;
  color: #b81b1b;
  font-weight: bold;
}

.faq-answer {
  padding: 20px;
  background: white;
  color: #666;
  line-height: 1.6;
  border-top: 1px solid #e0e0e0;
}

@media (max-width: 768px) {
  .track-header h1 {
    font-size: 2rem;
  }
  
  .track-header p {
    font-size: 1rem;
  }
  
  .tracking-form {
    padding: 30px 20px;
  }
  
  .input-group {
    flex-direction: column;
  }
  
  .track-btn {
    width: 100%;
  }
  
  .track-info {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .recent-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .faq-question {
    padding: 15px;
  }
  
  .faq-answer {
    padding: 15px;
  }
}
</style>
