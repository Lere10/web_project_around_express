const router = require("express").Router();
const path = require("path");
const fsPromises = require("fs").promises;
const { getCards, createCard, deleteCard } = require("../controllers/cards.js");

router.get("/", getCards);
router.post("/", createCard);
router.delete("/", deleteCard);

module.exports = router;
