const Video = require('../models/video');

exports.upload = async (req, res) => {
  try {
    const {
      name,
      description,
      uploadUser,
    } = req.body;

    if (!name) {
      throw new Error('Name must be a valid name.');
    }
    if (!uploadUser) {
      throw new Error('UploadUser must be a valid user object.');
    }
    if (!req.file) {
      throw new Error('The video must be a valid file.');
    }

    const video = new Video({
      name,
      description,
      uploadUser,
      uploadDate: new Date(),
      file: req.file.path,
    });

    await video.save();

    res.status(201).json({
      title: 'Video Uploaded Successfully',
      detail: 'Successfully uploaded new video',
    });
  } catch (err) {
    res.status(400).json({
      errors: [{
        title: 'Upload Video Error',
        detail: 'Something went wrong during upload video process.',
        errorMessage: err.message,
      }],
    });
  }
};
