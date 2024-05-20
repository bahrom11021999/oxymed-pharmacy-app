const express = require("express");
const router = express.Router();
const userController = require("../controllers/authController");

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.get("/isLoggedIn", userController.isLoggedIn);
router.get("/logout", userController.logOut);

module.exports = router;
