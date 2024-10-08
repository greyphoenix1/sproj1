const multer = require('multer');

const storage = multer.diskStorage({ //setting up storage
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage}).single('Images');

module.exports = upload;