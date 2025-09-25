import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import badgeRoutes from './routes/badgeRoutes.js';
import voiceInterviewRoutes from './routes/voiceInterviewRoutes.js'; // Add this
import setDailyQuestions from './utils/dailyCron.js';
import cors from 'cors';
import mongoose from 'mongoose';
import { createServer } from 'http'; // Add this
import SocketService from './services/SocketService.js'; // Add this

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

dotenv.config();

// Connect to database
connectDB().catch(err => {
  console.error('❌ Database connection failed:', err);
  process.exit(1);
});

// Initialize express app
const app = express();

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO
SocketService.initialize(server);

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/voice-interview', voiceInterviewRoutes); // Add this

// Run the daily cron job once on server start
setDailyQuestions();

// Define a simple root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'API is running...',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected'
  });
});

// Add a health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`🔌 Socket.IO enabled for real-time voice interviews`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});