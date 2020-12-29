const db = require("../models");
const sequelize = require("sequelize");
const Event = db.Event;
const PublicEvent = db.PublicEvent;
const http = require("../utils/http-status");
const eventController = require("../controllers/events.controller");

module.exports.getAll = (req, res, next) => {
  PublicEvent.findAll({
    include: [{
      model: Event,
      required: true
    }]
  })
    .then(results => {
      const resultObject = results.map(result => {
        return Object.assign({}, {
          id: result.id,
          event_info_id: result.event_info_id,
          event_name: result.Event.event_name,
          start_date: result.Event.start_date,
          end_date: result.Event.end_date,
          event_status: result.Event.event_status,
          announcement: result.Event.announcement
        })
      });
      res.status(http.OK).json(resultObject);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.createInternally = req => {
  return new Promise((resolve, reject) => {
    eventController.createInternally(req)
      .then(result => {
        PublicEvent.create({
          event_info_id: result.id
        })
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject(err);
          })
      })
      .catch(err => {
        if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
        reject(err);
      });
  });
}

module.exports.createPublicEvent = (req, res, next) => {
  this.createInternally(req)
    .then(result => {
      res.status(http.CREATED).json(result);
    })
    .catch(err => {
      next(err);
    });
}

module.exports.updateInternally = req => {
  return new Promise((resolve, reject) => {
    PublicEvent.findOne({
      include: [{ model: Event, required: true }],
      where: { id: req.body.public_event_id }
    })
      .then(result => {
        console.log(result);
        if (!result || !result.Event) {
          let err = {
            message: "Event does not exist!",
            status: "404 Not Found",
            statusCode: http.NOTFOUND
          }
          return reject(err);
        }

        result.Event.update({
          event_name: req.body.event_name,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          event_status: req.body.event_status,
          announcement: req.body.announcement
        })
          .then(finalResult => {
            resolve(finalResult);
          })
          .catch(err => {
            reject(err);
          })
      })
      .catch(err => {
        reject(err);
      })
  });
}

module.exports.updatePublicEvent = (req, res, next) => {
  this.updateInternally(req)
    .then(result => {
      res.status(http.OK).json(result);
    })
    .catch(err => {
      next(err);
    })
}

module.exports.extractFromID = id => {
  return new Promise((resolve, reject) => {
    PublicEvent.findOne({
      include: [{ model: Event, required: true }],
      where: { id: id }
    })
      .then(result => {
        if (!result) {
          let err = {
            status: "404 NOT FOUND",
            statusCode: http.NOTFOUND
          }
          return reject(err);
        }
        const finalResult = Object.assign({}, {
          id: result.id,
          event_info_id: result.event_info_id,
          event_name: result.Event.event_name,
          start_date: result.Event.start_date,
          end_date: result.Event.end_date,
          event_status: result.Event.event_status,
          announcement: result.Event.announcement
        })
        resolve(finalResult);
      })
      .catch(err => {
        if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
        next(err);
      })
  });
}

module.exports.getPublicEvent = (req, res, next) => {
  PublicEvent.findOne({
    include: [{ model: Event, required: true }],
    where: { id: req.params.id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("PublicEvent does not exist!");
      }
      const finalResult = Object.assign({}, {
        id: result.id,
        event_info_id: result.event_info_id,
        event_name: result.Event.event_name,
        start_date: result.Event.start_date,
        end_date: result.Event.end_date,
        event_status: result.Event.event_status,
        announcement: result.Event.announcement
      })
      res.status(http.OK).json(finalResult);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.deleteInternally = id => {
  return new Promise((resolve, reject) => {
    PublicEvent.findOne({
      where: { id: id }
    })
      .then(result => {
        console.log(result);
        if (!result) {
          let err = {
            status: "404 NOT FOUND",
            statusCode: http.NOTFOUND
          }
          return reject(err);
        }
        Event.destroy({
          where: { id: result.event_info_id }
        })
          .then(e => {
            result.destroy({})
              .then(p => { resolve() })
              .catch(err => { reject(err); })
          })
          .catch(err => {
            if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
            reject(err);
          })
      })
      .catch(err => {
        if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
        reject(err);
      })
  })
}

module.exports.deletePublicEvent = (req, res, next) => {
  PublicEvent.findOne({
    where: { id: req.params.id }
  })
    .then(result => {
      console.log(result);
      if (!result) return res.status(http.NOTFOUND).json("Event does not exist!");
      Event.destroy({
        where: { id: result.event_info_id }
      })
        .then(e => {
          result.destroy({})
            .then(p => { res.status(http.OK).json(p); })
            .catch(err => { next(err); })
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