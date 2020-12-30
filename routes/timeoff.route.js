const express = require("express");
const router = express.Router();
const controller = require("../controllers/timeoff.controller")
const api = require("../utils/api-routes")

router.get("/", controller.getAll);
router.get("/:id", controller.getTimeOff);

router.post(api.actions.create, controller.createTimeOff);

router.put(api.actions.update, controller.updateTimeOff);

router.delete(api.actions.delete + "/:id", controller.deleteTimeOff);

module.exports = router;