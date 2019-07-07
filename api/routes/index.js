const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('NoTimeTube API');
  // res.status(204).json('NoTimeTube API');
});

module.exports = router;
