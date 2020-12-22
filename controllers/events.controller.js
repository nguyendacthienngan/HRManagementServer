const db = require("../models");
const sequelize = require("sequelize");
const Event = db.Event;
const http = require("../utils/http-status");

module.exports.getAll = (req, res, next) => {
  Event.findAll({
    attributes: ["id", "event_name", "start_date", "end_date"]
  })
    .then((result) => {
      res.status(http.OK).json(result);
    })
    .catch((err) => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    });
}

module.exports.createEvent = (req, res, next) => {
  this.createInternally(req)
    .then(result => {
      res.status(http.OK).json(result);
    })
    .catch(error => {
      next(error);
    });
}

module.exports.createInternally = req => {
  return new Promise((resolve, reject) => {
    Event.create({
      event_name: req.body.event_name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      // event_status: req.body.event_status,
      announcement: req.body.announcement
    })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
        reject(err);
      })
  });
}

module.exports.updateInternally = req => {
  return new Promise((resolve, reject) => {
    Event.findOne({
      attributes: ["id"],
      where: { id: req.body.event_id }
    })
      .then(result => {
        if (!result) {
          let err = {
            message: "Event does not exist!",
            status: "404 Not Found",
            statusCode: http.NOTFOUND
          }
          return reject(err);
        }

        result.update({
          event_name: req.body.event_name,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          // event_status: req.body.event_status,
          announcement: req.body.announcement
        })
          .then(updated => {
            // res.status(http.OK).json(updated);
            resolve(updated);
          })
          .catch(err => {
            if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
            // next(err);
            reject(err);
          })
      })
      .catch(err => {
        if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
        // next(err);
        reject(err);
      })
  });
}

module.exports.updateEvent = (req, res, next) => {
  this.updateInternally(req)
    .then(result => {
      res.status(http.OK).json(result);
    })
    .catch(err => {
      next(err);
    });
}


module.exports.getEvent = (req, res, next) => {
  Event.findOne({
    attributes: ["id", "event_name", "start_date", "end_date", "announcement"],
    where: { id: req.params.id }
  })
    .then(jt => {
      if (!jt) {
        return res.status(http.NOTFOUND).json("Event does not exist!");
      }
      res.status(http.OK).json(jt);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.deleteEvent = (req, res, next) => {
  Event.destroy({
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