<template>
  <div class="about-page">
    <div class="about-header">
      <div class="container">
        <h1>About MontoPizza</h1>
        <p>Your trusted delivery partner for delicious pizza</p>
      </div>
    </div>

    <div class="about-content">
      <div class="container">
        <div class="about-grid">
          <div class="about-section">
            <h2>Our Story</h2>
            <p>
              Founded in 2020, MontoPizza started as a small family restaurant with a big dream - 
              to deliver the most delicious pizza right to your doorstep. Today, we're proud to be 
              Nalchik's premier pizza delivery service, combining traditional recipes with modern 
              delivery technology.
            </p>
            <p>
              Our commitment to quality extends beyond our kitchen. We've invested in a state-of-the-art 
              delivery tracking system that ensures you always know where your order is and when it will arrive.
            </p>
          </div>

          <div class="about-section">
            <h2>Our Mission</h2>
            <p>
              To deliver exceptional pizza experiences through quality ingredients, skilled craftsmanship, 
              and reliable service that brings families and friends together over great food.
            </p>
          </div>

          <div class="about-section">
            <h2>Why Choose Us?</h2>
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon"></div>
                <h3>Fresh Ingredients</h3>
                <p>We use only the freshest, locally-sourced ingredients</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon"></div>
                <h3>Real-Time Tracking</h3>
                <p>Track your order from kitchen to your door</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon"></div>
                <h3>Fast Delivery</h3>
                <p>30-minute delivery guarantee or it's free</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon"></div>
                <h3>Quality Guaranteed</h3>
                <p>If you're not satisfied, we'll make it right</p>
              </div>
            </div>
          </div>

          <div class="about-section">
            <h2>Our Team</h2>
            <p>
              Our team consists of passionate chefs, friendly customer service representatives, 
              and reliable delivery drivers who all share one thing in common - a love for great pizza 
              and exceptional service.
            </p>
          </div>

          <div class="about-section">
            <h2>Community Involvement</h2>
            <p>
              MontoPizza is proud to be part of the Nalchik community. We regularly participate in 
              local events, support youth sports programs, and donate to local charities. 
              When you order from MontoPizza, you're supporting a business that gives back to the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic here
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: #fffaf5;
}

.about-header {
  background: linear-gradient(135deg, #b81b1b 0%, #8b0000 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.about-header h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.about-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.about-content {
  padding: 60px 0;
}

.about-grid {
  display: grid;
  gap: 60px;
}

.about-section {
  background: white;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.about-section h2 {
  color: #b81b1b;
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.about-section p {
  color: #333;
  line-height: 1.8;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.feature-item {
  text-align: center;
  padding: 30px 20px;
  border-radius: 12px;
  background: #f9f9f9;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}


.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.feature-item h3 {
  color: #b81b1b;
  font-size: 1.3rem;
  margin-bottom: 15px;
  font-weight: 600;
}

.feature-item p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .about-header h1 {
    font-size: 2rem;
  }
  
  .about-header p {
    font-size: 1rem;
  }
  
  .about-section {
    padding: 25px;
  }
  
  .about-section h2 {
    font-size: 1.5rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
