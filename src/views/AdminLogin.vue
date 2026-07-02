<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="logo">
            <img src="/images/logo.png" alt="MontoPizza">
          </div>
          <h2>Admin Login</h2>
          <p>Access MontoPizza Admin Panel</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              v-model="credentials.username" 
              placeholder="Enter your username"
              required
              :disabled="loading"
            >
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              v-model="credentials.password" 
              placeholder="Enter your password"
              required
              :disabled="loading"
            >
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              class="login-btn" 
              :disabled="loading"
            >
              {{ loading ? 'Signing in...' : 'Sign In' }}
            </button>
          </div>
        </form>

        <div class="login-footer">
          <router-link to="/" class="back-link">
            ← Back to Website
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const credentials = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  if (!credentials.username.trim() || !credentials.password.trim()) {
    error.value = 'Please enter both username and password'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await store.adminLogin(credentials)
    router.push('/admin')
  } catch (err) {
    error.value = err.message || 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  background: linear-gradient(135deg, #b81b1b 0%, #8b0000 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  overflow: hidden;
}

.login-header {
  background: #f8f9fa;
  padding: 40px 30px;
  text-align: center;
  border-bottom: 1px solid #e9ecef;
}

.logo img {
  height: 60px;
  width: auto;
  margin-bottom: 20px;
}

.login-header h2 {
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.login-header p {
  color: #666;
  font-size: 1rem;
  margin: 0;
}

.login-form {
  padding: 40px 30px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #b81b1b;
}

.form-group input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
  font-size: 0.9rem;
}

.form-actions {
  margin-top: 30px;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: #b81b1b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  background: #8b0000;
  transform: translateY(-2px);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.login-footer {
  padding: 20px 30px;
  background: #f8f9fa;
  text-align: center;
  border-top: 1px solid #e9ecef;
}

.back-link {
  color: #b81b1b;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #8b0000;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-card {
    margin: 10px;
  }
  
  .login-header,
  .login-form,
  .login-footer {
    padding: 30px 20px;
  }
  
  .login-header h2 {
    font-size: 1.5rem;
  }
}
</style>
