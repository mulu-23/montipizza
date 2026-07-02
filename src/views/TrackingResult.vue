<template>
  <div class="tracking-result">
    <div class="tracking-header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
          </div>
          <router-link to="/" class="back-home">← Back to Home</router-link>
        </div>
      </div>
    </div>

    <div class="tracking-content">
      <div class="container">
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>Loading tracking information...</p>
        </div>

        <div v-else-if="error" class="error-container">
          <div class="error-message">
            <h2>Tracking Error</h2>
            <p>{{ error }}</p>
            <router-link to="/track" class="back-btn">Try Another Tracking Number</router-link>
          </div>
        </div>

        <div v-else-if="trackingData" class="tracking-details">
          <div class="order-info">
            <h2>ORDER TRACKING</h2>
            <p class="tracking-number">Tracking: {{ trackingData.tracking_number }}</p>
            
            <div class="status-timeline">
              <div 
                v-for="(status, index) in statusSteps" 
                :key="status"
                class="status-step"
                :class="getStatusClass(index)"
              >
                {{ getStatusText(status) }}
              </div>
            </div>
            
            <div class="order-details">
              <div class="order-detail-item">
                <strong>Current Status</strong>
                {{ getStatusText(trackingData.status) }}
              </div>
              <div class="order-detail-item">
                <strong>Customer Name</strong>
                {{ trackingData.receiver_name }}
              </div>
              <div class="order-detail-item">
                <strong>Delivery Address</strong>
                {{ trackingData.receiver_address }}
              </div>
              <div class="order-detail-item">
                <strong>Phone</strong>
                {{ trackingData.receiver_phone || 'Not provided' }}
              </div>
              <div class="order-detail-item">
                <strong>Order</strong>
                {{ trackingData.description || 'Pizza order' }}
              </div>
              <div class="order-detail-item">
                <strong>Order Date</strong>
                {{ formatDate(trackingData.created_at) }}
              </div>
              <div class="order-detail-item">
                <strong>Estimated Delivery</strong>
                {{ getEstimatedDelivery() }}
              </div>
            </div>
          </div>

          <div class="map-section">
            <h3>Live Tracking</h3>
            <div id="map" class="map-container"></div>
          </div>

          <div class="delivery-info">
            <div class="delivery-status">
              <span class="status-badge" :class="trackingData.status">
                {{ getStatusText(trackingData.status) }}
              </span>
            </div>
            <div class="eta" id="eta-info">
              {{ getEtaMessage() }}
            </div>
          </div>

          <div v-if="trackingData.history && trackingData.history.length > 0" class="history-section">
            <h3>Order History</h3>
            <div class="timeline">
              <div 
                v-for="(item, index) in trackingData.history" 
                :key="index"
                class="timeline-item"
              >
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <div class="timeline-status">{{ item.status }}</div>
                  <div class="timeline-comment">{{ item.comment }}</div>
                  <div class="timeline-date">{{ formatDate(item.created_at) }}</div>
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
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../store'

const route = useRoute()
const trackingData = ref(null)
const loading = ref(true)
const error = ref('')
const map = ref(null)
const marker = ref(null)
const animationInterval = ref(null)
const updateInterval = ref(null)

const statusSteps = ['pending', 'processing', 'in_transit', 'delivered']

const getStatusClass = (index) => {
  const currentStatusIndex = statusSteps.indexOf(trackingData.value?.status)
  if (index < currentStatusIndex) return 'completed'
  if (index === currentStatusIndex) return 'active'
  return ''
}

const getStatusText = (status) => {
  const statusMap = {
    'pending': 'Order Received',
    'processing': 'Preparing Your Pizza',
    'in_transit': 'On The Way',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled'
  }
  return statusMap[status] || status
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getEstimatedDelivery = () => {
  if (trackingData.value?.status === 'delivered') {
    return 'Delivered'
  }
  
  const orderDate = new Date(trackingData.value?.created_at)
  const estimatedTime = new Date(orderDate.getTime() + 45 * 60000) // 45 minutes
  return formatDate(estimatedTime)
}

const getEtaMessage = () => {
  if (!trackingData.value) return ''
  
  switch (trackingData.value.status) {
    case 'pending':
      return 'Order received - preparing to start cooking'
    case 'processing':
      return 'Your pizza is being prepared with fresh ingredients'
    case 'in_transit':
      return 'Courier is on the way - estimated arrival: 15-25 minutes'
    case 'delivered':
      return 'Order delivered successfully! Enjoy your pizza!'
    default:
      return 'Processing your order'
  }
}

const initMap = () => {
  if (!trackingData.value || typeof L === 'undefined') return

  // Initialize map centered on Nalchik
  map.value = L.map('map').setView([43.485, 43.607], 13)
  
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map.value)
  
  // Restaurant location
  const restaurantPoint = [43.485, 43.607]
  const deliveryPoint = [
    43.485 + (Math.random() - 0.5) * 0.05,
    43.607 + (Math.random() - 0.5) * 0.05
  ]
  
  // Restaurant marker
  L.marker(restaurantPoint, {
    icon: L.divIcon({
      html: '<div style="background: #b81b1b; width: 12px; height: 12px; border: 2px solid white; border-radius: 0;"></div>',
      iconSize: [16, 16],
      className: ''
    })
  }).addTo(map.value).bindPopup('<b>MontoPizza</b><br>Restaurant')
  
  // Delivery location marker
  L.marker(deliveryPoint, {
    icon: L.divIcon({
      html: '<div style="background: #2c2c2c; width: 12px; height: 12px; border: 2px solid white; border-radius: 0;"></div>',
      iconSize: [16, 16],
      className: ''
    })
  }).addTo(map.value).bindPopup('<b>Delivery Address</b><br>' + trackingData.value.receiver_address)
  
  // Courier marker (if in transit)
  if (trackingData.value.status === 'in_transit') {
    marker.value = L.marker(restaurantPoint, {
      icon: L.divIcon({
        html: '<div style="background: #b81b1b; width: 10px; height: 10px; border: 2px solid white;"></div>',
        iconSize: [14, 14],
        className: ''
      })
    }).addTo(map.value).bindPopup('<b>Your Order</b><br>Courier in transit')
    
    startAnimation(restaurantPoint, deliveryPoint)
  }
  
  // Fit map to show both points
  const bounds = L.latLngBounds([restaurantPoint, deliveryPoint])
  map.value.fitBounds(bounds, { padding: [50, 50] })
}

const startAnimation = (startPoint, endPoint) => {
  if (!marker.value) return
  
  let currentStep = 0
  const totalSteps = 50
  
  animationInterval.value = setInterval(() => {
    if (currentStep <= totalSteps) {
      const lat = startPoint[0] + (endPoint[0] - startPoint[0]) * (currentStep / totalSteps)
      const lng = startPoint[1] + (endPoint[1] - startPoint[1]) * (currentStep / totalSteps)
      marker.value.setLatLng([lat, lng])
      
      // Update ETA
      const remainingSteps = totalSteps - currentStep
      const etaMinutes = Math.round((remainingSteps / totalSteps) * 25)
      const etaElement = document.getElementById('eta-info')
      if (etaElement) {
        etaElement.textContent = `Estimated arrival: ${etaMinutes} minutes`
      }
      
      currentStep++
    } else {
      clearInterval(animationInterval.value)
      const etaElement = document.getElementById('eta-info')
      if (etaElement) {
        etaElement.textContent = 'Arriving soon!'
      }
    }
  }, 500)
}

const loadTrackingData = async () => {
  const trackingNumber = route.params.id
  if (!trackingNumber) {
    error.value = 'No tracking number provided'
    loading.value = false
    return
  }

  try {
    const result = await store.trackShipment(trackingNumber)
    if (result.error) {
      error.value = result.error
    } else {
      trackingData.value = result
      
      // Initialize map after data is loaded
      setTimeout(() => {
        initMap()
      }, 100)
      
      // Start auto-update if not delivered
      if (result.status !== 'delivered') {
        startAutoUpdate()
      }
    }
  } catch (err) {
    error.value = 'Failed to load tracking information'
  } finally {
    loading.value = false
  }
}

const startAutoUpdate = () => {
  updateInterval.value = setInterval(async () => {
    try {
      const result = await store.trackShipment(route.params.id)
      if (result.error) {
        console.error('Update failed:', result.error)
      } else {
        trackingData.value = result
        
        // Stop updates if delivered
        if (result.status === 'delivered') {
          clearInterval(updateInterval.value)
        }
      }
    } catch (err) {
      console.error('Auto-update error:', err)
    }
  }, 10000) // Update every 10 seconds
}

onMounted(() => {
  // Load Leaflet CSS and JS
  const leafletCSS = document.createElement('link')
  leafletCSS.rel = 'stylesheet'
  leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
  document.head.appendChild(leafletCSS)
  
  const leafletJS = document.createElement('script')
  leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
  leafletJS.onload = loadTrackingData
  document.head.appendChild(leafletJS)
})

onUnmounted(() => {
  if (animationInterval.value) {
    clearInterval(animationInterval.value)
  }
  if (updateInterval.value) {
    clearInterval(updateInterval.value)
  }
})

watch(() => route.params.id, () => {
  loadTrackingData()
})
</script>

<style scoped>
.tracking-result {
  min-height: 100vh;
  background: #f5f5f5;
}

.tracking-header {
  background: #b81b1b;
  padding: 20px 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo img {
  height: 70px;
  width: auto;
  filter: brightness(0) invert(1);
}

.back-home {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 20px;
  border: 2px solid white;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.back-home:hover {
  background: white;
  color: #b81b1b;
}

.tracking-content {
  padding: 40px 0;
}

.loading {
  text-align: center;
  padding: 50px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #b81b1b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  text-align: center;
  padding: 50px;
}

.error-message {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  max-width: 500px;
  margin: 0 auto;
}

.error-message h2 {
  color: #b81b1b;
  margin-bottom: 15px;
}

.back-btn {
  display: inline-block;
  margin-top: 20px;
  background: #b81b1b;
  color: white;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.back-btn:hover {
  background: #8b0000;
}

.tracking-details {
  max-width: 1200px;
  margin: 0 auto;
}

.order-info {
  background: white;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  border-radius: 12px;
}

.order-info h2 {
  color: #b81b1b;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.tracking-number {
  font-size: 1rem;
  background: #f0f0f0;
  padding: 8px 15px;
  display: inline-block;
  font-family: monospace;
  letter-spacing: 1px;
  margin-bottom: 15px;
  border-radius: 6px;
}

.status-timeline {
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
  flex-wrap: wrap;
  gap: 5px;
}

.status-step {
  flex: 1;
  text-align: center;
  padding: 12px;
  background: #e0e0e0;
  position: relative;
  font-weight: 600;
  font-size: 0.85rem;
  border-radius: 6px;
}

.status-step.active {
  background: #b81b1b;
  color: white;
}

.status-step.completed {
  background: #67a148;
  color: white;
}

.order-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.order-detail-item {
  padding: 12px;
  background: #f9f9f9;
  border-left: 3px solid #b81b1b;
  border-radius: 6px;
}

.order-detail-item strong {
  display: block;
  color: #b81b1b;
  margin-bottom: 5px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.map-section {
  background: white;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  border-radius: 12px;
}

.map-section h3 {
  color: #b81b1b;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.map-container {
  height: 450px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.delivery-info {
  background: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}

.delivery-status {
  display: flex;
  align-items: center;
  gap: 15px;
}

.status-badge {
  padding: 6px 15px;
  font-weight: bold;
  font-size: 0.85rem;
  border-radius: 20px;
  text-transform: uppercase;
}

.status-badge.pending {
  background: #ffc107;
  color: #333;
}

.status-badge.processing {
  background: #17a2b8;
  color: white;
}

.status-badge.in_transit {
  background: #b81b1b;
  color: white;
}

.status-badge.delivered {
  background: #28a745;
  color: white;
}

.eta {
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.history-section {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}

.history-section h3 {
  color: #b81b1b;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e0e0e0;
}

.timeline-item {
  position: relative;
  margin-bottom: 25px;
}

.timeline-marker {
  position: absolute;
  left: -22px;
  top: 5px;
  width: 16px;
  height: 16px;
  background: #b81b1b;
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.timeline-content {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid #b81b1b;
}

.timeline-status {
  font-weight: 600;
  color: #b81b1b;
  margin-bottom: 5px;
}

.timeline-comment {
  color: #666;
  margin-bottom: 8px;
  line-height: 1.5;
}

.timeline-date {
  color: #999;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .status-timeline {
    flex-direction: column;
  }
  
  .order-details {
    grid-template-columns: 1fr;
  }
  
  .map-container {
    height: 350px;
  }
  
  .delivery-info {
    flex-direction: column;
    text-align: center;
  }
  
  .header-content {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
