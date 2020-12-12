const express = require("express");
const router = express.Router();
const authController = require("../controllers/login.controller")
const { body } = require("express-validator");


router.post("/", authController.postLogin);
module.exports = router;