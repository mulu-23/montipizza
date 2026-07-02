<!-- src/components/HeroSection.vue -->
<template>
  <div class="hero">
    <div class="content">
      <header>
        <div class="logo">
          <img src="/images/logo.png" alt="MontoPizza Logo">
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
      </header>

      <div class="center-block">
        <div class="text-line-1">Zamów pizzę z pieca - prosto do domu!</div>
        <div class="text-line-2">Delicious pizza at MontoPizza - Nalchik</div>
        <div class="pizza-image">
          <img src="/images/pizza.png" alt="Appetizing pizza MontoPizza">
        </div>
      </div>

      <a href="tel:+79640417047" class="call-button-mobile">
        <div class="green-circle">
          <svg viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </div>
        <span class="phone-number">7 964 041 7047</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showNavigation = ref(false)

const toggleNavigation = () => {
  showNavigation.value = !showNavigation.value
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  background: url('/images/fon.png') center center / cover no-repeat;
  position: relative;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px 10px 40px;
  flex-wrap: wrap;
  gap: 30px;
}

.logo {
  flex-shrink: 0;
  transition: transform 0.2s ease;
  max-width: 220px;
}

.logo img {
  height: auto;
  width: 100%;
  max-width: 200px;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
}

.main-nav {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex: 1;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  transition: 0.2s;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  white-space: nowrap;
  position: relative;
  padding: 10px 0;
  cursor: pointer;
}

.nav-link:hover {
  color: #ffd966;
}

.nav-link.admin-link {
  background: rgba(255,255,255,0.2);
  padding: 8px 16px;
  border-radius: 6px;
}

.nav-link.admin-link:hover {
  background: rgba(255,255,255,0.3);
}

.call-button-header {
  background: rgb(255, 255, 255);
  border-radius: 50px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transition: all 0.25s ease;
  flex-shrink: 0;
}

.green-circle {
  width: 42px;
  height: 42px;
  background: #4cac4f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}

.green-circle svg {
  width: 22px;
  height: 22px;
  fill: rgb(255, 255, 255);
}

.phone-number {
  color: #1e2a1f;
  font-weight: 800;
  font-size: 1rem;
  letter-spacing: 0.3px;
  font-family: monospace;
}

.center-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  margin-top: 0;
}

.text-line-1 {
  font-family: 'Segoe Script', 'Brush Script MT', 'Comic Neue', cursive;
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.98);
  margin-bottom: 15px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  font-weight: 600;
}

.text-line-2 {
  font-family: 'Impact', 'Arial Black', 'Roboto Black', sans-serif;
  font-size: 3rem;
  color: white;
  letter-spacing: 1px;
  margin-bottom: 30px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  white-space: nowrap;
  text-transform: uppercase;
}

.pizza-image {
  max-width: 1000px;
  width: 100%;
  margin: 20px auto;
  filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5));
  transition: all 0.3s;
}

.pizza-image img {
  width: 100%;
  display: block;
  border-radius: 30px;
}

.call-button-mobile {
  display: none;
  background: rgb(255, 255, 255);
  border-radius: 50px;
  padding: 12px 24px;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  width: fit-content;
  margin: 0 auto 30px auto;
  border: 1px solid rgba(0,0,0,0.1);
}

@media (max-width: 780px) {
  .call-button-header {
    display: none;
  }
  
  .call-button-mobile {
    display: flex;
  }
  
  .main-nav {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: #b81b1b;
    flex-direction: column;
    padding: 20px;
    gap: 15px;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    z-index: 1000;
  }
  
  .main-nav.active {
    transform: translateY(0);
  }
  
  .nav-link {
    display: block;
    padding: 12px 16px;
    border-radius: 6px;
  }
  
  .text-line-2 {
    font-size: 1.8rem;
    white-space: normal;
  }
  
  .text-line-1 {
    font-size: 1.2rem;
  }
  
  header {
    padding: 15px 20px;
  }
}
</style>