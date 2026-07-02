import { reactive } from 'vue'

export const store = reactive({
  // State
  shipments: [],
  currentTracking: null,
  isAuthenticated: false,
  adminUser: null,
  loading: false,
  error: null,

  // Actions
  async fetchShipments() {
    this.loading = true
    try {
      const response = await fetch('http://localhost:3000/api/shipments')
      this.shipments = await response.json()
    } catch (error) {
      this.error = error.message
    } finally {
      this.loading = false
    }
  },

  async trackShipment(trackingNumber) {
    this.loading = true
    try {
      const response = await fetch(`http://localhost:3000/api/tracking/${trackingNumber}`)
      const data = await response.json()
      
      if (data.error) {
        this.error = data.error
        this.currentTracking = null
      } else {
        this.currentTracking = data
        this.error = null
      }
      return data
    } catch (error) {
      this.error = error.message
      this.currentTracking = null
      return { error: error.message }
    } finally {
      this.loading = false
    }
  },

  async createShipment(shipmentData) {
    this.loading = true
    try {
      const response = await fetch('http://localhost:3000/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shipmentData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        await this.fetchShipments()
        return data
      } else {
        throw new Error(data.error || 'Failed to create shipment')
      }
    } catch (error) {
      this.error = error.message
      throw error
    } finally {
      this.loading = false
    }
  },

  async updateShipmentStatus(trackingNumber, status, comment) {
    this.loading = true
    try {
      const response = await fetch(`http://localhost:3000/api/update-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ trackingNumber, status, comment })
      })
      
      const data = await response.json()
      
      if (data.success) {
        await this.fetchShipments()
        if (this.currentTracking?.tracking_number === trackingNumber) {
          await this.trackShipment(trackingNumber)
        }
      } else {
        throw new Error(data.error || 'Failed to update status')
      }
      
      return data
    } catch (error) {
      this.error = error.message
      throw error
    } finally {
      this.loading = false
    }
  },

  async deleteShipment(trackingNumber) {
    this.loading = true
    try {
      const response = await fetch(`http://localhost:3000/api/delete-shipment`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ trackingNumber })
      })
      
      const data = await response.json()
      
      if (data.success) {
        await this.fetchShipments()
        if (this.currentTracking?.tracking_number === trackingNumber) {
          this.currentTracking = null
        }
      } else {
        throw new Error(data.error || 'Failed to delete shipment')
      }
      
      return data
    } catch (error) {
      this.error = error.message
      throw error
    } finally {
      this.loading = false
    }
  },

  async adminLogin(credentials) {
    this.loading = true
    try {
      const response = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      
      const data = await response.json()
      
      if (data.success) {
        this.isAuthenticated = true
        this.adminUser = data.user
        localStorage.setItem('adminToken', data.token)
      } else {
        throw new Error(data.error || 'Login failed')
      }
      
      return data
    } catch (error) {
      this.error = error.message
      throw error
    } finally {
      this.loading = false
    }
  },

  adminLogout() {
    this.isAuthenticated = false
    this.adminUser = null
    localStorage.removeItem('adminToken')
  },

  checkAuth() {
    const token = localStorage.getItem('adminToken')
    if (token) {
      this.isAuthenticated = true
    }
  },

  clearError() {
    this.error = null
  }
})
