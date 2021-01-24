const express = require("express");
const router = express.Router();
const controller = require("../controllers/leavetypes.controller")
const api = require("../utils/api-routes")

router.get("/", controller.getAll);
router.get("/:id", controller.getLeaveType);

router.post(api.actions.create, controller.createLeaveType);

router.put(api.actions.update, controller.updateLeaveType);

router.delete(api.actions.delete + "/:id", controller.deleteLeaveType);

module.exports = router;