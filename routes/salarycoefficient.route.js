const express = require("express");
const router = express.Router();
const controller = require("../controllers/salarycoefficient.controller")
const api = require("../utils/api-routes")

router.get("/", controller.getAll);
router.get("/:id", controller.getSalaryCoef);

router.post(api.actions.create, controller.createSalaryCoef);

router.put(api.actions.update, controller.updateSalaryCoef);

router.delete(api.actions.delete + "/:id", controller.deleteSalaryCoef);

module.exports = router;