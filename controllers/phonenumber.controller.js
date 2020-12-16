const db = require("../models");
const sequelize = require("sequelize");
const Phone = db.PhoneNumber;
const http = require("../utils/http-status");

module.exports.getAll = (req, res, next) => {
  Phone.findAll({
    attributes: ["id", "emergency_call", "personal_call"]
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

module.exports.createPhone = (req, res, next) => {
  Phone.create({
    emergency_call: req.body.emergency_call,
    personal_call: req.body.personal_call
  })
    .then(result => {
      res.status(http.CREATED).json(result);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.updatePhone = (req, res, next) => {
  Phone.findOne({
    attributes: ["id"],
    where: { id: req.body.phone_id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("Phone number does not exist!");
      }

      result.update({
        emergency_call: req.body.emergency_call,
        personal_call: req.body.personal_call
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

module.exports.getPhone = (req, res, next) => {
  Phone.findOne({
    attributes: ["id", "emergency_call", "personal_call"],
    where: { id: req.params.id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("Phone number does not exist!");
      }
      res.status(http.OK).json(result);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.deletePhone = (req, res, next) => {
  Phone.findOne({
    attributes: ["id"],
    where: { id: req.params.id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("Phone number does not exist!");
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