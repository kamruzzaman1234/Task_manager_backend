const multer = require("multer");

// Configure storage 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// file Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg .jpeg .png formats are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
