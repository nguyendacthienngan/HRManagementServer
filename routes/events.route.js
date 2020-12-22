const express = require("express");
const router = express.Router();
const controller = require("../controllers/events.controller")
const api = require("../utils/api-routes")

router.get("/", controller.getAll);
router.get("/:id", controller.getEvent);

router.post(api.actions.create, controller.createEvent);

router.put(api.actions.update, controller.updateEvent);

router.delete(api.actions.delete + "/:id", controller.deleteEvent);

module.exports = router;