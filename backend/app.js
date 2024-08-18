//imports
require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connectDB');
const authMiddleware = require('./middleware/auth');

//routes
const authRouter = require('./routes/auth');
const imagesRouter = require('./routes/images');

connectDB();

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use('/api/v1/images',authMiddleware, imagesRouter);

app.get('/', (req, res) => {
    res.send('<a>test</a>');
})

app.listen(3000, (req, res) =>{
    console.log("up n running at 3000");
})