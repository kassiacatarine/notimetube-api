const express = require('express');

const router = express.Router();
const userController = require('../controllers/user-controller');
const auth = require('../midlewares/auth');

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

/* GET ALL USERS */
router
  .get('/', auth, userController.users)
  .delete('/', auth, userController.deleteMany);

// /* GET SINGLE USER BY ID */
// router.get('/:id', function (req, res, next) {
//   User.findById(req.params.id, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// /* SAVE USER */
// router.post('/', function (req, res, next) {
//   User.create(req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// /* UPDATE USER */
// router.put('/:id', function (req, res, next) {
//   User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// /* DELETE USER */
// router.delete('/:id', function (req, res, next) {
//   User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });


module.exports = router;
