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

  Card.create({ name, link, _id })
    .orFail()
    .then((newCard) => {
      res.send({ data: newCard });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(new Error("CardNotFound"))
    .then((deletedCard) => {
      res.send({ message: "Card deleted successfully", data: deletedCard });
    })
    .catch((err) => {
      if (err.message === "CardNotFound") {
        return res.status(404).send({ message: "Card not found" });
      } else if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Validation error", details: err.errors });
      } else {
        return res
          .status(500)
          .send({ message: "Internal server error", error: err.message });
      }
    });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((likedCard) => {
      res.send({ message: "Card liked sucessfully", data: likedCard });
    })
    .catch((err) => {
      if (!req.user._id) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      } else if (!req.params.cardId) {
        return res.status(404).send({ message: "Card não encontrado" });
      } else {
        return res.status(500).send(err.message);
      }
    });

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((dislikedCard) => {
      res.send({ message: "card disliked sucessfully", data: dislikedCard });
    })
    .catch((err) => {
      if (!req.user._id) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      } else if (!req.params.cardId) {
        return res.status(404).send({ message: "Card não encontrado" });
      } else {
        return res.status(500).send(err.message);
      }
    });
