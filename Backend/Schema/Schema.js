const mongoose = require('mongoose');

// Extraire Schema depuis mongoose
const { Schema } = mongoose;

//Users Schema
const PersonsSchema = new Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },

    Password: {
        type: String,
        required: true,
        minlength: 5
    }
});

const Person = mongoose.model('Person', PersonsSchema);

// Medicament Schema
const MedicamentSchema = new mongoose.Schema({
    name:{
        type: 'string',
    },

    AriDate:{
        type: Date,
        default: Date.now
    },

    ExpDate:{
        type: Date,
        default: Date.now,
        expires: 3600 * 24 * 30
    },

    Quant:{
        type: Number,
        default: 0
    }
});

const Medicament = mongoose.model('Medicament', MedicamentSchema);

module.exports = { Person, Medicament };
