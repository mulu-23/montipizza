
<template>
  <footer class="red-footer" id="contacts-footer">
    <div class="footer-inner-compact">
      <div class="footer-col-compact footer-brand-compact">
        <img src="/images/logo.png" alt="MontoPizza Logo">
        <p>Authentic wood-fired pizza. Fresh ingredients, signature recipes, and fast delivery.</p>
      </div>
      <div class="footer-col-compact">
        <h5>CONTACTS</h5>
        <div class="contact-compact">
          <p><a href="tel:00123456789">7 964 041 70479</a></p>
          <p><a href="mailto:hello@montopizza.com">hello@montopizza.com</a></p>
          <p>ITHUB COLLEGE, Nalchik</p>
          <p>Daily 11:00 AM – 11:00 PM</p>
        </div>
      </div>
      <div class="footer-col-compact">
        <h5>WORKING HOURS</h5>
        <div class="contact-compact">
          <p>MON–SUN: 11:00 AM – 11:00 PM</p>
          <p>Open daily</p>
        </div>
      </div>
    </div>
    <div class="footer-bottom-compact">
      <div class="copyright-red">© 2025 MontoPizza. All rights reserved.</div>
      <div>
        <router-link to="/privacy" class="privacy-red">Privacy Policy</router-link>
        <span style="opacity:0.5">|</span>
        <router-link to="/terms" class="privacy-red">Terms of Service</router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.red-footer {
  background: #b81b1b;
  background: linear-gradient(135deg, #a11515 0%, #c41e1e 100%);
  color: #ffffff;
  padding: 40px 5% 25px;
  font-family: 'Segoe UI', 'Poppins', sans-serif;
  border-top: none;
  box-shadow: 0 -8px 20px rgba(0,0,0,0.1);
}

.footer-inner-compact {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
  margin-bottom: 30px;
}

.footer-col-compact {
  flex: 1 1 180px;
  min-width: 150px;
}

.footer-brand-compact {
  flex: 2 1 240px;
}

.footer-brand-compact img {
  max-width: 150px;
  height: auto;
  margin-bottom: 12px;
  filter: brightness(0) invert(1);
  transition: transform 0.2s;
}

.footer-brand-compact p {
  font-size: 0.8rem;
  line-height: 1.4;
  opacity: 0.9;
  max-width: 220px;
  margin-top: 8px;
}

.footer-col-compact h5 {
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 16px;
  position: relative;
  display: inline-block;
  color: #ffffff;
  padding-left: 10px;
}

.contact-compact p {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8rem;
  margin-bottom: 10px;
  flex-wrap: wrap;
  font-weight: 500;
}

.contact-compact a {
  color: #fff2df;
  text-decoration: none;
}

.footer-bottom-compact {
  border-top: 1px solid rgba(255,245,200,0.25);
  padding-top: 20px;
  text-align: center;
  font-size: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  max-width: 1300px;
  margin: 0 auto;
}

.footer-bottom-compact .privacy-red {
  color: #ffeaac;
  text-decoration: none;
  font-weight: 600;
  margin: 0 6px;
}

.footer-bottom-compact .privacy-red:hover {
  text-decoration: underline;
  color: white;
}

.copyright-red {
  opacity: 0.85;
}

@media (max-width: 780px) {
  .footer-inner-compact {
    flex-direction: column;
    text-align: center;
    gap: 28px;
  }
  
  .footer-brand-compact {
    text-align: center;
  }
  
  .footer-brand-compact p {
    margin-left: auto;
    margin-right: auto;
  }
  
  .footer-col-compact h5 {
    border-left: none;
    border-bottom: 2px solid #ffcd4a;
    padding-left: 0;
    padding-bottom: 6px;
  }
  
  .contact-compact p {
    justify-content: center;
  }
  
  .footer-bottom-compact {
    flex-direction: column;
    text-align: center;
  }
}
</style>