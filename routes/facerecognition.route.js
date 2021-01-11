const express = require("express");
const router = express.Router();
const controller = require("../controllers/facerecognition.controller")
const { body } = require("express-validator");
const api = require("../utils/api-routes")
const facerec = require("../utils/face-recognizer")

facerec.init().then(() => {
    console.log("Face recognizer initialized");
    router.post(api.actions.faceRecognizer.sample, controller.takeSample);
    router.post(api.actions.faceRecognizer.identify, controller.identify);
})

module.exports = router;