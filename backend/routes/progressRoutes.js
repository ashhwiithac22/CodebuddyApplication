import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js'; // Fixed import

const router = express.Router();

// Get user progress
router.get('/', protect, asyncHandler(async (req, res) => {
  try {
    // Your progress route logic here
    res.json({
      success: true,
      progress: req.user.progress || {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching progress'
    });
  }
}));

// Add other progress routes as needed

export default router;