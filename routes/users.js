const router = require("express").Router();
const path = require("path");
const fsPromises = require("fs").promises;
const { getUsers, getUserById, createUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);

module.exports = router;
