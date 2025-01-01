const { error } = require("console");
const Card = require("../models/card.js");

module.exports.getCards = (req, res, next) => {
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
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  console.log("requisição de card: ", req.body);
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.send({ data: newCard });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((deletedCard) => {
      if (!deletedCard) {
        const error = new Error("Card not found");
        error.statusCode = 404;
        throw error;
      }
      res.send({ message: "Card deleted successfully", data: deletedCard });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Card not found");
      error.statusCode = 404;
      throw error;
    })
    .then((likedCard) => {
      res.send({ message: "Card liked sucessfully", data: likedCard });
    })
    .catch(next);

module.exports.dislikeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Cartão não encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((dislikedCard) => {
      res.send({ message: "card disliked sucessfully", data: dislikedCard });
    })
    .catch(next);
