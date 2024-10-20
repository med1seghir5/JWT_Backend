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

// Refresh Token Schema
const RefreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports = { Person, RefreshToken };
