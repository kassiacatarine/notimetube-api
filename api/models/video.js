const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  uploadDate: {
    type: Date,
    required: true,
  },
  uploadUser: {
    type: mongoose.Schema.Types.Object,
    ref: 'Users',
  },
  file: {
    type: String,
    required: true,
  },
});

VideoSchema.index({
  name: 'text',
  description: 'text',
}, {
    weights: {
      name: 5,
      description: 1,
    },
  });

module.exports = mongoose.model('Video', VideoSchema);
