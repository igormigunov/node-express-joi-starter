const UserModel = require('../models/user');
const authModule = require('../modules/auth');

exports.post = {
  validate: UserModel.validate.post,
  handler: async (req, res) => {
    const { username, email, phone, password } = req.body;
    try {
      const user = await UserModel.model.create({
        username,
        email,
        phone,
        password });
      const authData = await authModule.auth({ username, password });
      const result = Object.assign({}, user.toObject(), { token: authData.token });
      res.status(201).send(result);
    } catch (err) {
      res.boom.badRequest(err);
    }
  },
};
exports.getById = {
  validate: UserModel.validate.getById,
  handler: async (req, res) => {
    try {
      const result = await UserModel.model.findById(req.params.id).lean();
      if (!result) res.boom.notFound();
      res.status(200).send(result);
    } catch (err) {
      res.boom.badRequest(err);
    }
  },
};
exports.patch = {
  validate: UserModel.validate.patch,
  handler: async (req, res) => {
    try {
      const result = await UserModel.model.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }).lean();
      if (!result) {
        res.boom.notFound();
      }
      res.status(200).send(result);
    } catch (err) {
      res.boom.badRequest(err);
    }
  },
};
exports.delete = {
  validate: UserModel.validate.delete,
  handler: async (req, res) => {
    try {
      const result = await UserModel.model.delete({ _id: req.params.id });
      res.status(200).send(result);
    } catch (err) {
      res.boom.badRequest(err);
    }
  },
};
