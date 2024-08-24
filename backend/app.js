//imports
require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connectDB');
const authMiddleware = require('./middleware/auth');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

//routes
const authRouter = require('./routes/auth');
const imagesRouter = require('./routes/images');



connectDB();



app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));



app.use("/api/v1/auth", authRouter);
app.use('/api/v1/images', authMiddleware, imagesRouter);

//socket
io.on('connection', (socket) => {
    console.log('a user has connected');

    socket.emit('status', 'Looking for devices...');

    setTimeout(() => { //Device discovery
        socket.emit('devicesFound', ['Device 1', 'Device 2']);
    }, 2000);

    socket.on('connectToDevice', (device) => {
        console.log(`Connecting to ${device}`);
        socket.emit('status', `Conected to ${device}`);
    });

    socket.on('sendImage', (data) => {
        socket.broadcast.emit('receiveImage', data);
    });

    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });
});



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.get('/', (req, res) => {
    res.send('<a>test</a>');
})

server.listen(3000, (req, res) => {
    console.log("up n running at 3000");
})