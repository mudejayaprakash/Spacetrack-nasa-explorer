/**
 * Database Configuration
 * Sequelize setup for PostgreSQL (Azure Database)
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

// DEBUG: Check if environment variables are loaded
console.log('🔍 DB_HOST:', process.env.DB_HOST);
console.log('🔍 DB_USER:', process.env.DB_USER);
console.log('🔍 DB_NAME:', process.env.DB_NAME);

// Database connection configuration
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    
    // SSL configuration for Azure Database
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    
    timezone: '+00:00'
});

// Test database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully!');
        console.log(`📊 Connected to: ${process.env.DB_HOST}`);
        return true;
    } catch (error) {
        console.error('❌ Unable to connect to database:', error.message);
        return false;
    }
}

// Sync database (create tables if they don't exist)
async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true });
        console.log('✅ Database synchronized successfully!');
    } catch (error) {
        console.error('❌ Error synchronizing database:', error.message);
        throw error;
    }
}

// DEBUG: Check what we're exporting
console.log('🔍 database.js - About to export sequelize:', sequelize);
console.log('🔍 database.js - sequelize type:', typeof sequelize);

module.exports = {
    sequelize,
    testConnection,
    syncDatabase
};