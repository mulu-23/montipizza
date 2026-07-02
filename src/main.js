// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import AppNavigation from './components/AppNavigation.vue'

const app = createApp(App)
app.use(router)
app.component('AppNavigation', AppNavigation) // Глобальная регистрация
app.provide('store', store)
app.mount('#app')