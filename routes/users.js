const router = require("express").Router();
const path = require("path");
const fsPromises = require("fs").promises;
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.patch("/:id/avatar", updateAvatar);

module.exports = router;
