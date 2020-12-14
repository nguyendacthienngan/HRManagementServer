const db = require("../models");
const sequelize = require("sequelize");
const JobTitle = db.JobTitle;
const http = require("../utils/http-status");

module.exports.getAll = (req, res, next) => {
  JobTitle.findAll(
    {
      attributes: ["title_id", "title_name"]
    }
  )
    .then((titles) => {
      res.status(http.OK).json(titles);
    })
    .catch((err) => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    });
}

module.exports.createJobTitle = (req, res, next) => {
  JobTitle.create({
    title_name: req.body.title_name
  })
    .then(jt => {
      res.status(http.CREATED).json(jt);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.updateJobTitle = (req, res, next) => {
  JobTitle.update(
    { title_name: req.body.title_name },
    { where: { title_id: req.body.title_id } }
  )
    .then(updatedJt => {
      if (!updatedJt) {
        return res.status(http.NOTFOUND).json("Title does not exist!");
      }
      res.status(http.OK).json(updatedJt);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.getJobTitle = (req, res, next) => {
  JobTitle.findOne({
    attributes: ["title_id", "title_name"],
    where: { title_id: req.params.id }
  })
    .then(jt => {
      res.status(http.OK).json(jt);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.deleteJobTitle = (req, res, next) => {
  JobTitle.destroy({
    where: { title_id: req.body.title_id }
  })
    .then(deletedJt => {
      res.status(http.OK).json(deletedJt);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}