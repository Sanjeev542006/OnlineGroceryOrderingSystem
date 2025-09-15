-- Insert sample users
INSERT IGNORE INTO users (name, email, password, role, address) VALUES 
('Admin User', 'admin@grocery.com', 'password', 'ADMIN', '123 Admin Street'),
('John Doe', 'john@example.com', 'password', 'CUSTOMER', '456 Customer Ave'),
('Jane Smith', 'jane@example.com', 'password', 'CUSTOMER', '789 Customer Blvd'),
('Vendor One', 'vendor1@grocery.com', 'password', 'VENDOR', '321 Vendor Street'),
('Vendor Two', 'vendor2@grocery.com', 'password', 'VENDOR', '654 Vendor Ave');

-- Insert sample vendors
INSERT IGNORE INTO vendors (user_id, name, status) VALUES 
(4, 'Fresh Market Store', 'APPROVED'),
(5, 'Organic Foods Co', 'PENDING');

-- Insert sample products
-- INSERT IGNORE INTO products (name, description, price, stock, image_url, vendor_id, category) VALUES 
-- ('Fresh Organic Apples', 'Crisp and sweet organic apples, perfect for snacking or baking.', 4.99, 50, 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop', 1, 'Fruits & Vegetables'),
-- ('Premium Bananas', 'Fresh, ripe bananas packed with natural sweetness and nutrients.', 2.49, 30, 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop', 1, 'Fruits & Vegetables'),
-- ('Fresh Milk', 'Farm-fresh whole milk, rich in calcium and vitamins.', 3.99, 25, 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop', 1, 'Dairy & Eggs'),
-- ('Whole Grain Bread', 'Nutritious whole grain bread, perfect for sandwiches and toast.', 2.99, 40, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop', 2, 'Bakery'),
-- ('Premium Chicken Breast', 'Fresh, lean chicken breast, perfect for healthy meals.', 8.99, 15, 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop', 2, 'Meat & Seafood'),
-- ('Orange Juice', 'Freshly squeezed orange juice, no added sugar or preservatives.', 4.49, 0, 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop', 2, 'Beverages');

-- Insert sample orders
INSERT IGNORE INTO orders (customer_id, order_date, status, total_amount) VALUES 
(2, '2024-01-15', 'PENDING', 12.48),
(3, '2024-01-14', 'COMPLETED', 7.98);

-- Insert sample order items
INSERT IGNORE INTO order_items (order_id, product_id, quantity, price) VALUES 
(1, 1, 2, 4.99),
(1, 2, 1, 2.49),
(2, 3, 2, 3.99);