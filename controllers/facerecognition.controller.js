const constants = require('../utils/constants')
const uploader = require('../utils/uploader')
const http = require('../utils/http-status')
const facerec = require('../utils/face-recognizer')

module.exports.takeSample = async (req, res) => {
  console.log(req.file)
  // if (next) res.status(http.INTERNAL_SERVER_ERROR).send(next)
  let input = `${constants.storage.temporary}/${req.file.filename}`
  console.log(input)
  try {
    const referencedSample = await facerec.takeSample(input, req.body.identification)
    // await facerec.storeSample(req.body.identification, referencedSample)
    if (referencedSample) res.status(http.OK).json({ result: 'success', data: referencedSample })
    else res.status(http.OK).json({ result: 'failure' })
  }
  catch (err) {
    console.log(err)
    res.status(http.INTERNAL_SERVER_ERROR).send(err)
  }
}

module.exports.identify = async (req, res, next) => {
  let input = `${constants.storage.temporary}/${req.file.filename}`
  let sampleSrc = `${constants.storage.faceRecognitionSamples}/${req.body.identification}.json`
  console.log(input)
  try {
    const referencedSample = await facerec.loadSampleFromImage(req.body.identification)
    // const referencedSample = await facerec.loadSample(req.body.identification)
    const recognizedSample = await facerec.takeSample(input)
    // console.log(recognizedSample)
    // console.log(referencedSample)
    const match = await facerec.match(referencedSample, recognizedSample)
    res.status(http.OK).json({ author: match._label, distance: match._distance })
  }
  catch (err) {
    console.log(err)
    res.status(http.INTERNAL_SERVER_ERROR).send(err)
  }
}