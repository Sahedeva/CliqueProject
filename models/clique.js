var mongoose = require('mongoose');

var cliqueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar_url: String,
  user_array: Array,
  track_array: Array,
  genre: String,
  created_at: Date,
  updated_at: Date
});

var Clique = mongoose.model('Clique', cliqueSchema);

// Make this available to our other files
module.exports = Clique;