const faceapi = require('face-api.js')
const canvas = require('canvas')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const constants = require('../utils/constants')
const { storage } = require('../utils/constants')

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

module.exports.takeSample = async (inputPath, author) => {
    const image = await canvas.loadImage(inputPath)
    const sample = await faceapi.detectSingleFace(image, getFaceDetectorOptions(faceDetectionNet))
        .withFaceLandmarks().withFaceDescriptor()
    const storagePath = constants.storage.faceRecognitionSamples
    if (author !== undefined)
        fs.copyFileSync(inputPath, `${storagePath}/${author}.jpeg`)
    return sample
}

module.exports.match = async (referencedSample, recognizedSample) => {
    const faceMatcher = new faceapi.FaceMatcher(referencedSample)
    return faceMatcher.findBestMatch(recognizedSample.descriptor)
}

module.exports.storeSample = async (author, sample) => {
    const storagePath = constants.storage.faceRecognitionSamples
    await writeFileAsync(path.join(`${storagePath}/${author}.json`), JSON.stringify(sample, undefined, 2))
}

module.exports.loadSample = async (author) => {
    const storagePath = constants.storage.faceRecognitionSamples
    const content = await readFileAsync(`${storagePath}/${author}.json`, 'utf8')
    const sample = JSON.parse(content)
    console.log(sample.descriptor)
    return sample.descriptor
}

module.exports.loadSampleFromImage = async (author) => {
    const storagePath = constants.storage.faceRecognitionSamples
    let input = `${storagePath}/${author}.jpeg`
    const img = await canvas.loadImage(input)
    const descriptions = []
    const detections = await faceapi.detectSingleFace(img, getFaceDetectorOptions(faceDetectionNet)).withFaceLandmarks().withFaceDescriptor()
    descriptions.push(detections.descriptor)

    return new faceapi.LabeledFaceDescriptors(author, descriptions)
}