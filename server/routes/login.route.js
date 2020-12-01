const express = require("express");
const router = express.Router();
const authController = require("../controllers/login.controller")
const { body } = require("express-validator");
// const db = require("../models");
// const Account = db.Account;

router.post("/", authController.postLogin);
module.exports = router;