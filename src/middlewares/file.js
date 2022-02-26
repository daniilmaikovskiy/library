const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/public/books');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.txt`);
  },
});

const allowedTypes = ['text/plain'];

const fileFilter = (req, file, cb) => {
  cb(null, allowedTypes.includes(file.mimetype));
};

module.exports = multer({ storage, fileFilter });