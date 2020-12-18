const db = require("../models");
const sequelize = require("sequelize");
const Status = db.CandidateStatus;
const http = require("../utils/http-status");

module.exports.getAll = (req, res, next) => {
  Status.findAll({
    attributes: ["id", "status_name"]
  }
  )
    .then(result => {
      res.status(http.OK).json(result);
    })
    .catch((err) => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    });
}

module.exports.createStatus = (req, res, next) => {
  Status.create({
    status_name: req.body.status_name
  })
    .then(result => {
      res.status(http.CREATED).json(result);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.updateStatus = (req, res, next) => {
  Status.findOne({
    attributes: ["id"],
    where: { id: req.body.status_id}
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("Status does not exist!");
      }

      result.update({
        status_name: req.body.status_name
      })
        .then(result => {
          res.status(http.OK).json(result);
        })
        .catch(err => {
          if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
          next(err);
        })
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.getStatus = (req, res, next) => {
  Status.findOne({
    attributes: ["id", "status_name"],
    where: { id: req.params.id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("Status does not exist!");
      }
      res.status(http.OK).json(result);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.deleteStatus = (req, res, next) => {
  Status.findOne({
    attributes: ["id"],
    where: { id: req.params.id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("Status does not exist!");
      }

      result.destroy()
        .then(deletedJt => {
          res.status(http.OK).json(deletedJt);
        })
        .catch(err => {
          if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
          next(err);
        })
    })
}