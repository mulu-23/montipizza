# MontoPizza Delivery Tracking System

A comprehensive Vue.js-based pizza delivery tracking system with real-time order monitoring, admin panel, and email notifications.

## 🍕 Project Overview

MontoPizza is a professional delivery tracking system built with Vue.js that provides:
- Real-time order tracking with live GPS monitoring
- Complete admin management panel
- Automated email notifications
- Responsive web interface
- Professional customer experience

## ✨ Features

### Customer Features
- **Real-time Tracking**: Live GPS tracking of orders from kitchen to delivery
- **Order History**: Complete timeline of order status changes
- **Mobile Responsive**: Optimized for all devices
- **Interactive Maps**: Visual representation of delivery progress
- **Status Updates**: Automatic notifications for order changes

### Admin Features
- **Secure Authentication**: JWT-based admin login system
- **Order Management**: Create, update, and delete shipments
- **Status Control**: Manual status updates with comments
- **Dashboard Analytics**: Overview of all orders and statistics
- **Email Templates**: Professional email notifications

### Technical Features
- **Vue.js 3**: Modern reactive framework
- **Vue Router**: Single Page Application navigation
- **State Management**: Centralized store with reactive state
- **SQLite Database**: Lightweight and efficient data storage
- **Email Service**: Automated notifications with Nodemailer
- **REST API**: Complete backend API with Express.js

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- SQLite3

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd montopizza-vue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env` file in root directory:
   ```env
   JWT_SECRET=your-jwt-secret-key
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

4. **Start Backend Server**
   ```bash
   node server.cjs
   ```

5. **Start Frontend Development Server**
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📁 Project Structure

```
montopizza-vue/
├── public/                 # Static assets
│   ├── images/           # Logo and images
│   ├── tracking.html     # Legacy tracking page
│   └── menu.html        # Legacy menu page
├── src/
│   ├── components/       # Reusable Vue components
│   │   ├── HeroSection.vue
│   │   ├── MenuSection.vue
│   │   ├── FooterSection.vue
│   │   └── ...
│   ├── views/           # Page components
│   │   ├── Home.vue
│   │   ├── About.vue
│   │   ├── Services.vue
│   │   ├── Contact.vue
│   │   ├── Track.vue
│   │   ├── TrackingResult.vue
│   │   ├── Admin.vue
│   │   ├── AdminLogin.vue
│   │   ├── FAQ.vue
│   │   ├── Privacy.vue
│   │   └── Terms.vue
│   ├── router/          # Vue Router configuration
│   │   └── index.js
│   ├── store/           # State management
│   │   └── index.js
│   ├── App.vue          # Main application component
│   └── main.js          # Application entry point
├── services/            # Backend services
│   └── emailService.js  # Email notification service
├── server.cjs           # Express.js backend server
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## 🛠️ Available Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## 📊 Database Schema

### Shipments Table
```sql
CREATE TABLE shipments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tracking_number TEXT UNIQUE NOT NULL,
    sender_name TEXT,
    sender_phone TEXT,
    sender_address TEXT,
    receiver_name TEXT NOT NULL,
    receiver_phone TEXT,
    receiver_address TEXT NOT NULL,
    receiver_email TEXT,
    weight REAL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    current_location_lat REAL,
    current_location_lng REAL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### Status History Table
```sql
CREATE TABLE status_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shipment_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    comment TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### Administrators Table
```sql
CREATE TABLE administrators (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

### Public Endpoints
- `POST /api/create-order` - Create new order
- `GET /api/tracking/:tracking` - Track order by number
- `GET /api/categories` - Get menu categories
- `GET /api/categories/:id/menu` - Get menu items by category

### Admin Endpoints (Authentication Required)
- `POST /api/admin/login` - Admin login
- `GET /api/shipments` - Get all shipments
- `POST /api/update-status` - Update shipment status
- `DELETE /api/delete-shipment` - Delete shipment
- `POST /api/admin/create-shipment` - Create shipment (admin)

## 🌐 Vue Router Routes

```javascript
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/services', component: Services },
  { path: '/contact', component: Contact },
  { path: '/track', component: Track },
  { path: '/tracking/:id', component: TrackingResult },
  { path: '/admin/login', component: AdminLogin },
  { path: '/admin', component: Admin, meta: { requiresAuth: true } },
  { path: '/faq', component: FAQ },
  { path: '/privacy', component: Privacy },
  { path: '/terms', component: Terms }
];
```

## 📧 Email Notifications

The system automatically sends emails for:

### Order Created
- Order confirmation with tracking number
- Order details and estimated delivery time
- Professional HTML template with branding

### Status Updates
- Real-time status change notifications
- Custom comments from admin
- Direct link to tracking page

### Order Delivered
- Delivery confirmation with celebration
- Feedback request link
- Thank you message

## 🎨 UI Components

### Navigation
- Responsive header with mobile menu
- Active route highlighting
- Admin access protection

### Tracking Interface
- Live map integration with Leaflet
- Animated courier movement
- Status timeline visualization
- Real-time updates every 10 seconds

### Admin Dashboard
- Statistics overview cards
- Data table with sorting/filtering
- Modal forms for editing
- Settings management

## 🔐 Security Features

### Authentication
- JWT token-based authentication
- Password hashing with bcrypt
- Route protection with navigation guards
- Session management

### Data Protection
- SQL injection prevention
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Touch-friendly interfaces
- Optimized performance
- Progressive enhancement

## 🧪 Testing

### Manual Testing Steps

1. **Order Creation**
   - Visit menu.html
   - Place an order
   - Receive tracking number
   - Check email confirmation

2. **Tracking**
   - Visit /track
   - Enter tracking number
   - View real-time updates
   - Test map functionality

3. **Admin Panel**
   - Visit /admin/login
   - Login with credentials (admin/admin123)
   - Manage orders
   - Test status updates

### Default Admin Credentials
- **Username**: admin
- **Password**: admin123

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Ensure these are set in production:
- `JWT_SECRET`: Strong secret key
- `SMTP_*`: Email configuration
- `NODE_ENV`: production

### Server Setup
- Use PM2 or similar process manager
- Configure reverse proxy (nginx)
- Enable HTTPS with SSL certificates
- Set up database backups

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Add tests if applicable
5. Submit pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For technical support or questions:
- Email: support@montopizza.ru
- Phone: +7 (964) 041-70-47
- Address: 123 Pizza Street, Nalchik, Kabardino-Balkaria, 360000, Russia

## 🔄 Version History

### v1.0.0 (Current)
- ✅ Complete Vue.js SPA implementation
- ✅ Real-time tracking with maps
- ✅ Admin panel with authentication
- ✅ Email notification system
- ✅ Responsive design
- ✅ Database integration
- ✅ Professional UI/UX

## 🎯 Future Enhancements

- [ ] Push notifications for mobile
- [ ] SMS integration for updates
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Customer review system
- [ ] Integration with payment gateways
- [ ] Mobile app development

---

**Built with ❤️ using Vue.js, Express.js, and SQLite**