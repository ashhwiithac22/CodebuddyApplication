// backend/controllers/questionController.js
import asyncHandler from 'express-async-handler';
import Question from '../models/Question.js';

// @desc    Fetch all questions
// @route   GET /api/questions
// @access  Public
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({});
  res.json(questions);
});

// @desc    Get the daily coding round questions
// @route   GET /api/questions/daily
// @access  Public
const getDailyQuestions = asyncHandler(async (req, res) => {
  const basicQ = await Question.findOne({ difficulty: 'Basic', dailyQuestion: true });
  const easyQ = await Question.findOne({ difficulty: 'Easy', dailyQuestion: true });
  const mediumQ = await Question.findOne({ difficulty: 'Medium', dailyQuestion: true });

  if (basicQ && easyQ && mediumQ) {
    res.json({ basic: basicQ, easy: easyQ, medium: mediumQ });
  } else {
    res.status(404).json({ message: 'Daily questions not found. They may not have been set yet.' });
  }
});

// @desc    Fetch a random AI mock interview question
// @route   GET /api/questions/interview
// @access  Public
const getInterviewQuestion = asyncHandler(async (req, res) => {
  const interviewQuestion = await Question.aggregate([
    { $match: { difficulty: 'Interview' } },
    { $sample: { size: 1 } },
  ]);

  if (interviewQuestion.length > 0) {
    res.json(interviewQuestion[0]);
  } else {
    res.status(404).json({ message: 'No interview questions available.' });
  }
});

export { getQuestions, getDailyQuestions, getInterviewQuestion };