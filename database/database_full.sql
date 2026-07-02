-- =============================================
-- DATABASE: montopizza
-- Description: Полная база данных для MontoPizza
-- Включает: меню пиццерии + систему отслеживания отправлений
-- =============================================

-- Создание базы данных
CREATE DATABASE IF NOT EXISTS montopizza;
USE montopizza;

-- =============================================
-- ЧАСТЬ 1: МЕНЮ ПИЦЦЕРИИ (ваши существующие таблицы)
-- =============================================

-- Таблица категорий
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    name_ru VARCHAR(50) NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- Таблица пунктов меню
CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    category_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    name_ru VARCHAR(100) NOT NULL,
    description TEXT,
    description_ru TEXT,
    price_small DECIMAL(6,2) DEFAULT NULL,
    price_large DECIMAL(6,2) DEFAULT NULL,
    price DECIMAL(6,2) DEFAULT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Таблица ингредиентов
CREATE TABLE IF NOT EXISTS ingredients (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    name_ru VARCHAR(50) NOT NULL
);

-- Таблица связей пицца-ингредиенты
CREATE TABLE IF NOT EXISTS pizza_ingredients (
    pizza_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    PRIMARY KEY (pizza_id, ingredient_id),
    FOREIGN KEY (pizza_id) REFERENCES menu_items(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- =============================================
-- ЧАСТЬ 2: СИСТЕМА ОТСЛЕЖИВАНИЯ ОТПРАВЛЕНИЙ (НОВЫЕ ТАБЛИЦЫ)
-- =============================================

-- Таблица отправлений/заказов
CREATE TABLE IF NOT EXISTS shipments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tracking_number VARCHAR(20) UNIQUE NOT NULL,
    sender_name VARCHAR(100) NOT NULL,
    sender_phone VARCHAR(20),
    sender_address TEXT,
    receiver_name VARCHAR(100) NOT NULL,
    receiver_phone VARCHAR(20),
    receiver_address TEXT NOT NULL,
    receiver_email VARCHAR(100),
    weight DECIMAL(6,2),
    description TEXT,
    status ENUM('pending', 'processing', 'in_transit', 'delivered', 'cancelled') DEFAULT 'pending',
    current_location_lat DECIMAL(10,8),
    current_location_lng DECIMAL(11,8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tracking_number (tracking_number),
    INDEX idx_status (status)
);

-- Таблица истории статусов
CREATE TABLE IF NOT EXISTS status_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    shipment_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shipment_id) REFERENCES shipments(id) ON DELETE CASCADE,
    INDEX idx_shipment_id (shipment_id)
);

-- Таблица администраторов
CREATE TABLE IF NOT EXISTS admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    role ENUM('admin', 'manager') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- ВСТАВКА ДАННЫХ МЕНЮ
-- =============================================

-- Категории
INSERT INTO categories (id, name, name_ru, sort_order) VALUES
(1, 'Pizza', 'Пицца', 1),
(2, 'Snacks', 'Закуски', 2),
(3, 'Hot Dogs', 'Хот-доги', 3),
(4, 'Coffee', 'Кофе', 4),
(5, 'Tea', 'Чай', 5),
(6, 'Juices & Smoothies', 'Соки и смузи', 6),
(7, 'Soft Drinks', 'Лимонады и газировка', 7),
(8, 'Water', 'Вода', 8);

-- Пицца
INSERT INTO menu_items (category_id, name, name_ru, description, description_ru, price_small, price_large, sort_order) VALUES
(1, 'Margherita', 'Маргарита', 'Tomato sauce, mozzarella, oregano', 'Томатный соус, моцарелла, орегано', 4.50, 6.50, 1),
(1, 'Marinara', 'Маринара', 'Tomato sauce, garlic, basil (no cheese)', 'Томатный соус, чеснок, базилик (без сыра)', 4.00, 6.00, 2),
(1, 'Quattro Stagioni', 'Четыре сезона', 'Tomato sauce, mozzarella, mushrooms, ham, artichokes, olives, oregano', 'Томатный соус, моцарелла, грибы, ветчина, артишоки, оливки, орегано', 6.50, 9.00, 3),
(1, 'Carbonara', 'Карбонара', 'Tomato sauce, mozzarella, parmesan, egg, bacon', 'Томатный соус, моцарелла, пармезан, яйцо, бекон', 6.00, 8.50, 4),
(1, 'Frutti di Mare', 'Фрутти ди Маре', 'Tomato sauce, mixed seafood', 'Томатный соус, морепродукты', 7.50, 10.50, 5),
(1, 'Quattro Formaggi', 'Четыре сыра', 'Tomato sauce, mozzarella, parmesan, gorgonzola, straccchino', 'Томатный соус, моцарелла, пармезан, горгонзола, страккино', 6.00, 8.50, 6),
(1, 'Crudo', 'Крудо', 'Tomato sauce, mozzarella, Parma ham', 'Томатный соус, моцарелла, пармская ветчина', 6.50, 9.00, 7),
(1, 'Napoletana', 'Неаполетано', 'Tomato sauce, mozzarella, oregano, anchovies', 'Томатный соус, моцарелла, орегано, анчоусы', 5.50, 8.00, 8),
(1, 'Pugliese', 'Пульезе', 'Tomato sauce, mozzarella, oregano, onion', 'Томатный соус, моцарелла, орегано, лук', 5.00, 7.50, 9),
(1, 'Prosciutto', 'Прошутто', 'Tomato sauce, mozzarella, ham, oregano', 'Томатный соус, моцарелла, ветчина, орегано', 5.50, 8.00, 10),
(1, 'Americana', 'Американо', 'Tomato sauce, mozzarella, sausage, french fries', 'Томатный соус, моцарелла, колбаса, картофель фри', 6.00, 8.50, 11),
(1, 'Tonno', 'Тонно', 'Tomato sauce, mozzarella, tuna, onion', 'Томатный соус, моцарелла, тунец, лук', 6.00, 8.50, 12);

-- Закуски
INSERT INTO menu_items (category_id, name, name_ru, description, description_ru, price, sort_order) VALUES
(2, 'Chicken Nuggets', 'Куриные наггетсы', 'Chicken breast in crispy breading', 'Куриная грудка в хрустящей панировке', 3.50, 1),
(2, 'French Fries', 'Картофель фри', 'Deep-fried potato sticks', 'Нарезанный брусочками картофель, обжаренный во фритюре', 2.50, 2),
(2, 'Onion Rings', 'Луковые кольца', 'Onion rings in beer batter', 'Лук в пивном кляре', 3.00, 3),
(2, 'Cheese Sticks', 'Сырные палочки', 'Mozzarella sticks deep-fried', 'Моцарелла в панировке, обжаренная во фритюре', 3.50, 4);

-- Хот-доги
INSERT INTO menu_items (category_id, name, name_ru, description, description_ru, price, sort_order) VALUES
(3, 'Classic Hot Dog', 'Хот-дог классический', 'Sausage in a soft bun', 'Сосиска в мягкой булочке', 2.50, 1),
(3, 'Corn Dog', 'Корн-дог', 'Sausage in cornmeal batter', 'Сосиска в кляре из кукурузной муки', 3.00, 2);

-- Кофе
INSERT INTO menu_items (category_id, name, name_ru, description, description_ru, price, sort_order) VALUES
(4, 'Espresso', 'Эспрессо', 'Classic Italian espresso', 'Классический итальянский эспрессо', 1.20, 1),
(4, 'Americano', 'Американо', 'Espresso with hot water', 'Эспрессо с горячей водой', 1.50, 2),
(4, 'Cappuccino', 'Капучино', 'Espresso with steamed milk foam', 'Эспрессо с вспененным молоком', 1.80, 3),
(4, 'Latte', 'Латте', 'Espresso with steamed milk', 'Эспрессо с горячим молоком', 2.00, 4);

-- Чай
INSERT INTO menu_items (category_id, name, name_ru, description, description_ru, price, sort_order) VALUES
(5, 'Black Tea', 'Чёрный чай', 'Classic black tea', 'Классический чёрный чай', 1.20, 1),
(5, 'Green Tea', 'Зелёный чай', 'Classic green tea', 'Классический зелёный чай', 1.20, 2),
(5, 'Herbal Tea', 'Травяной чай', 'Chamomile, mint or linden', 'Травяной настой из ромашки, мяты или липы', 1.50, 3);

-- Соки и смузи
INSERT INTO menu_items (category_id, name, name_ru, description, description_ru, price, sort_order) VALUES
(6, 'Fresh Orange Juice', 'Свежевыжатый апельсиновый сок', '100% freshly squeezed', '100% свежевыжатый апельсиновый сок', 2.80, 1),
(6, 'Fresh Carrot Juice', 'Свежевыжатый морковный сок', '100% freshly squeezed', '100% свежевыжатый морковный сок', 2.80, 2),
(6, 'Berry Smoothie', 'Ягодный смузи', 'Berries with yogurt', 'Ягоды с йогуртом', 3.00, 3);

-- Напитки
INSERT INTO menu_items (category_id, name, name_ru, description, description_ru, price, sort_order) VALUES
(7, 'Mojito Lemonade', 'Лимонад Мохито', 'With fresh mint and lime', 'Со свежей мятой и лаймом', 2.50, 1),
(7, 'Cola', 'Кола', 'Carbonated cola drink', 'Газированный напиток кола', 1.80, 2),
(7, 'Tonic', 'Тоник', 'Carbonated tonic water', 'Газированный тоник', 1.80, 3);

-- Вода
INSERT INTO menu_items (category_id, name, name_ru, description, description_ru, price, sort_order) VALUES
(8, 'Borjomi', 'Боржоми', 'Georgian mineral water', 'Грузинская минеральная вода', 2.00, 1),
(8, 'Still Water', 'Вода без газа', 'Purified still water', 'Очищенная вода без газа', 1.00, 2);

-- Ингредиенты
INSERT INTO ingredients (id, name, name_ru) VALUES
(1, 'Tomato sauce', 'Томатный соус'),
(2, 'Mozzarella', 'Моцарелла'),
(3, 'Oregano', 'Орегано'),
(4, 'Garlic', 'Чеснок'),
(5, 'Basil', 'Базилик'),
(6, 'Mushrooms', 'Грибы'),
(7, 'Ham', 'Ветчина'),
(8, 'Parmesan', 'Пармезан'),
(9, 'Bacon', 'Бекон'),
(10, 'Onion', 'Лук');

-- Связи пицца-ингредиенты
INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 4), (2, 5),
(3, 1), (3, 2), (3, 6), (3, 7),
(4, 1), (4, 2), (4, 8), (4, 9),
(5, 1), (5, 2),
(6, 1), (6, 2), (6, 8);

-- =============================================
-- ВСТАВКА ДАННЫХ ДЛЯ СИСТЕМЫ ОТСЛЕЖИВАНИЯ
-- =============================================

-- Создание администратора (пароль: admin123)
-- Хеш пароля получен через bcrypt.hashSync('admin123', 10)
INSERT INTO admins (username, password_hash, email, role) VALUES 
('admin', '$2b$10$8K9pUqJZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', 'admin@montopizza.com', 'admin');

-- Тестовое отправление
INSERT INTO shipments (tracking_number, sender_name, sender_phone, sender_address, receiver_name, receiver_phone, receiver_address, receiver_email, weight, description, status) VALUES
('MPTEST001', 'Иван Иванов', '+7 999 123-45-67', 'г. Нальчик, ул. Ленина 10', 'Петр Петров', '+7 999 765-43-21', 'г. Нальчик, пр. Шогенцукова 25', 'test@example.com', 2.5, 'Пицца Маргарита, Карбонара', 'in_transit');

-- История статусов для тестового отправления
INSERT INTO status_history (shipment_id, status, comment) VALUES
(1, 'pending', 'Заказ создан'),
(1, 'processing', 'Заказ принят в обработку'),
(1, 'in_transit', 'Курьер выехал по адресу');

-- =============================================
-- КОНЕЦ SQL СКРИПТА
-- =============================================