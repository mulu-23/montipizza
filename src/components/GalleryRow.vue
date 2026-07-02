
<template>
  <section class="gallery-row">
    <div class="gallery-container">
      <div class="gallery-item" v-for="(item, index) in galleryItems" :key="index">
        <img :src="item.img" :alt="item.alt">
        <div class="gallery-caption">{{ item.caption }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
const galleryItems = [
  { img: '/images/11.png', alt: 'Appetizing pizza 1', caption: 'Fast delivery to any part of the city' },
  { img: '/images/22.png', alt: 'Juicy pizza 2', caption: 'high-quality and fast cooking' },
  { img: '/images/33.png', alt: 'Pizza with tomatoes 3', caption: 'there are many options for choosing food' },
  { img: '/images/44.png', alt: 'Pizza with greens 4', caption: 'big discounts and promotions' }
]
</script>

<style scoped>
.gallery-row {
  width: 100%;
  background-color: #ffffff;
  padding: 90px;
}

.gallery-container {
  max-width: 1900px;
  margin: 0 auto;
  padding: 0 5%;
  display: flex;
  flex-wrap: wrap;
  gap: 140px;
  justify-content: center;
  align-items: stretch;
}

.gallery-item {
  flex: 1 1 calc(25% - 16px);
  min-width: 80px;
  max-width: 180px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #fafafa00;
  text-align: center;
}

.gallery-item img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 0.9;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-caption {
  margin-top: 14px;
  font-family: 'Segoe UI', 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #2c2c2c;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  background: #ffffff;
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 6px 8px;
  border-radius: 30px;
  transition: 0.2s;
}

@media (max-width: 780px) {
  .gallery-row {
    padding: 40px 20px;
  }
  
  .gallery-container {
    gap: 30px;
  }
}
</style>