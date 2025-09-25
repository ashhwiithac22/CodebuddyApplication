import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Your topic routes here
router.get('/', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Topics route'
  });
}));

export default router;