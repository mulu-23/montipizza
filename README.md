
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


 Project Structure

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

 Available Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

 Database Schema

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

 Vue Router Routes

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
