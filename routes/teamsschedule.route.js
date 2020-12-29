const express = require("express");
const router = express.Router();
const controller = require("../controllers/teamsschedule.controller")
const api = require("../utils/api-routes")

router.get("/", controller.getAll);
router.get("/:id", controller.getSchedule);

router.post(api.actions.create, controller.createSchedule);

router.put(api.actions.update, controller.updateSchedule);

router.delete(api.actions.delete + "/:id", controller.deleteSchedule);

module.exports = router;