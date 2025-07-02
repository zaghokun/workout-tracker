const mongoose = require('mongoose');

// Blueprint untuk data workout
const workoutSchema = new mongoose.Schema({
    namaLatihan: {
        type: String,
        required: true
    },
    repetisi:{
        type: Number,
        required: true
    },
    set: {
        type: Number,
        required: true
    },
    beban: {
        type: Number,
        required: true
    },
    tanggal: {
        type: Date,
        default: Date.now
    }
});

// Mengekspor Model berdasarkan Schema di atas
// 'Workout' adalah nama modelnya, yang akan menjadi collection 'workouts' di MongoDB
module.exports = mongoose.model('Workout', workoutSchema)