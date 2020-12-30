const express = require("express");
const router = express.Router();
const controller = require("../controllers/localevents.controller")
const api = require("../utils/api-routes")

router.get("/", controller.getAll);
router.get("/:id", controller.getLocalEvent);

router.post(api.actions.create, controller.createLocalEvent);

router.put(api.actions.update, controller.updateLocalEvent);

router.delete(api.actions.delete + "/:id", controller.deleteLocalEvent);

module.exports = router;