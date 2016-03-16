var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar_url: String,
  privilege: String,
  cliques: Array,
  tracks: Array,
  phone: Number,
  created_at: Date,
  updated_at: Date
});

var User = mongoose.model('User', userSchema);

// Make this available to our other files
module.exports = User;