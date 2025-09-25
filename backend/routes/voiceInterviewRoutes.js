import express from 'express';
import asyncHandler from 'express-async-handler';
import InterviewSession from '../models/InterviewSession.js';
import InterviewAIService from '../services/InterviewAIService.js';
import { protect } from '../middleware/authMiddleware.js'; // Use protect

const router = express.Router();

// Start a new voice interview
router.post('/start', protect, asyncHandler(async (req, res) => {
  const { domain, difficulty = 'medium' } = req.body;
  const userId = req.user._id;

  try {
    // Generate first question
    const firstQuestion = await InterviewAIService.generateInterviewQuestion(domain, [], difficulty);

    // Create interview session
    const interviewSession = new InterviewSession({
      user: userId,
      domain,
      difficulty,
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
      message: 'Voice interview session started successfully'
    });
  } catch (error) {
    console.error('Error starting voice interview:', error);
    res.status(500).json({
      success: false,
      message: 'Error starting interview session'
    });
  }
}));

// Handle voice response
router.post('/respond', protect, asyncHandler(async (req, res) => {
  const { sessionId, transcript } = req.body;
  const userId = req.user._id;

  try {
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

    // Add user response
    interviewSession.messages.push({
      type: 'user',
      content: transcript,
      timestamp: new Date(),
      isAudio: true
    });

    // Get last AI question for context
    const aiMessages = interviewSession.messages.filter(msg => msg.type === 'ai');
    const lastQuestion = aiMessages[aiMessages.length - 1]?.content;

    // Get AI evaluation
    const evaluation = await InterviewAIService.evaluateAnswer(
      lastQuestion, 
      transcript, 
      interviewSession.domain
    );

    // Add AI feedback
    interviewSession.messages.push({
      type: 'ai',
      content: evaluation.feedback,
      timestamp: new Date()
    });

    // Add follow-up question if needed
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
      score: evaluation.score
    });
  } catch (error) {
    console.error('Error processing voice response:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing response'
    });
  }
}));

// End interview
router.post('/end', protect, asyncHandler(async (req, res) => {
  const { sessionId } = req.body;
  const userId = req.user._id;

  try {
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

    interviewSession.status = 'completed';
    interviewSession.completedAt = new Date();
    await interviewSession.save();

    res.json({
      success: true,
      summary: 'Interview completed successfully. Thank you for your participation!',
      totalQuestions: interviewSession.messages.filter(m => m.type === 'ai').length,
      totalResponses: interviewSession.messages.filter(m => m.type === 'user').length
    });
  } catch (error) {
    console.error('Error ending interview:', error);
    res.status(500).json({
      success: false,
      message: 'Error ending interview'
    });
  }
}));

export default router;