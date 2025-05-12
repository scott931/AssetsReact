-- Create the assets database if it doesn't exist
CREATE DATABASE IF NOT EXISTS assets;
USE assets;

-- Create stats table
CREATE TABLE IF NOT EXISTS stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    value VARCHAR(50) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL
);

-- Create assets table
CREATE TABLE IF NOT EXISTS assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    financedBy VARCHAR(100),
    serialNumber VARCHAR(100) NOT NULL,
    tagNumber VARCHAR(100) NOT NULL,
    makeModel VARCHAR(100) NOT NULL,
    deliveryDate DATE NOT NULL,
    pvNumber VARCHAR(100),
    originalLocation VARCHAR(100),
    currentLocation VARCHAR(100),
    replacementDate DATE,
    purchaseAmount DECIMAL(10,2) NOT NULL,
    depreciationRate DECIMAL(5,2),
    annualDepreciation DECIMAL(10,2),
    accumulatedDepreciation DECIMAL(10,2),
    netBookValue DECIMAL(10,2),
    disposalDate DATE,
    disposalValue DECIMAL(10,2),
    responsibleOfficer VARCHAR(100),
    `condition` ENUM('OPERATIONAL', 'MAINTENANCE', 'OBSOLETE', 'DISPOSED') DEFAULT 'OPERATIONAL',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert some initial stats data
INSERT INTO stats (title, value, icon, color) VALUES
('Total Assets', '1,234', 'FaBox', '#4CAF50'),
('Active Dealers', '85', 'FaUsers', '#2196F3'),
('Pending Maintenance', '12', 'FaTools', '#FF9800'),
('Monthly Transactions', '456', 'FaExchangeAlt', '#9C27B0');