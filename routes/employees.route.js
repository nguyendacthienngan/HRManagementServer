const express = require("express");
const router = express.Router();
const userController = require("../controllers/employees.controller")

router.get("/", userController.getAllUsers);
module.exports = router;