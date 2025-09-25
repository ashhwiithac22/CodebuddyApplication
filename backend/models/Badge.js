// backend/models/Badge.js
import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  criteria: {
    type: { type: String, enum: ['points', 'topic_completion', 'problems_solved'], required: true },
    threshold: { type: Number, required: true },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }
  },
  pointsReward: { type: Number, default: 0 }
});

const Badge = mongoose.model('Badge', badgeSchema);
export default Badge;