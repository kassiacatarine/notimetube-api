const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);
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
      file: req.file.path.replace(':', '-'),
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

exports.videos = async (req, res) => {
  try {
    const { search } = req.query;
    console.log(search);

    const videos = search === undefined ? await Video.find() : await Video.find({ $text: { $search: search, $caseSensitive: false } });

    res.status(201).json(videos);
  } catch (err) {
    res.status(400).json({
      errors: [{
        title: 'Find Videos Error',
        detail: 'Something went wrong during find videos process.',
        errorMessage: err.message,
      }],
    });
  }
};

exports.video = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      throw new Error('Video must be a valid file.');
    }

    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({
      errors: [{
        title: 'Find Video Error',
        detail: 'Something went wrong during find video process.',
        errorMessage: err.message,
      }],
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      throw new Error('Video must be a valid file.');
    }

    await unlinkAsync(video.file);

    await Video.findByIdAndRemove(id);

    res.status(204).json({
      title: 'Video Successfully Removed',
      detail: 'Successfully removed video',
    });
  } catch (err) {
    res.status(400).json({
      errors: [{
        title: 'Delete Videos Error',
        detail: 'Something went wrong during delete videos process.',
        errorMessage: err.message,
      }],
    });
  }
};
