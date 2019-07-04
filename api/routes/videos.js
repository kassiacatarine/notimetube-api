const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'api/public/uploads/videos');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'video/mp4' || file.mimetype === 'video/mpeg' || file.mimetype === 'video/x-msvideo') {
    cb(null, true);
  } else {
    cb(new Error('Invalid video file type.'), false);
  }
};

const upload = multer({ storage, fileFilter });
const videoController = require('../controllers/video-controller');

router.post('/', upload.single('videoUpload'), videoController.upload);

router.get('/', videoController.videos);

router.get('/:id', videoController.video);

router.delete('/:id', videoController.delete);

module.exports = router;
