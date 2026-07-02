<template>
  <div class="menu-page">
    <div class="menu-container">
      <h1 class="menu-title">OUR MENU</h1>
      <p class="menu-subtitle">Fresh & tasty every day</p>

      <!-- Категории -->
      <div class="categories-tabs">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="selectCategory(cat.id)"
          :class="{ active: selectedCategory === cat.id }"
          class="category-btn"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- Блюда -->
      <div class="menu-items-grid" v-if="!loading">
        <div v-for="item in menuItems" :key="item.id" class="menu-card">
          <div class="menu-card-content">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-description">{{ item.description }}</p>
            
            <!-- Цены (для пиццы два размера) -->
            <div class="item-price" v-if="item.price_small">
              <span class="price-small">Small: {{ item.price_small }} PLN</span>
              <span class="price-large">Large: {{ item.price_large }} PLN</span>
            </div>
            <div class="item-price" v-else>
              <span>{{ item.price }} PLN</span>
            </div>
            
            <button class="order-btn">ORDER</button>
          </div>
        </div>
      </div>

      <div v-if="loading" class="loading">Loading menu...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const categories = ref([])
const menuItems = ref([])
const selectedCategory = ref(null)
const loading = ref(true)

const API_URL = 'http://localhost:3000/api'

// Загрузка категорий
const loadCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`)
    categories.value = response.data
    if (categories.value.length > 0) {
      selectedCategory.value = categories.value[0].id
      await loadMenuItems(selectedCategory.value)
    }
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error)
  }
}

// Загрузка блюд по категории
const loadMenuItems = async (categoryId) => {
  loading.value = true
  try {
    const response = await axios.get(`${API_URL}/categories/${categoryId}/menu`)
    menuItems.value = response.data
  } catch (error) {
    console.error('Ошибка загрузки меню:', error)
  } finally {
    loading.value = false
  }
}

// Выбор категории
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  loadMenuItems(categoryId)
}

onMounted(() => {
  loadCategories()
})
</script>

<style scoped>
.menu-page {
  background: #fffaf5;
  min-height: 100vh;
  padding: 100px 5% 80px;
}

.menu-container {
  max-width: 1200px;
  margin: 0 auto;
}

.menu-title {
  text-align: center;
  font-family: 'Impact', sans-serif;
  font-size: 3rem;
  color: #b81b1b;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.menu-subtitle {
  text-align: center;
  font-family: 'Brush Script MT', cursive;
  font-size: 1.5rem;
  color: #c96f2e;
  margin-bottom: 50px;
}

.categories-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 50px;
}

.category-btn {
  padding: 10px 24px;
  border: 2px solid #b81b1b;
  background: transparent;
  color: #b81b1b;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover {
  background: #b81b1b;
  color: white;
  transform: translateY(-2px);
}

.category-btn.active {
  background: #b81b1b;
  color: white;
}

.menu-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.menu-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.menu-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
}

.menu-card-content {
  padding: 24px;
}

.item-name {
  font-family: 'Impact', sans-serif;
  font-size: 1.5rem;
  color: #2c2c2c;
  margin-bottom: 12px;
}

.item-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 16px;
}

.item-price {
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.price-small, .price-large {
  background: #f0f0f0;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: bold;
  color: #b81b1b;
  font-size: 0.9rem;
}

.order-btn {
  width: 100%;
  padding: 12px;
  background: #b81b1b;
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.order-btn:hover {
  background: #8b1515;
}

.loading {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #b81b1b;
}

@media (max-width: 780px) {
  .menu-page {
    padding-top: 60px;
  }
  
  .menu-title {
    font-size: 2rem;
  }
  
  .category-btn {
    padding: 6px 16px;
    font-size: 0.85rem;
  }
  
  .menu-items-grid {
    grid-template-columns: 1fr;
  }
}
</style>