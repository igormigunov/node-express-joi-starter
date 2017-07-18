const SessionModel = require('../models/session');
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');

exports.auth = async (payload) => {
  const d = new Date();
  d.setSeconds(d.getSeconds() + (process.env.SESSION_EXP / 1000));
  const expiredAt = new Date(d);
  const user = await UserModel.model
    .findOne({ username: payload.username });
  if (!user) throw new Error(404);
  await user.comparePassword(payload.password);
  const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
    expiresIn: process.env.SESSION_EXP,
  });
  const session = await SessionModel.findOne({ user: user._id });
  if (session) {
    session.token = token;
    session.expiredAt = expiredAt;
    return session.save();
  }
  return SessionModel.create({ user: user._id, token, expiredAt });
};
