// backend/models/Question.js
import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  statement: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Basic', 'Easy', 'Medium', 'Hard', 'Interview'],
  },
  testCases: [
    {
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
    },
  ],
  isInterviewQuestion: {
    type: Boolean,
    default: false,
  },
  dailyQuestion: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Question = mongoose.model('Question', questionSchema);
export default Question;