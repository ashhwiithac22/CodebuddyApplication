import mongoose from 'mongoose';

const interviewMessageSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['ai', 'user'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isAudio: {
    type: Boolean,
    default: false
  }
});

const interviewSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    default: 'medium'
  },
  messages: [interviewMessageSchema],
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model('InterviewSession', interviewSessionSchema);