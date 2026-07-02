<!-- src/components/AppNavigation.vue -->
<template>
  <header class="app-header">
    <div class="header-container">
      <div class="header-content">
        <div class="logo">
          <router-link to="/">
            <img src="/images/logo.png" alt="MontoPizza Logo">
          </router-link>
        </div>
          
        <nav class="main-nav" :class="{ active: showNavigation }">
          <router-link to="/" class="nav-link" @click="toggleNavigation">Home</router-link>
          <router-link to="/about" class="nav-link" @click="toggleNavigation">About</router-link>
          <router-link to="/services" class="nav-link" @click="toggleNavigation">Services</router-link>
          <router-link to="/contact" class="nav-link" @click="toggleNavigation">Contact</router-link>
          <router-link to="/track" class="nav-link" @click="toggleNavigation">Track</router-link>
          <router-link to="/faq" class="nav-link" @click="toggleNavigation">FAQ</router-link>
          <router-link to="/admin/login" class="nav-link admin-link" @click="toggleNavigation">Admin</router-link>
        </nav>
          
        <a href="tel:+79640417047" class="call-button-header">
          <div class="green-circle">
            <svg viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </div>
          <span class="phone-number">7 964 041 7047</span>
        </a>

        <button class="mobile-menu-btn" :class="{ active: showNavigation }" @click="toggleNavigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const showNavigation = ref(false)

const toggleNavigation = () => {
  showNavigation.value = !showNavigation.value
  // Блокируем прокрутку body при открытом меню на мобильных
  if (showNavigation.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.app-header {
  background: #b81b1b;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 15px 40px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.logo {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.logo img {
  height: 100px;
  width: auto;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
  transition: height 0.3s ease;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex: 1;
  justify-content: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  white-space: nowrap;
  padding: 8px 0;
  position: relative;
}



.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 80%;
}

.nav-link.router-link-active {
  color: #ffd966;
}

.nav-link.admin-link {
  background: rgba(255,255,255,0.15);
  padding: 8px 16px;
  border-radius: 25px;
}

.nav-link.admin-link::after {
  display: none;
}

.nav-link.admin-link:hover {
  background: rgba(255,255,255,0.25);
  transform: translateY(-2px);
}

.nav-link.admin-link.router-link-active {
  background: rgba(255,255,255,0.25);
}

.call-button-header {
  background: white;
  border-radius: 50px;
  padding: 6px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  transition: all 0.25s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.call-button-header:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.green-circle {
  width: 36px;
  height: 36px;
  background: #4cac4f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.green-circle svg {
  width: 18px;
  height: 18px;
  fill: white;
}

.phone-number {
  color: #1e2a1f;
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 0.3px;
  font-family: monospace;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  gap: 5px;
  z-index: 1001;
}

.mobile-menu-btn span {
  width: 25px;
  height: 3px;
  background: white;
  transition: 0.3s;
  border-radius: 3px;
}

/* Анимация бургер-меню */
.mobile-menu-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* ========== АДАПТИВНОСТЬ ========== */

/* Планшеты и небольшие десктопы */
@media (max-width: 1024px) {
  .header-container {
    padding: 12px 30px;
  }
  
  .logo img {
    height: 45px;
  }
  
  .main-nav {
    gap: 1rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
  
  .call-button-header {
    padding: 5px 12px;
  }
  
  .green-circle {
    width: 32px;
    height: 32px;
  }
  
  .green-circle svg {
    width: 16px;
    height: 16px;
  }
  
  .phone-number {
    font-size: 0.85rem;
  }
}

/* Мобильные устройства */
@media (max-width: 780px) {
  .header-container {
    padding: 12px 20px;
  }
  
  .logo img {
    height: 40px;
  }
  
  .call-button-header {
    display: none;
  }
  
  .main-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(184, 27, 27, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: center;
    padding: 80px 20px 40px;
    gap: 25px;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    overflow-y: auto;
  }
  
  .main-nav.active {
    transform: translateX(0);
  }
  
  .nav-link {
    font-size: 1.2rem;
    padding: 12px 20px;
    width: 100%;
    text-align: center;
    border-radius: 10px;
  }
  
  .nav-link::after {
    bottom: 8px;
  }
  
  .nav-link.admin-link {
    width: auto;
    min-width: 150px;
    margin-top: 10px;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
}

/* Маленькие мобильные */
@media (max-width: 480px) {
  .header-container {
    padding: 10px 15px;
  }
  
  .logo img {
    height: 35px;
  }
  
  .main-nav {
    gap: 20px;
    padding: 70px 15px 30px;
  }
  
  .nav-link {
    font-size: 1rem;
    padding: 10px 15px;
  }
  
  .mobile-menu-btn span {
    width: 22px;
    height: 2.5px;
  }
}

/* Альбомная ориентация на мобильных */
@media (max-width: 780px) and (orientation: landscape) {
  .main-nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    padding: 60px 20px 20px;
  }
  
  .nav-link {
    width: auto;
    font-size: 0.9rem;
    padding: 8px 16px;
  }
  
  .nav-link.admin-link {
    margin-top: 0;
  }
}
</style>