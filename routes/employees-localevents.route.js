const express = require("express");
const router = express.Router();
const controller = require("../controllers/employees-localevents.controller")
const api = require("../utils/api-routes")

router.get("/", controller.getAll);
// router.get("/:id", controller.getCandidate);

router.post(api.actions.create, controller.assignRelations);

// router.put(api.actions.update, controller.updateRelations);

// router.delete(api.actions.delete + "/:id", controller.deleteCandidate);

module.exports = router;