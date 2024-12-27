const { error } = require("console");
const Card = require("../models/card.js");

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error("Cards not found uwu");
      error.statusCode = 404;
      throw error;
    })
    .then((cards) => {
      console.log(cards);
      res.send({ data: cards });
    })
    .catch((err) => {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).send({ message: err.message });
    });
};

module.exports.createCard = (req, res) => {
  console.log("requisição de card: ", req.body);
  const { name, link } = req.params;
  const { _id } = req.user;

  Card.create({ name, link })
    .orFail()
    .then((newCard) => {
      res.send({ data: newCard });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  const { _id } = req.params;

  Card.findByIdAndRemove({ _id })
    .orFail()
    .then((deletedCard) => {
      res.send(deletedCard);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
