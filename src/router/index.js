import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Services from '../views/Services.vue'
import Contact from '../views/Contact.vue'
import Track from '../views/Track.vue'
import TrackingResult from '../views/TrackingResult.vue'
import Admin from '../views/Admin.vue'
import AdminLogin from '../views/AdminLogin.vue'
import FAQ from '../views/FAQ.vue'
import Privacy from '../views/Privacy.vue'
import Terms from '../views/Terms.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/track',
    name: 'Track',
    component: Track
  },
  {
    path: '/tracking/:id',
    name: 'TrackingResult',
    component: TrackingResult,
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('adminToken')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/admin/login')
  } else if (to.path === '/admin/login' && isAuthenticated) {
    next('/admin')
  } else {
    next()
  }
})

export default router
