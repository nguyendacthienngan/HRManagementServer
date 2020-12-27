const db = require("../models");
const sequelize = require("sequelize");
const Team = db.Team;
const http = require("../utils/http-status");

module.exports.getAll = (req, res, next) => {
  Team.findAll()
    .then((results) => {
      res.status(http.OK).json(results);
    })
    .catch((err) => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    });
}

module.exports.createTeam = (req, res, next) => {
  Team.create({
    team_name: req.body.team_name,
    team_type: req.body.team_type,
    manager_id: req.body.manager_id
  })
    .then(jt => {
      res.status(http.CREATED).json(jt);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.updateTeam = (req, res, next) => {
  Team.findOne({
    attributes: ["id"],
    where: { id: req.body.team_id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("Team does not exist!");
      }

      result.update({
        team_name: req.body.team_name,
        team_type: req.body.team_type,
        manager_id: req.body.manager_id
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

module.exports.getTeam = (req, res, next) => {
  Team.findOne({
    where: { id: req.params.id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("Team does not exist!");
      }
      res.status(http.OK).json(result);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.deleteTeam = (req, res, next) => {
  Team.destroy({
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