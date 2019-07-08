const express = require('express');
const multer = require('multer');

const router = express.Router();
const videoController = require('../controllers/video-controller');
const auth = require('../midlewares/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'api/public/uploads/videos');
  },
  filename: (req, file, cb) => {
    cb(null, (`${new Date().toISOString()}${file.originalname}`));
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

router
  .post('/', auth, upload.single('file'), videoController.upload)
  .get('/', auth, videoController.videos)
  .get('/:id', auth, videoController.video)
  .delete('/:id', auth, videoController.delete);

module.exports = router;
