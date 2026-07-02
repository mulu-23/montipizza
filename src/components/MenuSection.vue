
<template>
  <section class="menu-section" id="menu-section-start">
    <div class="menu-header">
      <div class="small-title">Fresh & Tasty Everyday</div>
      <div class="big-title">OUR DELICIOUS MENU</div>
    </div>

    <div class="menu-grid">
      <div class="card card-big" :style="{ backgroundImage: 'url(/images/1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }">
        <div class="card-text">
          <div class="card-subtitle">CHEF'S SPECIAL</div>
          <div class="card-title">PIZZA</div>
          <div class="card-badge-red">LOW PRICES</div>
        </div>
      </div>

      <div class="card card-small card-compact" :style="{ backgroundImage: 'url(/images/2.png)', backgroundSize: 'cover', backgroundPosition: 'center' }">
        <div class="card-text">
          <div class="card-subtitle">HOMEMADE</div>
          <div class="card-title">SAUCES</div>
        </div>
      </div>

      <div class="card card-small card-compact" :style="{ backgroundImage: 'url(/images/3.png)', backgroundSize: 'cover', backgroundPosition: 'center' }">
        <div class="card-text">
          <div class="card-subtitle">COLD & REFRESHING</div>
          <div class="card-title">DRINKS</div>
        </div>
      </div>

      <div class="card card-wide card-compact" :style="{ backgroundImage: 'url(/images/4.png)', backgroundSize: 'cover', backgroundPosition: 'center' }">
        <div class="card-text">
          <div class="card-subtitle">FREE SHIPPING</div>
          <div class="card-title">FREE DELIVERY</div>
        </div>
        <div class="card-footer-note">anywhere in the city</div>
      </div>
    </div>

    <div class="menu-button">
      <button @click="$emit('viewMenu')">VIEW MENU</button>
    </div>
  </section>
</template>

<script setup>
defineEmits(['viewMenu'])
</script>

<style scoped>
.menu-section {
  padding: 100px 5% 120px;
  background: #ffffff;
  text-align: center;
}

.menu-header {
  margin-bottom: 70px;
}

.small-title {
  font-family: 'Brush Script MT', cursive;
  font-size: 1.6rem;
  margin-bottom: -5px;
  color: #b45f2b;
  font-weight: 500;
}

.big-title {
  font-family: 'Impact', fantasy;
  font-size: 3rem;
  letter-spacing: 2px;
  color: #2c2c2c;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 30px;
}

.card {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  color: rgb(255, 255, 255);
  font-size: 1.3rem;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  min-height: 290px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.075);
  z-index: 1;
  pointer-events: none;
}

.card-text {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  width: 100%;
  height: 100%;
  padding: 24px 20px;
}

.card-subtitle {
  font-family: 'Segoe UI', 'Poppins', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 1.5px;
  font-weight: 500;
  text-transform: uppercase;
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 12px;
}

.card-title {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 1.2;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.card-badge-red {
  background-color: #e33b3b;
  padding: 8px 20px;
  font-weight: 800;
  font-size: 1rem;
  letter-spacing: 0.5px;
  display: inline-block;
  font-family: 'Segoe UI', monospace;
  margin-top: 8px;
  backdrop-filter: blur(2px);
  border-radius: 40px;
  width: auto;
  max-width: fit-content;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.card-big {
  grid-column: span 2;
  grid-row: span 2;
  min-height: 620px;
}

.card-big .card-title {
  font-size: 2.8rem;
}

.card-big .card-subtitle {
  font-size: 1rem;
}

.card-big .card-badge-red {
  font-size: 1.1rem;
  padding: 8px 22px;
  border-radius: 40px;
}

.card-small {
  min-height: 260px;
}

.card-compact .card-subtitle {
  font-size: 0.75rem;
  padding: 4px 10px;
}

.card-compact .card-title {
  font-size: 1.7rem;
  margin-bottom: 8px;
}

.card-compact .card-badge-red {
  display: none;
}

.card-wide {
  grid-column: span 2;
  min-height: 240px;
}

.card-wide .card-title {
  font-size: 2rem;
}

.card-footer-note {
  position: absolute;
  bottom: 16px;
  left: 20px;
  right: auto;
  font-family: 'Segoe UI', 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  backdrop-filter: blur(6px);
  padding: 6px 14px;
  border-radius: 40px;
  letter-spacing: 0.4px;
  z-index: 3;
  pointer-events: none;
  white-space: nowrap;
}

.menu-button {
  margin-top: 70px;
}

.menu-button button {
  padding: 16px 48px;
  border: none;
  border-radius: 50px;
  background: #2c2c2c;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  font-size: 1.1rem;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.menu-button button:hover {
  background: #000;
  transform: scale(1.03);
  box-shadow: 0 8px 22px rgba(0,0,0,0.3);
}

@media (max-width: 780px) {
  .menu-grid {
    grid-template-columns: 1fr;
  }
  
  .card-big, .card-wide {
    grid-column: span 1;
    min-height: 300px;
  }
  
  .big-title {
    font-size: 2rem;
  }
  
  .small-title {
    font-size: 1.2rem;
  }
}
</style>