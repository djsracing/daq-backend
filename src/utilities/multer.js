const multer = require('multer');

// Setting storage path
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

// Setting allowed filetypes
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        console.log(file.mimetype);
        cb(null, false);
    }
};

// Setting multer configs
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;