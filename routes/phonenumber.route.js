const express = require("express");
const router = express.Router();
const controller = require("../controllers/phonenumber.controller")
const api = require("../utils/api-routes")

router.get("/", controller.getAll);
router.get("/:id", controller.getPhone);

router.post(api.actions.create, controller.createPhone);

router.put(api.actions.update, controller.updatePhone);

router.delete(api.actions.delete + "/:id", controller.deletePhone);

module.exports = router;