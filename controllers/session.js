const authModule = require('../modules/auth');
const Joi = require('joi');

exports.auth = {
  validate: {
    query: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  handler: async (req, res) => {
    const { username, password } = req.query;
    try {
      const authData = await authModule.auth({ username, password });
      res.status(200).send(authData);
    } catch (err) {
      res.boom.badRequest(err);
    }
  },
};
