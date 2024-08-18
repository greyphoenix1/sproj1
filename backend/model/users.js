const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchama = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter name'],
        unique: [true, 'name must be unique']
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: 3,
    },
    Images: {
        type: String, 
    }
});

//hash password
userSchama.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

//create token
userSchama.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.jwt_top_secret, { expiresIn: '30d' });
}

//compare hashed passwords
userSchama.methods.comparePass = async function (inputPassword) {
    console.log("Input Password:", inputPassword);
    console.log("Stored Password:", this.password);

    const isMatch = await bcrypt.compare(inputPassword, this.password);
    console.log("Password Match Result:", isMatch);

    return isMatch;
}

module.exports = mongoose.model('User', userSchama);