const express = require("express");
const router = express.Router();
const authController = require("../controllers/login.controller")
const { body } = require("express-validator");
const api = require("./../utils/api-routes")

router.post(api.actions.login, authController.doLogin);

module.exports = router;