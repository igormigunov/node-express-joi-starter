const Mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const ObjectId = Mongoose.Schema.Types.ObjectId;

const SessionSchema = new Mongoose.Schema({

  token: { type: String, required: true },

  user: [{ type: ObjectId, ref: 'User', required: true }],
  expiredAt: { type: Date },
});
SessionSchema.plugin(timestamps);

module.exports = Mongoose.model('Session', SessionSchema);
