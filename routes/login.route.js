const express = require("express");
const router = express.Router();
const authController = require("../controllers/login.controller")
const { body } = require("express-validator");
const api = require("./../utils/api-routes")

router.get("/:id", authController.getAccountFromEmployeeID);

router.post(api.actions.login, authController.doLogin);

router.put(api.actions.update, authController.modifyPassword);

module.exports = router;