const express = require("express");
const router = express.Router();
const controller = require("../controllers/timeoff.controller")
const api = require("../utils/api-routes")

router.get("/", controller.getAll);
router.get("/:id", controller.getTimeOff);
router.get(api.actions.search + "/individual/:id", controller.getEmployeeTimeoff);
router.get(api.actions.search + "/team/:id", controller.getTeamTimeoff);

router.post(api.actions.create, controller.createTimeOff);

router.put(api.actions.confirm, controller.updateRequestStatus);
router.put(api.actions.update, controller.updateTimeOff);

router.delete(api.actions.delete + "/:id", controller.deleteTimeOff);

module.exports = router;