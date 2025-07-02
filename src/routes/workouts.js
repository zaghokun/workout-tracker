const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout.js');

// GET: Rute untuk mendapatkan semua data workout
// Alamat lengkapnya adalah GET /api/workouts/
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Rute untuk membuat data workout baru
// Alamat lengkapnya adalah POST /api/workouts/
router.post('/', async (req, res) => {
  const workout = new Workout({
    namaLatihan: req.body.namaLatihan,
    repetisi: req.body.repetisi,
    set: req.body.set,
    beban: req.body.beban
  });

  try {
    const newWorkout = await workout.save();
    res.status(201).json(newWorkout); 
  } catch (err) {
    // Mencetak error validasi ke terminal juga untuk debugging
    console.error('Mongoose Validation Error:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// Kita akan tambahkan rute untuk UPDATE dan DELETE di sini nanti

// Jangan lupa untuk mengekspor router agar bisa digunakan di server.js

module.exports = router;