const express = require("express");
const router = express.Router();
const controller = require("../controllers/teams.controller")
const api = require("../utils/api-routes")

router.get("/", controller.getAll);
router.get("/:id", controller.getTeam);

router.post(api.actions.create, controller.createTeam);

router.put(api.actions.update, controller.updateTeam);

router.delete(api.actions.delete + "/:id", controller.deleteTeam);

module.exports = router;