import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(204).json('NoTimeTube API');
});

export default router;
