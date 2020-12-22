const express = require("express");
const router = express.Router();
const controller = require("../controllers/publicevents.controller")
const api = require("../utils/api-routes")

router.get("/", controller.getAll);
router.get("/:id", controller.getPublicEvent);

router.post(api.actions.create, controller.createPublicEvent);

router.put(api.actions.update, controller.updatePublicEvent);

router.delete(api.actions.delete + "/:id", controller.deletePublicEvent);

module.exports = router;