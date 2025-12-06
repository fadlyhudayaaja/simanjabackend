// src/config/database.js (Kode Baru)
const { Pool } = require('pg');
require('dotenv').config();

// Gunakan DATABASE_URL yang merupakan URL koneksi penuh dari Neon
// Jika DATABASE_URL tidak ada, fallback ke konfigurasi lokal lama
const connectionString = process.env.DATABASE_URL;

const poolConfig = connectionString 
  ? { connectionString, ssl: { rejectUnauthorized: false } } // Konfigurasi untuk Neon/Production
  : { // Fallback untuk Development Lokal (jika Anda masih ingin menggunakan env terpisah)
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'simanja',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
    };

const pool = new Pool(poolConfig);

// Test connection
pool.on('connect', () => {
  console.log('✅ Terhubung ke database PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err.message);
});

module.exports = pool;