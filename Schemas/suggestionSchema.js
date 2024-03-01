const mongoose = require('mongoose');

const suggestSchema = new mongoose.Schema({
  guildId: { type: String, required: true },
  channelId: { type: String, required: true },
  userId: { type: String, required: true },
  suggestion: { type: String, required: true },
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Suggestion', suggestSchema);
