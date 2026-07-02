<template>
  <div class="services-page">
    <div class="services-header">
      <div class="container">
        <h1>Our Services</h1>
        <p>Comprehensive delivery solutions for your pizza needs</p>
      </div>
    </div>

    <div class="services-content">
      <div class="container">
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">🍕</div>
            <h3>Pizza Delivery</h3>
            <p>Hot, fresh pizza delivered right to your doorstep within 30 minutes</p>
            <ul>
              <li>Real-time order tracking</li>
              <li>Temperature-controlled delivery</li>
              <li>Professional delivery team</li>
            </ul>
          </div>

          <div class="service-card">
            <div class="service-icon">📱</div>
            <h3>Order Tracking</h3>
            <p>Advanced tracking system to monitor your order every step of the way</p>
            <ul>
              <li>Live GPS tracking</li>
              <li>Estimated delivery time</li>
              <li>Delivery notifications</li>
            </ul>
          </div>

          <div class="service-card">
            <div class="service-icon">🏢</div>
            <h3>Catering Services</h3>
            <p>Professional catering for events, parties, and corporate meetings</p>
            <ul>
              <li>Custom menu planning</li>
              <li>Bulk ordering discounts</li>
              <li>On-time delivery guarantee</li>
            </ul>
          </div>

          <div class="service-card">
            <div class="service-icon">🎉</div>
            <h3>Party Packages</h3>
            <p>Special packages designed for celebrations and gatherings</p>
            <ul>
              <li>Assorted pizza combinations</li>
              <li>Side dishes and drinks</li>
              <li>Party supplies included</li>
            </ul>
          </div>

          <div class="service-card">
            <div class="service-icon">🌟</div>
            <h3>Membership Program</h3>
            <p>Exclusive benefits for our loyal customers</p>
            <ul>
              <li>Points on every order</li>
              <li>Special member discounts</li>
              <li>Priority delivery</li>
            </ul>
          </div>

          <div class="service-card">
            <div class="service-icon">🏆</div>
            <h3>Corporate Solutions</h3>
            <p>Tailored delivery solutions for businesses and organizations</p>
            <ul>
              <li>Monthly billing options</li>
              <li>Dedicated account manager</li>
              <li>Custom delivery schedules</li>
            </ul>
          </div>
        </div>

        <div class="service-features">
          <h2>Why Choose Our Services?</h2>
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">⚡</div>
              <h4>Fast Delivery</h4>
              <p>30-minute delivery guarantee</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">📍</div>
              <h4>Real-Time Tracking</h4>
              <p>Track your order from kitchen to door</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">💳</div>
              <h4>Easy Payments</h4>
              <p>Multiple payment options available</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">📞</div>
              <h4>24/7 Support</h4>
              <p>Customer service always available</p>
            </div>
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
.services-page {
  min-height: 100vh;
  background: #fffaf5;
}

.services-header {
  background: linear-gradient(135deg, #b81b1b 0%, #8b0000 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.services-header h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.services-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.services-content {
  padding: 60px 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.service-card {
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}

.service-icon {
  font-size: 3.5rem;
  margin-bottom: 20px;
}

.service-card h3 {
  color: #b81b1b;
  font-size: 1.5rem;
  margin-bottom: 15px;
  font-weight: 600;
}

.service-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1rem;
}

.service-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-card ul li {
  color: #555;
  padding: 8px 0;
  position: relative;
  padding-left: 20px;
}

.service-card ul li:before {
  content: "✓";
  color: #b81b1b;
  position: absolute;
  left: 0;
  font-weight: bold;
}

.service-features {
  background: white;
  padding: 50px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.service-features h2 {
  color: #b81b1b;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 600;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.feature-item {
  text-align: center;
  padding: 30px 20px;
  border-radius: 12px;
  background: #f9f9f9;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-3px);
}

.feature-item .feature-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.feature-item h4 {
  color: #b81b1b;
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.feature-item p {
  color: #666;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 768px) {
  .services-header h1 {
    font-size: 2rem;
  }
  
  .services-header p {
    font-size: 1rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .service-card {
    padding: 30px 20px;
  }
  
  .service-features h2 {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
