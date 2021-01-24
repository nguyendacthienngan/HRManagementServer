const db = require("../models");
const sequelize = require("sequelize");
const LeaveType = db.LeaveType;
const http = require("../utils/http-status");

module.exports.getAll = (req, res, next) => {
  LeaveType.findAll(
    {
      attributes: ["id", "leave_type_name"]
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

module.exports.createLeaveType = (req, res, next) => {
  LeaveType.create({
    title_name: req.body.leave_type_name
  })
    .then(jt => {
      res.status(http.CREATED).json(jt);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.updateLeaveType = (req, res, next) => {
  LeaveType.findOne({
    attributes: ["id"],
    where: { id: req.body.title_id }
  })
    .then(jt => {
      if (!jt) {
        return res.status(http.NOTFOUND).json("Title does not exist!");
      }

      jt.update(
        { title_name: req.body.leave_type_name }
      )
        .then(updatedJt => {
          res.status(http.OK).json(updatedJt);
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

module.exports.getLeaveType = (req, res, next) => {
  LeaveType.findOne({
    attributes: ["id", "leave_type_name"],
    where: { id: req.params.id }
  })
    .then(jt => {
      if (!jt) {
        return res.status(http.NOTFOUND).json("Leave type does not exist!");
      }
      res.status(http.OK).json(jt);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.deleteLeaveType = (req, res, next) => {
  LeaveType.destroy({
    where: { id: req.params.id }
  })
    .then(deletedJt => {
      res.status(http.OK).json(deletedJt);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}