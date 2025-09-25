import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Example protected route
router.get('/profile', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
}));

export default router;
