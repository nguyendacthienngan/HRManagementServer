const path = require('path')
const storagePaths = {
    temporary: path.join(`${__dirname}/storage/temp/`),
    faceRecognitionSamples: path.join(`${__dirname}/storage/face-recognition-samples/`)
}

module.exports = {
    storage: storagePaths
}