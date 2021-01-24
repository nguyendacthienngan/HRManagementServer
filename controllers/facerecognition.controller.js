const constants = require('../utils/constants')
const uploader = require('../utils/uploader')
const http = require('../utils/http-status')
const facerec = require('../utils/face-recognizer')

module.exports.takeSample = (req, res) => {
  let diskStorage = uploader.diskStorage(
    ["image/jpeg", "image/png"],
    constants.storage.temporary
  )

  uploader.uploadSingleFileTask(diskStorage, "file")(req, res, async next => {
    if (next) res.status(http.INTERNAL_SERVER_ERROR).send(next)
    console.log(diskStorage)
    let input = `${constants.storage.temporary}/${req.file.filename}`
    console.log(input)
    try {
      const referencedSample = await facerec.takeSample(input)
      await facerec.storeSample(req.body.identification, referencedSample)
      res.status(http.OK).json(referencedSample)
    }
    catch (err) {
      res.status(http.INTERNAL_SERVER_ERROR).send(err)
    }
  })
}

module.exports.identify = (req, res, next) => {

}