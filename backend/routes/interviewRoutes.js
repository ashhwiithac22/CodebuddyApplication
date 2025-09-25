//backend/routes/interviewRoutes.js
import express from 'express';
import asyncHandler from 'express-async-handler';
import InterviewSession from '../models/InterviewSession.js';
import InterviewAIService from '../services/InterviewAIService.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Start a new interview session
router.post('/start', authMiddleware, asyncHandler(async (req, res) => {
  const { topic, difficulty = 'medium' } = req.body;
  const userId = req.user._id;

  // Generate first question
  const firstQuestion = await InterviewAIService.generateInterviewQuestion(topic, [], difficulty);

  // Create interview session
  const interviewSession = new InterviewSession({
    user: userId,
    topic,
    messages: [
      {
        type: 'ai',
        content: firstQuestion,
        timestamp: new Date()
      }
    ]
  });

  await interviewSession.save();

  res.json({
    success: true,
    sessionId: interviewSession._id,
    question: firstQuestion,
    message: 'Interview session started successfully'
  });
}));

// Send response and get AI feedback
router.post('/respond', authMiddleware, asyncHandler(async (req, res) => {
  const { sessionId, response } = req.body;
  const userId = req.user._id;

  // Find the interview session
  const interviewSession = await InterviewSession.findOne({
    _id: sessionId,
    user: userId,
    status: 'active'
  });

  if (!interviewSession) {
    return res.status(404).json({
      success: false,
      message: 'Interview session not found or already completed'
    });
  }

  // Get the last AI question
  const aiMessages = interviewSession.messages.filter(msg => msg.type === 'ai');
  const lastQuestion = aiMessages[aiMessages.length - 1].content;

  // Add user response
  interviewSession.messages.push({
    type: 'user',
    content: response,
    timestamp: new Date()
  });

  // Get AI evaluation and next question
  const evaluation = await InterviewAIService.evaluateAnswer(
    lastQuestion, 
    response, 
    interviewSession.topic
  );

  // Add AI feedback
  interviewSession.messages.push({
    type: 'ai',
    content: evaluation.feedback,
    timestamp: new Date()
  });

  // Add follow-up question if available
  if (evaluation.followUpQuestion) {
    interviewSession.messages.push({
      type: 'ai',
      content: evaluation.followUpQuestion,
      timestamp: new Date()
    });
  }

  await interviewSession.save();

  res.json({
    success: true,
    feedback: evaluation.feedback,
    followUp: evaluation.followUpQuestion,
    score: evaluation.score,
    strengths: evaluation.strengths,
    improvements: evaluation.improvements
  });
}));

// End interview session
router.post('/end', authMiddleware, asyncHandler(async (req, res) => {
  const { sessionId } = req.body;
  const userId = req.user._id;

  const interviewSession = await InterviewSession.findOne({
    _id: sessionId,
    user: userId,
    status: 'active'
  });

  if (!interviewSession) {
    return res.status(404).json({
      success: false,
      message: 'Interview session not found'
    });
  }

  // Generate final feedback
  const finalFeedback = await InterviewAIService.generateFinalFeedback(
    interviewSession.messages,
    interviewSession.topic
  );

  // Update session
  interviewSession.status = 'completed';
  interviewSession.completedAt = new Date();
  interviewSession.feedback = finalFeedback;

  await interviewSession.save();

  res.json({
    success: true,
    summary: finalFeedback.summary,
    scores: {
      overall: finalFeedback.overallScore,
      technical: finalFeedback.technicalScore,
      communication: finalFeedback.communicationScore
    },
    strengths: finalFeedback.strengths,
    improvements: finalFeedback.areasForImprovement
  });
}));

// Get interview history
router.get('/history', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const interviews = await InterviewSession.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select('topic status startedAt completedAt feedback');

  const total = await InterviewSession.countDocuments({ user: userId });

  res.json({
    success: true,
    interviews,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total
  });
}));

// Get specific interview details
router.get('/:sessionId', authMiddleware, asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const userId = req.user._id;

  const interview = await InterviewSession.findOne({
    _id: sessionId,
    user: userId
  });

  if (!interview) {
    return res.status(404).json({
      success: false,
      message: 'Interview session not found'
    });
  }

  res.json({
    success: true,
    interview
  });
}));

export default router;