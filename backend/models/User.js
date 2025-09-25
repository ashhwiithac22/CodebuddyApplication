// backend/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  firstName: {
    type: String,
    trim: true,
    maxlength: 50,
    default: function() {
      return this.username; // Default to username
    }
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 50,
    default: ''
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  profile: {
    bio: { type: String, default: '' },
    skills: { type: [String], default: [] },
    experience: { type: String, default: '' },
    education: { type: String, default: '' }
  },
  progress: {
    completedTopics: {
      type: [{
        topic: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Topic'
        },
        completedAt: {
          type: Date,
          default: Date.now
        },
        score: {
          type: Number,
          default: 0
        }
      }],
      default: []
    },
    totalScore: {
      type: Number,
      default: 0
    },
    level: {
      type: Number,
      default: 1
    }
  },
  preferences: {
    notifications: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: 'light'
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Set firstName to username if not provided
userSchema.pre('save', function(next) {
  if (!this.firstName) {
    this.firstName = this.username;
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model('User', userSchema);