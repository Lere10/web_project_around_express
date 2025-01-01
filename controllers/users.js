const { error } = require("console");
const User = require("../models/user.js");

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      const error = new Error("Users not found");
      error.statusCode = 404;
      throw error;
    })
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById({ _id: id })
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar }).then((newUser) => {
    res.send({ data: newUser }).catch((err) => {
      res.status(500).send({ message: err.message });
    });
  });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    })
    .then((updatedUser) => res.send({ data: updatedUser }))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar })
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    })
    .then((updatedAvatar) => {
      res.send({ data: updatedAvatar });
    })
    .catch(next);
};
