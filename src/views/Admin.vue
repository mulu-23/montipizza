<template>
  <div class="admin-dashboard">
    <div class="admin-header">
      <div class="header-content">
        <div class="logo">
          <img src="/images/logo.png" alt="MontoPizza">
          <h1>Admin Panel</h1>
        </div>
        <div class="header-actions">
          <span class="admin-user">{{ store.adminUser?.username }}</span>
          <button @click="handleLogout" class="logout-btn">Logout</button>
        </div>
      </div>
    </div>

    <div class="admin-content">
      <div class="container">
        <div class="admin-nav">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            :class="['nav-tab', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>

        <!-- Dashboard Tab -->
        <div v-if="activeTab === 'dashboard'" class="tab-content">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📦</div>
              <div class="stat-info">
                <h3>{{ stats.totalOrders }}</h3>
                <p>Total Orders</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🚚</div>
              <div class="stat-info">
                <h3>{{ stats.inTransit }}</h3>
                <p>In Transit</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-info">
                <h3>{{ stats.delivered }}</h3>
                <p>Delivered</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏱️</div>
              <div class="stat-info">
                <h3>{{ stats.avgDeliveryTime }}m</h3>
                <p>Avg Delivery Time</p>
              </div>
            </div>
          </div>

          <div class="recent-orders">
            <h2>Recent Orders</h2>
            <div class="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Tracking #</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in recentOrders" :key="order.tracking_number">
                    <td>{{ order.tracking_number }}</td>
                    <td>{{ order.receiver_name }}</td>
                    <td>
                      <span class="status-badge" :class="order.status">
                        {{ getStatusText(order.status) }}
                      </span>
                    </td>
                    <td>{{ formatDate(order.created_at) }}</td>
                    <td>
                      <button @click="editOrder(order)" class="action-btn edit">Edit</button>
                      <button @click="deleteOrder(order)" class="action-btn delete">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Add Order Tab -->
        <div v-if="activeTab === 'add'" class="tab-content">
          <div class="form-section">
            <h2>Add New Order</h2>
            <form @submit.prevent="handleAddOrder" class="admin-form">
              <div class="form-grid">
                <div class="form-group">
                  <label>Tracking Number</label>
                  <input 
                    type="text" 
                    v-model="newOrder.tracking_number" 
                    readonly
                    class="readonly-input"
                  >
                </div>
                <div class="form-group">
                  <label>Receiver Name *</label>
                  <input 
                    type="text" 
                    v-model="newOrder.receiver_name" 
                    required
                  >
                </div>
                <div class="form-group">
                  <label>Receiver Phone *</label>
                  <input 
                    type="tel" 
                    v-model="newOrder.receiver_phone" 
                    required
                  >
                </div>
                <div class="form-group">
                  <label>Receiver Email</label>
                  <input 
                    type="email" 
                    v-model="newOrder.receiver_email" 
                  >
                </div>
                <div class="form-group full-width">
                  <label>Receiver Address *</label>
                  <input 
                    type="text" 
                    v-model="newOrder.receiver_address" 
                    required
                  >
                </div>
                <div class="form-group full-width">
                  <label>Order Description</label>
                  <textarea 
                    v-model="newOrder.description" 
                    rows="3"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label>Weight (kg)</label>
                  <input 
                    type="number" 
                    v-model="newOrder.weight" 
                    step="0.1"
                    min="0"
                  >
                </div>
                <div class="form-group">
                  <label>Status *</label>
                  <select v-model="newOrder.status" required>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div class="form-actions">
                <button type="submit" class="submit-btn" :disabled="loading">
                  {{ loading ? 'Creating...' : 'Create Order' }}
                </button>
                <button type="button" @click="resetForm" class="reset-btn">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Manage Orders Tab -->
        <div v-if="activeTab === 'manage'" class="tab-content">
          <div class="manage-section">
            <div class="section-header">
              <h2>Manage Orders</h2>
              <div class="search-filter">
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  placeholder="Search by tracking number or customer name..."
                  class="search-input"
                >
                <select v-model="statusFilter" class="filter-select">
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div class="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Tracking #</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in filteredOrders" :key="order.tracking_number">
                    <td>{{ order.tracking_number }}</td>
                    <td>{{ order.receiver_name }}</td>
                    <td>{{ order.receiver_phone || '-' }}</td>
                    <td>{{ order.receiver_address }}</td>
                    <td>
                      <span class="status-badge" :class="order.status">
                        {{ getStatusText(order.status) }}
                      </span>
                    </td>
                    <td>{{ formatDate(order.created_at) }}</td>
                    <td>
                      <button @click="editOrder(order)" class="action-btn edit">Edit</button>
                      <button @click="updateStatus(order)" class="action-btn update">Status</button>
                      <button @click="deleteOrder(order)" class="action-btn delete">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Settings Tab -->
        <div v-if="activeTab === 'settings'" class="tab-content">
          <div class="settings-section">
            <h2>Settings</h2>
            <div class="settings-grid">
              <div class="setting-card">
                <h3>General Settings</h3>
                <div class="setting-item">
                  <label>Restaurant Name</label>
                  <input type="text" v-model="settings.restaurantName">
                </div>
                <div class="setting-item">
                  <label>Delivery Radius (km)</label>
                  <input type="number" v-model="settings.deliveryRadius">
                </div>
                <div class="setting-item">
                  <label>Minimum Order (RUB)</label>
                  <input type="number" v-model="settings.minOrder">
                </div>
              </div>

              <div class="setting-card">
                <h3>Notification Settings</h3>
                <div class="setting-item">
                  <label>
                    <input type="checkbox" v-model="settings.emailNotifications">
                    Enable Email Notifications
                  </label>
                </div>
                <div class="setting-item">
                  <label>
                    <input type="checkbox" v-model="settings.smsNotifications">
                    Enable SMS Notifications
                  </label>
                </div>
                <div class="setting-item">
                  <label>Admin Email</label>
                  <input type="email" v-model="settings.adminEmail">
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button @click="saveSettings" class="submit-btn" :disabled="loading">
                {{ loading ? 'Saving...' : 'Save Settings' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Edit Order</h3>
          <button @click="closeModal" class="close-btn">×</button>
        </div>
        <form @submit.prevent="handleUpdateOrder" class="modal-form">
          <div class="form-group">
            <label>Tracking Number</label>
            <input type="text" v-model="editingOrder.tracking_number" readonly>
          </div>
          <div class="form-group">
            <label>Receiver Name</label>
            <input type="text" v-model="editingOrder.receiver_name" required>
          </div>
          <div class="form-group">
            <label>Receiver Phone</label>
            <input type="tel" v-model="editingOrder.receiver_phone">
          </div>
          <div class="form-group">
            <label>Receiver Address</label>
            <input type="text" v-model="editingOrder.receiver_address" required>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="editingOrder.status">
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea v-model="editingOrder.description" rows="3"></textarea>
          </div>
          <div class="modal-actions">
            <button type="submit" class="submit-btn" :disabled="loading">
              {{ loading ? 'Updating...' : 'Update Order' }}
            </button>
            <button type="button" @click="closeModal" class="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Status Update Modal -->
    <div v-if="showStatusModal" class="modal-overlay" @click="closeStatusModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Update Status</h3>
          <button @click="closeStatusModal" class="close-btn">×</button>
        </div>
        <form @submit.prevent="handleStatusUpdate" class="modal-form">
          <div class="form-group">
            <label>Tracking Number</label>
            <input type="text" v-model="statusOrder.tracking_number" readonly>
          </div>
          <div class="form-group">
            <label>New Status</label>
            <select v-model="statusUpdate.newStatus" required>
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <div class="form-group">
            <label>Comment</label>
            <textarea v-model="statusUpdate.comment" rows="3" required></textarea>
          </div>
          <div class="modal-actions">
            <button type="submit" class="submit-btn" :disabled="loading">
              {{ loading ? 'Updating...' : 'Update Status' }}
            </button>
            <button type="button" @click="closeStatusModal" class="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'

const router = useRouter()
const loading = ref(false)
const activeTab = ref('dashboard')
const searchQuery = ref('')
const statusFilter = ref('')
const showEditModal = ref(false)
const showStatusModal = ref(false)
const editingOrder = ref({})
const statusOrder = ref({})

const tabs = [
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'add', name: 'Add Order' },
  { id: 'manage', name: 'Manage Orders' },
  { id: 'settings', name: 'Settings' }
]

const stats = reactive({
  totalOrders: 0,
  inTransit: 0,
  delivered: 0,
  avgDeliveryTime: 35
})

const newOrder = reactive({
  tracking_number: '',
  receiver_name: '',
  receiver_phone: '',
  receiver_email: '',
  receiver_address: '',
  description: '',
  weight: 0,
  status: 'pending'
})

const settings = reactive({
  restaurantName: 'MontoPizza',
  deliveryRadius: 15,
  minOrder: 500,
  emailNotifications: true,
  smsNotifications: true,
  adminEmail: 'admin@montopizza.ru'
})

const statusUpdate = reactive({
  newStatus: '',
  comment: ''
})

const recentOrders = computed(() => {
  return store.shipments.slice(0, 10)
})

const filteredOrders = computed(() => {
  let orders = store.shipments
  
  if (searchQuery.value) {
    orders = orders.filter(order => 
      order.tracking_number.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.receiver_name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (statusFilter.value) {
    orders = orders.filter(order => order.status === statusFilter.value)
  }
  
  return orders
})

const generateTrackingNumber = () => {
  const prefix = 'MP'
  const timestamp = Date.now().toString().slice(-8)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix}${timestamp}${random}`
}

const getStatusText = (status) => {
  const statusMap = {
    'pending': 'Pending',
    'processing': 'Processing',
    'in_transit': 'In Transit',
    'delivered': 'Delivered'
  }
  return statusMap[status] || status
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleLogout = () => {
  store.adminLogout()
  router.push('/admin/login')
}

const handleAddOrder = async () => {
  loading.value = true
  try {
    await store.createShipment(newOrder)
    resetForm()
    activeTab.value = 'manage'
  } catch (error) {
    alert('Failed to create order: ' + error.message)
  } finally {
    loading.value = false
  }
}

const editOrder = (order) => {
  editingOrder.value = { ...order }
  showEditModal.value = true
}

const handleUpdateOrder = async () => {
  loading.value = true
  try {
    // Update order logic here
    showEditModal.value = false
    await store.fetchShipments()
  } catch (error) {
    alert('Failed to update order: ' + error.message)
  } finally {
    loading.value = false
  }
}

const updateStatus = (order) => {
  statusOrder.value = { ...order }
  statusUpdate.newStatus = ''
  statusUpdate.comment = ''
  showStatusModal.value = true
}

const handleStatusUpdate = async () => {
  loading.value = true
  try {
    await store.updateShipmentStatus(
      statusOrder.value.tracking_number,
      statusUpdate.newStatus,
      statusUpdate.comment
    )
    showStatusModal.value = false
  } catch (error) {
    alert('Failed to update status: ' + error.message)
  } finally {
    loading.value = false
  }
}

const deleteOrder = async (order) => {
  if (!confirm(`Are you sure you want to delete order ${order.tracking_number}?`)) {
    return
  }
  
  loading.value = true
  try {
    await store.deleteShipment(order.tracking_number)
  } catch (error) {
    alert('Failed to delete order: ' + error.message)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  newOrder.tracking_number = generateTrackingNumber()
  newOrder.receiver_name = ''
  newOrder.receiver_phone = ''
  newOrder.receiver_email = ''
  newOrder.receiver_address = ''
  newOrder.description = ''
  newOrder.weight = 0
  newOrder.status = 'pending'
}

const closeModal = () => {
  showEditModal.value = false
  editingOrder.value = {}
}

const closeStatusModal = () => {
  showStatusModal.value = false
  statusOrder.value = {}
  statusUpdate.newStatus = ''
  statusUpdate.comment = ''
}

const saveSettings = async () => {
  loading.value = true
  try {
    // Save settings logic here
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Settings saved successfully!')
  } catch (error) {
    alert('Failed to save settings: ' + error.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  store.checkAuth()
  if (!store.isAuthenticated) {
    router.push('/admin/login')
    return
  }
  
  newOrder.tracking_number = generateTrackingNumber()
  store.fetchShipments()
  
  // Calculate stats
  stats.totalOrders = store.shipments.length
  stats.inTransit = store.shipments.filter(o => o.status === 'in_transit').length
  stats.delivered = store.shipments.filter(o => o.status === 'delivered').length
})
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background: #f5f5f5;
}

.admin-header {
  background: #b81b1b;
  color: white;
  padding: 15px 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo img {
  height: 40px;
  width: auto;
  filter: brightness(0) invert(1);
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.admin-user {
  font-weight: 500;
}

.logout-btn {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: rgba(255,255,255,0.3);
}

.admin-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.admin-nav {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.nav-tab {
  padding: 10px 20px;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease;
}

.nav-tab:hover {
  background: #f0f0f0;
}

.nav-tab.active {
  background: #b81b1b;
  color: white;
}

.tab-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  padding: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: #f9f9f9;
  padding: 25px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
  border-left: 4px solid #b81b1b;
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-info h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 5px 0;
}

.stat-info p {
  color: #666;
  margin: 0;
  font-weight: 500;
}

.recent-orders h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.orders-table {
  overflow-x: auto;
}

.orders-table table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.orders-table th,
.orders-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.orders-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.orders-table tr:hover {
  background: #f9f9f9;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
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

.action-btn {
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  margin-right: 5px;
  transition: all 0.3s ease;
}

.action-btn.edit {
  background: #007bff;
  color: white;
}

.action-btn.update {
  background: #28a745;
  color: white;
}

.action-btn.delete {
  background: #dc3545;
  color: white;
}

.action-btn:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.form-section h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 1.5rem;
}

.admin-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #b81b1b;
}

.readonly-input {
  background: #f5f5f5;
  color: #666;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.submit-btn,
.reset-btn,
.cancel-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn {
  background: #b81b1b;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background: #8b0000;
}

.reset-btn,
.cancel-btn {
  background: #6c757d;
  color: white;
}

.reset-btn:hover,
.cancel-btn:hover {
  background: #5a6268;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.search-filter {
  display: flex;
  gap: 10px;
}

.search-input,
.filter-select {
  padding: 8px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
}

.search-input {
  width: 250px;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.setting-card {
  background: #f9f9f9;
  padding: 25px;
  border-radius: 12px;
}

.setting-card h3 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.setting-item {
  margin-bottom: 15px;
}

.setting-item label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

.setting-item input[type="text"],
.setting-item input[type="email"],
.setting-item input[type="number"] {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
}

.setting-item input[type="checkbox"] {
  margin-right: 8px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.modal-form {
  padding: 20px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .admin-nav {
    flex-wrap: wrap;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-filter {
    flex-direction: column;
  }
  
  .search-input {
    width: 100%;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .orders-table {
    font-size: 0.8rem;
  }
  
  .action-btn {
    display: block;
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>
