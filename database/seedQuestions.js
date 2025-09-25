import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../backend/models/Question.js';

// Load environment variables from backend/.env
dotenv.config({ path: './backend/.env' });

const questions = [
  // Basic Question
  {
    title: 'Sum of Two Numbers',
    statement: 'Write a function that takes two numbers and returns their sum.',
    difficulty: 'Basic',
    testCases: [
      { input: '5, 3', output: '8' },
      { input: '10, 20', output: '30' },
    ],
    dailyQuestion: false,
  },
  // Easy Question
  {
    title: 'Check for Palindrome',
    statement: 'Write a function that checks if a string is a palindrome. A palindrome is a word, phrase, or sequence that reads the same backward as forward.',
    difficulty: 'Easy',
    testCases: [
      { input: '"racecar"', output: 'true' },
      { input: '"hello"', output: 'false' },
    ],
    dailyQuestion: false,
  },
  // Medium Question
  {
    title: 'Find the Missing Number',
    statement: 'Given an array of n-1 integers, where each integer is in the range of 1 to n. There are no duplicates in the array. Find the missing integer.',
    difficulty: 'Medium',
    testCases: [
      { input: '[1, 2, 4, 6, 3, 7, 8]', output: '5' },
      { input: '[1, 2, 3, 5]', output: '4' },
    ],
    dailyQuestion: false,
  },
  // Another Basic Question
  {
    title: 'Hello World',
    statement: 'Write a program that prints "Hello, World!" to the console.',
    difficulty: 'Basic',
    testCases: [
      { input: '""', output: '"Hello, World!"' },
    ],
    dailyQuestion: false,
  },
  // Another Easy Question
  {
    title: 'Reverse a String',
    statement: 'Write a function to reverse a string without using any built-in functions.',
    difficulty: 'Easy',
    testCases: [
      { input: '"CodeBuddy"', output: '"yddubedoC"' },
      { input: '"Python"', output: '"nohtyP"' },
    ],
    dailyQuestion: false,
  },
  // Another Medium Question
  {
    title: 'Two Sum',
    statement: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
    difficulty: 'Medium',
    testCases: [
      { input: '[2, 7, 11, 15], 9', output: '[0, 1]' },
      { input: '[3, 2, 4], 6', output: '[1, 2]' },
    ],
    dailyQuestion: false,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB. Seeding...');

  try {
    await Question.deleteMany({});
    await Question.insertMany(questions);
    console.log('Database seeded successfully! 🎉');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    mongoose.connection.close();
  }
}

seed();