const mongoose = require('mongoose');

// Extraire Schema depuis mongoose
const { Schema } = mongoose;

// Users Schema
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
const MedicamentSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    AriDate: {
        type: Date,
        default: Date.now
    },
    ExpDate: {
        type: Date,
        default: Date.now,
        expires: 3600 * 24 * 30
    },
    Quant: {
        type: Number,
        default: 0
    },
    OnePrice: {
        type: Number,
        required: true
    }
});

// Getter virtuel pour TotalPrice
MedicamentSchema.virtual('TotalPrice').get(function() {
    return this.Quant * this.OnePrice;
});

const Medicament = mongoose.model('Medicament', MedicamentSchema);

module.exports = { Person, Medicament };
