const db = require("../models");
const sequelize = require("sequelize");
const Room = db.Room;
const http = require("../utils/http-status");

module.exports.getAll = (req, res, next) => {
  Room.findAll(
    {
      attributes: ["id", "room_name"]
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

module.exports.createRoom = (req, res, next) => {
  Room.create({
    room_name: req.body.room_name
  })
    .then(jt => {
      res.status(http.CREATED).json(jt);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.updateRoom = (req, res, next) => {
  Room.findOne({
    attributes: ["id"],
    where: { id: req.body.room_id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("Room does not exist!");
      }

      result.update(
        { room_name: req.body.room_name }
      )
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

module.exports.getRoom = (req, res, next) => {
  Room.findOne({
    where: { id: req.params.id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("Room does not exist!");
      }
      res.status(http.OK).json(result);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.deleteRoom = (req, res, next) => {
  Room.destroy({
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