const express = require('express');
const router = express.Router();
const userSchema = require('../model/users');
const upload = require('../controller/upload-and-storage');
const {StatusCodes} = require('http-status-codes');

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const user =await userSchema.findById(req.user._id);

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({msg: 'user not found'});

        }
        user.Images = req.file.path;
        await user.save();

        res.status(StatusCodes.OK).json({ message: "Uploaded", path: user.Images});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error uploading", error});
    }
});

module.exports = router;