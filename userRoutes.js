const userController = require("../controller/userController");
const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getUser", auth, userController.getUser);

module.exports = router;
