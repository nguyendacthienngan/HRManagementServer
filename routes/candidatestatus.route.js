const express = require("express");
const router = express.Router();
const controller = require("../controllers/candidatestatus.controller")
const api = require("../utils/api-routes")

router.get("/", controller.getAll);
router.get("/:id", controller.getStatus);

router.post(api.actions.create, controller.createStatus);

router.put(api.actions.update, controller.updateStatus);

router.delete(api.actions.delete + "/:id", controller.deleteStatus);

module.exports = router;