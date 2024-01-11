const authController = require("../controllers/authController");
const express = require("express");

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.signup);
router.post("/resetPassword", authController.resetPassword);
router.get("/users", authController.getAllUser);

module.exports = router;
