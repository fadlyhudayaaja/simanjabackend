// app.js (Konten BARU: Logika Express Anda)

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'file://', 'null'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test route
app.get('/', (req, res) => {
  res.json({ /* ... response test route ... */ });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Error handling middleware (Penting: Masukkan kembali semua logika Multer, Cloudinary, JWT Anda di sini)
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  // ... [Semua logika Multer, Cloudinary, JWT error handling] ...
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint tidak ditemukan'
  });
});

// EKSPOR APLIKASI EXPRESS (Bukan pool database)
module.exports = app;
