const db = require("../models");
const sequelize = require("sequelize");
const Schedule = db.TeamSchedule;
const http = require("../utils/http-status");

module.exports.getAll = (req, res, next) => {
  Schedule.findAll()
    .then((results) => {
      res.status(http.OK).json(results);
    })
    .catch((err) => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    });
}

module.exports.createSchedule = (req, res, next) => {
  Schedule.create({
    team_id: req.body.team_id,
    position: req.body.job_title_id,
    date: req.body.date
  })
    .then(result => {
      res.status(http.CREATED).json(result);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.updateSchedule = (req, res, next) => {
  Schedule.findOne({
    attributes: ["id"],
    where: { id: req.body.schedule_id}
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("Schedule does not exist!");
      }

      result.update({
        team_id: req.body.team_id,
        position: req.body.job_title_id,
        date: req.body.date
      })
        .then(updated => {
          res.status(http.OK).json(updated);
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

module.exports.getSchedule = (req, res, next) => {
  Schedule.findOne({
    where: { id: req.params.id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("Schedule does not exist!");
      }
      res.status(http.OK).json(result);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.deleteSchedule = (req, res, next) => {
  Schedule.destroy({
    where: { id: req.params.id }
  })
    .then(deleted => {
      res.status(http.OK).json(deleted);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}