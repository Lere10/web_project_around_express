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
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      const error = new Error("User not found jiujiujiu");
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
  console.log("requisição recebida:", req.body); //consolecheck
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar }).then((newUser) => {
    res.send({ data: newUser }).catch((err) => {
      res.status(500).send({ message: err.message });
    });
  });
};
