const express = require("express");
const router = express.Router();
const userController = require("../controllers/candidate.controller")
const api = require("../utils/api-routes")

router.get("/", userController.getCheckinCandidates);
router.get("/:id", userController.getCandidate);
// router.get(api.actions.search, userController.getCheckinCandidates);

router.post(api.actions.create, userController.createCandidate);

router.put(api.actions.update, userController.updateCandidate);

router.delete(api.actions.delete + "/:id", userController.deleteCandidate);

module.exports = router;