const express = require("express");
const router = express.Router();
const controller = require("../controllers/interviews.controller")
const api = require("../utils/api-routes")

router.get("/", controller.getAll);
router.get("/:id", controller.getInterview);

router.post(api.actions.create, controller.createInterview);

router.put(api.actions.update, controller.updateInterview);

router.delete(api.actions.delete + "/:id", controller.deleteInterview);

module.exports = router;