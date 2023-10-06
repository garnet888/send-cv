const express = require("express");
const { signup, login, myInfo } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", myInfo);

module.exports = router;
