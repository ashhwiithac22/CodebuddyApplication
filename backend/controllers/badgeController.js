// backend/controllers/badgeController.js
import Badge from '../models/Badge.js';
import User from '../models/User.js';

export const getUserBadges = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('badges.badgeId');
    res.json(user.badges);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const awardBadge = async (req, res) => {
  try {
    const { badgeId } = req.body;
    const user = await User.findById(req.user.id);
    
    // Check if user already has the badge
    const hasBadge = user.badges.some(b => b.badgeId.toString() === badgeId);
    
    if (!hasBadge) {
      user.badges.push({ badgeId });
      await user.save();
      res.json({ message: 'Badge awarded successfully' });
    } else {
      res.json({ message: 'User already has this badge' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTopicBadges = async (req, res) => {
  try {
    const { topicId } = req.params;
    const badges = await Badge.find({ 'criteria.topic': topicId });
    res.json(badges);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};