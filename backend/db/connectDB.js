const mongoose = require('mongoose');
const mongodb = require('mongodb');
require('dotenv').config();

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI,
        //{ useNewUrlParser: true, useCreateIndex: true }
    ).then(() => console.log("connected to DB"))
        .catch((err) => console.log(err))
}

module.exports = connectDB;