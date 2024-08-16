//imports
require('dotenv').config();
const express = require('express');
const app = express();

//routes
const authRouter = require('./routes/auth');

app.use(express.json());
app.use("/api/v1", authRouter);

app.get('/', (req, res) => {
    res.send('<a>test</a>');
})

app.listen(3000, (req, res) =>{
    console.log("up n running at 3000");
})