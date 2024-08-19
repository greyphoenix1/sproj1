const express = require('express');
const router = express.Router();
const userSchema = require('../model/users');
const upload = require('../controller/upload-and-storage');
const { StatusCodes } = require('http-status-codes');
const authMiddleware = require('../middleware/auth');
const path = require('path');

//Upload route
router.post('/upload', authMiddleware, (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }
        const user = await userSchema.findById(req.user.userId);
        user.Images = req.file.path;
        await user.save();
        res.status(200).json({ msg: 'Image uploaded successfully', path: req.file.path });
    });
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
    const imagePath = path.join(__dirname, '..','uploads', filename);
    console.log("Image path:", imagePath);
    
    res.sendFile(imagePath);
})

module.exports = router;