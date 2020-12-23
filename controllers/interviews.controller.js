const db = require("../models");
const sequelize = require("sequelize");
const Interview = db.Interview;
const http = require("../utils/http-status");
const publicEventController = require("../controllers/publicevents.controller")

module.exports.getAll = (req, res, next) => {
  Interview.findAll({
    include: [
      {
        model: db.Room,
        required: true
      },
      {
        model: db.PublicEvent,
        required: true
      }
    ]
  })
    .then(results => {
      const finalResults = [];
      let index = 0;
      results.forEach(result => {
        publicEventController.extractFromID(result.PublicEvent.id)
          .then(r => {
            finalResults.push({
              id: result.id,
              public_event_id: r.id,
              event_id: r.event_info_id,
              event_name: r.event_name,
              start_date: r.start_date,
              end_date: r.end_date,
              announcement: r.announcement,
              room: {
                id: result.Room.id,
                room_name: result.Room.room_name
              },
            });
            if (index == results.length - 1) {
              res.status(http.OK).json(finalResults);
            }
            else
              index++;
          })
          .catch(err => {
            if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
            next(err);
          })
      });
    })
    .catch((err) => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    });
}

module.exports.createInterview = (req, res, next) => {
  publicEventController.createInternally(req)
    .then(result => {
      Interview.create({
        public_event_id: result.id,
        room_id: req.body.room_id
      })
        .then(r => {
          res.status(http.CREATED).json(r);
        })
        .catch(err => {
          if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
          next(err);
        })
    })
    .catch(err => {
      next(err);
    })
}

module.exports.updateInterview = (req, res, next) => {
  Interview.findOne({
    include: [{ model: db.PublicEvent, required: true }],
    where: { id: req.body.interview_id }
  })
    .then(result => {
      if (!result || !result.PublicEvent) {
        return res.status(http.NOTFOUND).json("Interview does not exist!");
      }

      result.update(
        { room_id: req.body.room_id }
      )
        .then(updatedA => {
          publicEventController.updateInternally({
            body: {
              public_event_id: result.public_event_id,
              event_name: req.body.event_name,
              start_date: req.body.start_date,
              end_date: req.body.end_date,
              // event_status: req.body.event_status,
              announcement: req.body.announcement
            }
          })
            .then(updatedB => {
              res.status(http.OK).json({
                id: updatedA.id,
                public_event_id: updatedB.id,
                event_info_id: updatedB.event_info_id,
                room_id: updatedA.room_id,
                event_name: updatedB.event_name,
                start_date: updatedB.start_date,
                end_date: updatedB.end_date,
                announcement: updatedB.announcement
              })
            })
            .catch(err => {
              next(err);
            })
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

module.exports.getInterview = (req, res, next) => {
  Interview.findOne({
    include: [
      {
        model: db.PublicEvent,
        required: true
      },
      {
        model: db.Room,
        required: true
      }
    ],
    where: { id: req.params.id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("Interview does not exist!");
      }
      publicEventController.extractFromID(result.public_event_id)
        .then(r => {
          res.status(http.OK).json({
            id: result.id,
            public_event_id: result.public_event_id,
            event_info_id: r.event_info_id,
            event_name: r.event_name,
            start_date: r.start_date,
            end_date: r.end_date,
            announcement: r.announcement,
            room: {
              id: result.Room.id,
              room_name: result.Room.room_name
            }
          })
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

module.exports.deleteInterview = (req, res, next) => {
  Interview.findOne({
    where: { id: req.params.id }
  })
    .then(r => {
      if (!r) {
        return res.status(http.NOTFOUND).json("Interview does not exist!");
      }

      publicEventController.deleteInternally(r.public_event_id)
        .then(() => {
          r.destroy({})
            .then(() => {
              res.status(http.OK).json("deleted");
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
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}