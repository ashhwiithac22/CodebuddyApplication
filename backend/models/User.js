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
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password by default in queries
  },
  firstName: {
    type: String,
    trim: true,
    default: function() {
      return this.username;
    }
  },
  lastName: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    console.log('🔑 Hashing password for user:', this.email);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('✅ Password hashed successfully');
    next();
  } catch (error) {
    console.error('💥 Password hashing error:', error);
    next(error);
  }
});

// Compare password method - ENSURED TO BE ATTACHED
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    console.log('🔑 Model comparePassword called for:', this.email);
    
    if (!this.password) {
      console.log('❌ No password field in user document');
      return false;
    }
    
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('🔑 Model comparePassword result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('💥 Model comparePassword error:', error);
    return false;
  }
};

// Create and export model
const User = mongoose.model('User', userSchema);
console.log('✅ User model created with methods:', Object.getOwnPropertyNames(User.prototype));

export default User;