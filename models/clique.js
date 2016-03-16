var mongoose = require('mongoose');

var cliqueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar_url: String,
  user_array: Array,
  track_array: Array,
  house: Boolean,
  hip_hop: Boolean,
  electronica: Boolean,
  jazz: Boolean,
  rock: Boolean,
  classical: Boolean,
  folk: Boolean,
  country_western: Boolean,
  trance: Boolean,
  blues: Boolean,
  created_at: Date,
  updated_at: Date
});

var Clique = mongoose.model('Clique', cliqueSchema);

// Make this available to our other files
module.exports = Clique;