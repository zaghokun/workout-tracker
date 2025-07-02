// Memuat variabel dari file .env ke process.env
// HARUS berada di baris paling atas
require('dotenv').config();

// Mengimpor package yang dibutuhkan
const express = require('express');
const mongoose = require('mongoose');
const workoutRouter = require('./src/routes/workouts.js'); // <-- PATH SUDAH DIPERBAIKI

// Membuat aplikasi Express
const app = express();

// Menentukan PORT
const PORT = 3000;

// Middleware
// 1. Memberitahu Express untuk menyajikan file statis dari folder 'public'
app.use(express.static('public'));
// 2. Memberitahu Express untuk bisa membaca format JSON dari body request
app.use(express.json());

// Menggunakan Router
// Semua request yang masuk ke /api/workouts akan ditangani oleh workoutRouter
app.use('/api/workouts', workoutRouter);

// Menghubungkan ke database MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Berhasil terhubung ke MongoDB');
    
    // Menjalankan server HANYA SETELAH koneksi database berhasil
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Koneksi database GAGAL:', err);
  });
