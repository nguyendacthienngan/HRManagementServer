const express = require("express");
const router = express.Router();
const controller = require("../controllers/candidates-interviews.controller")
const api = require("../utils/api-routes")

router.get("/", controller.getAll);
// router.get("/:id", controller.getCandidate);

// router.post(api.actions.create, controller.createCandidate);

// router.put(api.actions.update, controller.updateCandidate);

// router.delete(api.actions.delete + "/:id", controller.deleteCandidate);

module.exports = router;