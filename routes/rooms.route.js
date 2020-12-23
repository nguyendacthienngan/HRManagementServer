const express = require("express");
const router = express.Router();
const controller = require("../controllers/rooms.controller")
const api = require("../utils/api-routes")

router.get("/", controller.getAll);
router.get("/:id", controller.getRoom);

router.post(api.actions.create, controller.createRoom);

router.put(api.actions.update, controller.updateRoom);

router.delete(api.actions.delete + "/:id", controller.deleteRoom);

module.exports = router;