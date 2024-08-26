const express = require('express');
const router = express.Router();
const userSchema = require('../model/users');
const upload = require('../controller/upload-and-storage');
const { StatusCodes } = require('http-status-codes');
const authMiddleware = require('../middleware/auth');
const path = require('path');
const multer = require('multer');


//Upload route
router.post('/upload', authMiddleware, upload, async (req, res) => {
        const filePath = req.file.path;

        const user = await userSchema.findById(req.user.userId);
        user.Images.push(filePath);
        await user.save();
        
        res.status(200).json({ msg: 'Image uploaded successfully', path: req.file.path });
});

router.post('/uploadImage', upload, async (req, res) => {
    try {
        const user = await userSchema.findById(req.user.userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
        user.images.push(req.file.path);
        await user.save();

        res.status(StatusCodes.OK).json({ message: 'Image uploaded successfully', images: user.images });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'image upload failed', error: error.message })
    }
});

//accessing the image
router.get('/userProfile', async (req, res) => {
    try {
        //find user
        const user = await userSchema.findOne({ name: req.user.name });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: 'user not found' });
        }

        ///send images
        res.status(StatusCodes.OK).json({ Images: user.Images });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
})

router.get('/:filename', async (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '..', 'uploads', filename);
    console.log("Image path:", imagePath);

    res.sendFile(imagePath);
})



module.exports = router;