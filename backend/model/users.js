const mongoose = require('mongoose');

const userSchama = new mongoose.Schema({
    name: {
        typeof: String,
        required: [true, 'please enter name'],
        unique: [true, 'name must be unique']
    },
    password: {
        typeof: String,
        required: [true, 'please enter a password'],
        minlength: 3,
    }
});

module.exports = mongoose.model('User', userSchama);