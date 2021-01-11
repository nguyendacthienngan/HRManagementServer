const faceapi = require('face-api.js')
const canvas = require('canvas')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const constants = require('../utils/constants')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

const faceDetectionNet = faceapi.nets.ssdMobilenetv1
// export const faceDetectionNet = tinyFaceDetector

// SsdMobilenetv1Options
const minConfidence = 0.5

// TinyFaceDetectorOptions
const inputSize = 408
const scoreThreshold = 0.5

// mokey pathing the faceapi canvas
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

function getFaceDetectorOptions(net) {
    return net === faceapi.nets.ssdMobilenetv1
        ? new faceapi.SsdMobilenetv1Options({ minConfidence })
        : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
}

module.exports.init = async () => {
    await faceapi.nets.faceRecognitionNet.loadFromDisk('weights')
    await faceapi.nets.faceLandmark68Net.loadFromDisk('weights')
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('weights')
}

module.exports.takeSample = async (inputPath) => {
    const image = await canvas.loadImage(inputPath)
    const sample = await faceapi.detectSingleFace(image, getFaceDetectorOptions(faceDetectionNet))
        .withFaceLandmarks().withFaceDescriptor()
    return sample
}

module.exports.match = async (sample) => {
    const faceMatcher = new faceapi.FaceMatcher(sample)
    return faceMatcher.findBestMatch(sample.descriptor)
}

module.exports.storeSample = async (author, sample) => {
    const storagePath = constants.storage.faceRecognitionSamples;
    await writeFileAsync(path.join(`${storagePath}/${author}.json`), JSON.stringify(sample))
}