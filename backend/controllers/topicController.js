// backend/controllers/topicController.js
import asyncHandler from 'express-async-handler';
import Topic from '../models/Topic.js';

// @desc    Fetch all topics
// @route   GET /api/topics
// @access  Public
const getTopics = asyncHandler(async (req, res) => {
  const topics = await Topic.find({});
  res.json(topics);
});

// @desc    Fetch single topic by name
// @route   GET /api/topics/:name
// @access  Public
const getTopicByName = asyncHandler(async (req, res) => {
  const topic = await Topic.findOne({ name: req.params.name });
  if (topic) {
    res.json(topic);
  } else {
    res.status(404).json({ message: 'Topic not found' });
  }
});

export { getTopics, getTopicByName };