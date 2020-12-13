const express = require("express");
const router = express.Router();
const titleController = require("../controllers/jobtitles.controller")
const api = require("../utils/api-routes")

router.get("/", titleController.getAll);
router.get("/:id", titleController.getJobTitle);

router.post(api.actions.create, titleController.createJobTitle);

router.put(api.actions.update, titleController.updateJobTitle);

router.delete(api.actions.delete, titleController.deleteJobTitle);

module.exports = router;