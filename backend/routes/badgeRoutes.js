// backend/routes/badgeRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getUserBadges,
  awardBadge,
  getTopicBadges
} from '../controllers/badgeController.js';

const router = express.Router();

router.get('/user', protect, getUserBadges);
router.post('/award', protect, awardBadge);
router.get('/topic/:topicId', protect, getTopicBadges);

export default router;