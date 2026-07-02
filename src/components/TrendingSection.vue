<template>
  <section class="trending-section" id="trending-now">
    <div class="trending-header">
      <div class="trending-small">Hot & Trending Now</div>
      <div class="trending-big">FRESH FROM THE OVEN</div>
    </div>
    <div class="trending-grid">
      <div class="trend-card">
        <img class="trend-img" src="/images/Seafood pizza.png" alt="Seafood Pizza" 
             onerror="this.src='https://placehold.co/600x400/FFE0B5/D45C2C?text=Seafood+Delight'">
        <div class="trend-content">
          <div class="trend-title">SEAFOOD<br>DELIGHT</div>
          <div class="recipe-text">
            <strong>Recipe (eng):</strong> Hand-stretched dough, garlic cream base, premium mix of <strong>shrimp, calamari, mussels</strong>, 
            cherry tomatoes, fresh parsley, mozzarella, and a drizzle of lemon-herb oil. Baked until golden and juicy.
          </div>
          <div class="trend-footer">
            <span class="price-badge">FROM 39.90 PLN</span>
          </div>
        </div>
      </div>
      <div class="trend-card">
        <img class="trend-img" src="/images/Asian fusion.png" alt="Asian Fusion Pizza"
             onerror="this.src='https://placehold.co/600x400/FFE0B5/D45C2C?text=Asian+Fusion'">
        <div class="trend-content">
          <div class="trend-title">ASIAN<br>FUSION</div>
          <div class="recipe-text">
            <strong>Recipe (eng):</strong> Sweet soy-sesame glaze, grilled chicken thigh, caramelized pineapple, 
            red bell pepper, spring onions, mozzarella & spicy sriracha mayo swirl. Topped with crispy shallots and fresh cilantro.
          </div>
          <div class="trend-footer">
            <span class="price-badge">FROM 42.50 PLN</span>
          </div>
        </div>
      </div>
      <div class="trend-card">
        <img class="trend-img" src="/images/Thai.jpg" alt="Thai Spiced Pizza"
             onerror="this.src='https://placehold.co/600x400/FFE0B5/D45C2C?text=Thai+Spiced+Pizza'">
        <div class="trend-content">
          <div class="trend-title">THAI SPICED<br>PIZZA</div>
          <div class="recipe-text">
            <strong>Recipe (eng):</strong> Coconut-red curry sauce base, tender prawns, shredded carrot, bean sprouts, 
            red onion, mozzarella & crushed peanuts. Finished with fresh Thai basil, lime zest, and a mild chili-ginger glaze.
          </div>
          <div class="trend-footer">
            <span class="price-badge">FROM 44.90 PLN</span>
          </div>
        </div>
      </div>
    </div>
    <div class="global-order-wrapper">
      <button class="order-now-button" id="order-button-now" @click="$emit('order')">ORDER</button>
    </div>
  </section>
</template>

<script setup>
defineEmits(['order'])
</script>

<style scoped>
.trending-section {
  background: #fef9f000;
  padding: 100px 5% 120px;
  text-align: center;
}
.trending-header {
  margin-bottom: 60px;
}
.trending-small {
  font-family: 'Brush Script MT', cursive;
  font-size: 1.8rem;
  color: #c96f2e;
  margin-bottom: -8px;
}
.trending-big {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: 3rem;
  letter-spacing: 1.5px;
  color: #1f2a1b;
}
.trending-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
}
.trend-card {
  flex: 1 1 300px;
  max-width: 360px;
  background: white;
  overflow: hidden;
  transition: all 0.3s ease;
  text-align: left;
}
.trend-img {
  width: 100%;
  height: 60%;
  display: block;
  object-fit: cover;
  aspect-ratio: 4 / 3;
}
.trend-content {
  padding: 28px 24px 32px;
}
.trend-title {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: 1.9rem;
  color: #2c2c2c;
  letter-spacing: 1px;
  margin-bottom: 12px;
  border-left: 6px solid #e33b3b;
  padding-left: 16px;
}
.recipe-text {
  font-family: 'Segoe UI', 'Poppins', sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #3b3b3b;
  margin-top: 8px;
  font-weight: 500;
}
.recipe-text strong {
  color: #b45f2b;
  font-weight: 800;
}
.trend-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #efefef;
  padding-top: 18px;
}
.price-badge {
  background: #2c2c2c;
  padding: 8px 18px;
  border-radius: 50px;
  color: white;
  font-weight: 800;
  font-size: 1rem;
}
.global-order-wrapper {
  text-align: center;
  margin-top: 50px;
  padding-bottom: 20px;
}
.order-now-button {
  padding: 16px 48px;
  border: none;
  border-radius: 50px;
  background: #2c2c2c;
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.1rem;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
.order-now-button:hover {
  background: #000;
  transform: scale(1.03);
  box-shadow: 0 8px 22px rgba(0,0,0,0.3);
}
</style>