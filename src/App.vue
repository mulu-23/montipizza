<!-- App.vue -->
<script setup>
import { onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isHomePage = () => {
  return route.name === 'Home'
}

onMounted(() => {
  const store = inject('store')
  if (store) {
    store.checkAuth()
  }
})
</script>

<template>
  <div class="app">
    <!-- Навигация для всех страниц КРОМЕ главной -->
    <AppNavigation v-if="!isHomePage()" />
    
    <main class="main-content" :class="{ 'with-nav': !isHomePage() }">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #ffffff;
  font-family: 'Segoe UI', 'Roboto', 'Poppins', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  min-height: calc(100vh - 80px);
}

/* Дополнительный отступ для страниц с навигацией */
.main-content.with-nav {
  min-height: calc(100vh - 80px);
}

/* Убираем лишние отступы */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 780px) {
  .main-content {
    min-height: calc(100vh - 70px);
  }
  
  .main-content.with-nav {
    min-height: calc(100vh - 70px);
  }
  
  .container {
    padding: 0 15px;
  }
}
</style>