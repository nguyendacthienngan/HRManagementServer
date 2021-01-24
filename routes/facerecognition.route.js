const express = require("express");
const router = express.Router();
const controller = require("../controllers/facerecognition.controller")
const { body } = require("express-validator");
const api = require("../utils/api-routes")
const facerec = require("../utils/face-recognizer")
const multer = require('multer')

// const diskStorage = uploader.diskStorage(
//   ["image/jpeg", "image/png"],
//   constants.storage.temporary
// )
let sampleStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'storage/temp/');
    },
    filename: (req, file, callback) => {
        let filename = 'sample.jpeg'
        callback(null, filename);
    }
})

let identityStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'storage/temp/');
    },
    filename: (req, file, callback) => {
        let filename = 'recognize.jpeg'
        callback(null, filename);
    }
})

const uploadSample = multer({ storage: sampleStorage })
const uploadIdentity = multer({ storage: identityStorage })

facerec.init().then(() => {
    console.log("Face recognizer initialized");
    router.post(api.actions.faceRecognizer.sample, uploadSample.single('file'), controller.takeSample);
    router.post(api.actions.faceRecognizer.identify, uploadIdentity.single('file'), controller.identify);
})

module.exports = router;