import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Your question routes here
router.get('/', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Questions route'
  });
}));

export default router;