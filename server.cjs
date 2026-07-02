const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const db = new sqlite3.Database('./montopizza.db');

// Initialize database tables
db.serialize(() => {
  // Categories table
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    name_ru TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
  )`);

  // Menu items table
  db.run(`CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    name_ru TEXT NOT NULL,
    description TEXT,
    description_ru TEXT,
    price_small REAL,
    price_large REAL,
    price REAL,
    is_available INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0
  )`);

  // Shipments table
  db.run(`CREATE TABLE IF NOT EXISTS shipments (
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
  )`);

  // Status history table
  db.run(`CREATE TABLE IF NOT EXISTS status_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shipment_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    comment TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  // Admins table
  db.run(`CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert default admin if not exists
  db.get("SELECT * FROM admins WHERE username = 'admin'", (err, row) => {
    if (!row) {
      const hashedPassword = bcrypt.hashSync('admin123', 10);
      db.run("INSERT INTO admins (username, password_hash, email) VALUES (?, ?, ?)", 
        ['admin', hashedPassword, 'admin@montopizza.ru']);
    }
  });

  // Insert categories if empty
  db.get("SELECT COUNT(*) as count FROM categories", (err, row) => {
    if (row.count === 0) {
      const categories = [
        [1, 'Pizza', 'Пицца', 1],
        [2, 'Snacks', 'Закуски', 2],
        [3, 'Hot Dogs', 'Хот-доги', 3],
        [4, 'Coffee', 'Кофе', 4],
        [5, 'Tea', 'Чай', 5],
        [6, 'Juices & Smoothies', 'Соки и смузи', 6],
        [7, 'Soft Drinks', 'Напитки', 7],
        [8, 'Water', 'Вода', 8]
      ];
      categories.forEach(cat => {
        db.run("INSERT INTO categories (id, name, name_ru, sort_order) VALUES (?, ?, ?, ?)", cat);
      });
    }
  });

  // Insert menu items if empty
  db.get("SELECT COUNT(*) as count FROM menu_items", (err, row) => {
    if (row.count === 0) {
      const menuItems = [
        // Pizza (category_id 1)
        [1, 'Margherita', 'Маргарита', 'Tomato sauce, mozzarella, oregano', 'Томатный соус, моцарелла, орегано', 4.50, 6.50, null, 1],
        [1, 'Marinara', 'Маринара', 'Tomato sauce, garlic, basil (no cheese)', 'Томатный соус, чеснок, базилик (без сыра)', 4.00, 6.00, null, 2],
        [1, 'Quattro Stagioni', 'Четыре сезона', 'Tomato sauce, mozzarella, mushrooms, ham', 'Томатный соус, моцарелла, грибы, ветчина', 6.50, 9.00, null, 3],
        [1, 'Carbonara', 'Карбонара', 'Tomato sauce, mozzarella, parmesan, egg, bacon', 'Томатный соус, моцарелла, пармезан, яйцо, бекон', 6.00, 8.50, null, 4],
        [1, 'Frutti di Mare', 'Фрутти ди Маре', 'Tomato sauce, mixed seafood', 'Томатный соус, морепродукты', 7.50, 10.50, null, 5],
        [1, 'Quattro Formaggi', 'Четыре сыра', 'Tomato sauce, mozzarella, parmesan, gorgonzola', 'Томатный соус, моцарелла, пармезан, горгонзола', 6.00, 8.50, null, 6],
        [1, 'Crudo', 'Крудо', 'Tomato sauce, mozzarella, Parma ham', 'Томатный соус, моцарелла, пармская ветчина', 6.50, 9.00, null, 7],
        [1, 'Napoletana', 'Неаполетано', 'Tomato sauce, mozzarella, oregano, anchovies', 'Томатный соус, моцарелла, орегано, анчоусы', 5.50, 8.00, null, 8],
        [1, 'Pugliese', 'Пульезе', 'Tomato sauce, mozzarella, oregano, onion', 'Томатный соус, моцарелла, орегано, лук', 5.00, 7.50, null, 9],
        [1, 'Prosciutto', 'Прошутто', 'Tomato sauce, mozzarella, ham, oregano', 'Томатный соус, моцарелла, ветчина, орегано', 5.50, 8.00, null, 10],
        [1, 'Americana', 'Американо', 'Tomato sauce, mozzarella, sausage, french fries', 'Томатный соус, моцарелла, колбаса, картофель фри', 6.00, 8.50, null, 11],
        [1, 'Tonno', 'Тонно', 'Tomato sauce, mozzarella, tuna, onion', 'Томатный соус, моцарелла, тунец, лук', 6.00, 8.50, null, 12],
        // Snacks (category_id 2)
        [2, 'Chicken Nuggets', 'Куриные наггетсы', 'Chicken breast in crispy breading', 'Куриная грудка в хрустящей панировке', null, null, 3.50, 1],
        [2, 'French Fries', 'Картофель фри', 'Deep-fried potato sticks', 'Нарезанный брусочками картофель', null, null, 2.50, 2],
        [2, 'Onion Rings', 'Луковые кольца', 'Onion rings in beer batter', 'Лук в пивном кляре', null, null, 3.00, 3],
        [2, 'Cheese Sticks', 'Сырные палочки', 'Mozzarella sticks deep-fried', 'Моцарелла в панировке', null, null, 3.50, 4],
        // Hot Dogs (category_id 3)
        [3, 'Classic Hot Dog', 'Хот-дог классический', 'Sausage in a soft bun', 'Сосиска в мягкой булочке', null, null, 2.50, 1],
        [3, 'Corn Dog', 'Корн-дог', 'Sausage in cornmeal batter', 'Сосиска в кляре', null, null, 3.00, 2],
        // Coffee (category_id 4)
        [4, 'Espresso', 'Эспрессо', 'Classic Italian espresso', 'Классический итальянский эспрессо', null, null, 1.20, 1],
        [4, 'Americano', 'Американо', 'Espresso with hot water', 'Эспрессо с горячей водой', null, null, 1.50, 2],
        [4, 'Cappuccino', 'Капучино', 'Espresso with steamed milk foam', 'Эспрессо с вспененным молоком', null, null, 1.80, 3],
        [4, 'Latte', 'Латте', 'Espresso with steamed milk', 'Эспрессо с горячим молоком', null, null, 2.00, 4],
        // Tea (category_id 5)
        [5, 'Black Tea', 'Чёрный чай', 'Classic black tea', 'Классический чёрный чай', null, null, 1.20, 1],
        [5, 'Green Tea', 'Зелёный чай', 'Classic green tea', 'Классический зелёный чай', null, null, 1.20, 2],
        [5, 'Herbal Tea', 'Травяной чай', 'Chamomile, mint or linden', 'Травяной настой', null, null, 1.50, 3],
        // Juices (category_id 6)
        [6, 'Fresh Orange Juice', 'Апельсиновый сок', '100% freshly squeezed', '100% свежевыжатый сок', null, null, 2.80, 1],
        [6, 'Fresh Carrot Juice', 'Морковный сок', '100% freshly squeezed', '100% свежевыжатый сок', null, null, 2.80, 2],
        [6, 'Berry Smoothie', 'Ягодный смузи', 'Berries with yogurt', 'Ягоды с йогуртом', null, null, 3.00, 3],
        // Soft Drinks (category_id 7)
        [7, 'Mojito Lemonade', 'Лимонад Мохито', 'With fresh mint and lime', 'Со свежей мятой и лаймом', null, null, 2.50, 1],
        [7, 'Cola', 'Кола', 'Carbonated cola drink', 'Газированный напиток кола', null, null, 1.80, 2],
        [7, 'Tonic', 'Тоник', 'Carbonated tonic water', 'Газированный тоник', null, null, 1.80, 3],
        // Water (category_id 8)
        [8, 'Borjomi', 'Боржоми', 'Georgian mineral water', 'Грузинская минеральная вода', null, null, 2.00, 1],
        [8, 'Still Water', 'Вода без газа', 'Purified still water', 'Очищенная вода', null, null, 1.00, 2]
      ];
      menuItems.forEach(item => {
        db.run("INSERT INTO menu_items (category_id, name, name_ru, description, description_ru, price_small, price_large, price, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", item);
      });
    }
  });
});

// ============ API ENDPOINTS ============

// Get all categories
app.get('/api/categories', (req, res) => {
  db.all("SELECT * FROM categories ORDER BY sort_order", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get menu items by category
app.get('/api/categories/:id/menu', (req, res) => {
  const categoryId = req.params.id;
  db.all("SELECT * FROM menu_items WHERE category_id = ? AND is_available = 1 ORDER BY sort_order", [categoryId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get all shipments (admin)
app.get('/api/shipments', (req, res) => {
  db.all("SELECT * FROM shipments ORDER BY created_at DESC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Track shipment by tracking number
app.get('/api/tracking/:tracking', (req, res) => {
  const trackingNumber = req.params.tracking;
  db.get("SELECT * FROM shipments WHERE tracking_number = ?", [trackingNumber], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.json({ error: 'Shipment not found' });
    } else {
      // Get status history
      db.all("SELECT * FROM status_history WHERE shipment_id = ? ORDER BY created_at DESC", [row.id], (err, history) => {
        res.json({ ...row, history: history || [] });
      });
    }
  });
});

// Create new order
app.post('/api/create-order', (req, res) => {
  const { receiver_name, receiver_phone, receiver_address, receiver_email, description, items, total } = req.body;
  
  const trackingNumber = 'MP' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  db.run(`INSERT INTO shipments (tracking_number, receiver_name, receiver_phone, receiver_address, receiver_email, description, status) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [trackingNumber, receiver_name, receiver_phone, receiver_address, receiver_email || null, description || 'Pizza order', 'pending'],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // Add status history
        db.run("INSERT INTO status_history (shipment_id, status, comment) VALUES (?, ?, ?)",
          [this.lastID, 'pending', 'Order created successfully']);
        
        res.json({ success: true, tracking_number: trackingNumber });
      }
    });
});

// Create shipment (admin)
app.post('/api/admin/create-shipment', authenticateToken, (req, res) => {
  const { tracking_number, receiver_name, receiver_phone, receiver_address, receiver_email, description, weight, status } = req.body;
  
  db.run(`INSERT INTO shipments (tracking_number, receiver_name, receiver_phone, receiver_address, receiver_email, description, weight, status) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [tracking_number, receiver_name, receiver_phone, receiver_address, receiver_email, description, weight, status || 'pending'],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        db.run("INSERT INTO status_history (shipment_id, status, comment) VALUES (?, ?, ?)",
          [this.lastID, status || 'pending', 'Shipment created']);
        res.json({ success: true, id: this.lastID });
      }
    });
});

// Update shipment status
app.post('/api/update-status', authenticateToken, (req, res) => {
  const { trackingNumber, status, comment } = req.body;
  
  db.get("SELECT id FROM shipments WHERE tracking_number = ?", [trackingNumber], (err, shipment) => {
    if (err || !shipment) {
      res.status(404).json({ error: 'Shipment not found' });
      return;
    }
    
    db.run("UPDATE shipments SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE tracking_number = ?",
      [status, trackingNumber], (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          db.run("INSERT INTO status_history (shipment_id, status, comment) VALUES (?, ?, ?)",
            [shipment.id, status, comment || 'Status updated']);
          res.json({ success: true });
        }
      });
  });
});

// Delete shipment
app.delete('/api/delete-shipment', authenticateToken, (req, res) => {
  const { trackingNumber } = req.body;
  
  db.run("DELETE FROM shipments WHERE tracking_number = ?", [trackingNumber], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Shipment not found' });
    } else {
      res.json({ success: true });
    }
  });
});

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  db.get("SELECT * FROM admins WHERE username = ?", [username], (err, admin) => {
    if (err || !admin) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    
    bcrypt.compare(password, admin.password_hash, (err, isValid) => {
      if (err || !isValid) {
        res.status(401).json({ error: 'Invalid credentials' });
      } else {
        const token = jwt.sign(
          { id: admin.id, username: admin.username },
          process.env.JWT_SECRET || 'montopizza-secret-key-2024',
          { expiresIn: '24h' }
        );
        res.json({ 
          success: true, 
          token, 
          user: { id: admin.id, username: admin.username, email: admin.email } 
        });
      }
    });
  });
});

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET || 'montopizza-secret-key-2024', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});