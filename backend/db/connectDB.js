const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const a = await mongoose.connect(process.env.MONGO_URI,
            //{ useNewUrlParser: true, useCreateIndex: true }
        ).then(() => console.log("connected to DB"))
            .catch((err) => console.log(err))
    }
     catch (error) {
        console.log(error);
        process.exit(1);
    }
}


module.exports = connectDB;