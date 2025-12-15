
const express = require("express");
const router = express.Router();
const { register, verifyEmail, login } = require("../Controllers/authController");

router.post("/register", register);      // body: {name,email,password}
router.post("/verify", verifyEmail);     // body: {email,code}
router.post("/login", login);            // body: {email,password}


module.exports = router;
