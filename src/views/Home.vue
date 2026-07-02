<template>
  <div class="home">
    <HeroSection />
    <MenuSection @viewMenu="handleViewMenu" />
    <GalleryRow />
    <FullscreenImage />
    <TrendingSection @order="handleOrder" />
    <FooterSection />
  </div>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue'
import MenuSection from '../components/MenuSection.vue'
import GalleryRow from '../components/GalleryRow.vue'
import TrendingSection from '../components/TrendingSection.vue'
import FooterSection from '../components/FooterSection.vue'
import FullscreenImage from '../components/FullscreenImage.vue'

const handleViewMenu = () => {
  window.location.href = '/menu.html'
}

const handleOrder = () => {
  window.location.href = '/menu.html'
}
</script>