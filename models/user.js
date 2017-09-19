const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create A Schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create a Model
const User = mongoose.model('user', userSchema);

// Export Model
module.exports = User;
