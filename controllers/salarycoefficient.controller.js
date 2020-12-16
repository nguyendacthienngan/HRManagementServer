const db = require("../models");
const sequelize = require("sequelize");
const SalaryCoef = db.SalaryCoefficient;
const http = require("../utils/http-status");

module.exports.getAll = (req, res, next) => {
  SalaryCoef.findAll({
    attributes: ["id", "job_title_id", "value"]
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

module.exports.createSalaryCoef = (req, res, next) => {
  SalaryCoef.create({
    job_title_id: req.body.job_title_id,
    value: req.body.value
  })
    .then(result => {
      res.status(http.CREATED).json(result);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.updateSalaryCoef = (req, res, next) => {
  SalaryCoef.findOne({
    attributes: ["id"],
    where: { id: req.body.coefficient_id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("SalaryCoef does not exist!");
      }

      result.update({
        job_title_id: req.body.job_title_id,
        value: req.body.value
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

module.exports.getSalaryCoef = (req, res, next) => {
  SalaryCoef.findOne({
    attributes: ["id", "job_title_id", "value"],
    where: { id: req.params.id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("SalaryCoef does not exist!");
      }
      res.status(http.OK).json(result);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.deleteSalaryCoef = (req, res, next) => {
  SalaryCoef.findOne({
    attributes: ["id"],
    where: { id: req.params.id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("SalaryCoef does not exist!");
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