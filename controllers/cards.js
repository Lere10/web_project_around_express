const { error } = require("console");
const Card = require("../models/card.js");

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error("Cards not found");
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
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.send({ data: newCard });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((deletedCard) => {
      if (!deletedCard) {
        return res.status(404).send({ message: "Card not found" });
      }
      res.send({ message: "Card deleted successfully", data: deletedCard });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid Card ID" });
      }
      console.error(err);
      return res
        .status(500)
        .send({ message: "Internal server error", error: err.message });
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
        return res.status(404).send({ message: "User not found" });
      } else if (!req.params.cardId) {
        return res.status(404).send({ message: "Card not found" });
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
        return res.status(404).send({ message: "User not found" });
      } else if (!req.params.cardId) {
        return res.status(404).send({ message: "Card not found" });
      } else {
        return res.status(500).send(err.message);
      }
    });
