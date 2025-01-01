const { error } = require("console");
const User = require("../models/user.js");

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error("Users not found blebleble");
      error.statusCode = 404;
      throw error;
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).send({ message: err.message });
    });
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  console.log(req);
  User.findById({ _id: id })
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar }).then((newUser) => {
    res.send({ data: newUser }).catch((err) => {
      res.status(500).send({ message: err.message });
    });
  });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about })
    .orFail()
    .then((updatedUser) => res.send({ data: updatedUser }))
    .catch((err) => {
      if (!_id) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar })
    .orFail()
    .then((updatedAvatar) => {
      res.send({ data: updatedAvatar });
    })
    .catch((err) => {
      if (!_id) {
        return res.status(404).send({ message: "User not found" });
      } else {
        return res.status(500).send(err.message);
      }
    });
};
