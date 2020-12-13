const express = require("express");
const router = express.Router();
const userController = require("../controllers/employees.controller")
const api = require("../utils/api-routes")

router.get("/", userController.getAll);
router.get("/:id", userController.getEmployee);

router.post(api.actions.create, userController.createEmployee);

router.put(api.actions.update, userController.updateEmployee);

module.exports = router;