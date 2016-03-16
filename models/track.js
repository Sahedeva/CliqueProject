var mongoose = require('mongoose');

var trackSchema = new mongoose.Schema({
  content_url: { type: String, required: true },
  avatar_url: String,
  song_title: String,
  artist_name: String,
  artist_id: String,
  likes: Number,
  created_at: Date,
  updated_at: Date
});

var Track = mongoose.model('Track', trackSchema);

// Make this available to our other files
module.exports = Track;