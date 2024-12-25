const router = require("express").Router();
const path = require("path");
const fsPromises = require("fs").promises;
const { getUsers, getUserById, createUser } = require("../controllers/films");

const USERS_PATH = path.join(__dirname, "../data/users.json");

router.get("/", (req, res) => {
  fsPromises
    .readFile(USERS_PATH, { encoding: "utf8" })
    .then((users) => {
      res.send({ data: JSON.parse(users) });
    })
    .catch(() => {
      res.status(500).send({ message: `Ocorreu um erro` });
    });
});

router.get("/:id", (req, res) => {
  fsPromises.readFile(USERS_PATH, { encoding: "utf8" }).then((users) => {
    const parsedUsersData = JSON.parse(users);
    const user = parsedUsersData.find((user) => user._id === req.params.id);
    if (!user) {
      res.status(404).send({ message: "ID do usuário não encontrado" });
    } else {
      res.send({ data: user });
    }
  });
});

module.exports = router;
