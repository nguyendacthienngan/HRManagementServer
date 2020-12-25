const db = require("../models");
const sequelize = require("sequelize");
const details = db.Re_Interview_Candidate;
const http = require("../utils/http-status");

module.exports.getAll = (req, res, next) => {
  details.findAll({
    attributes: ["candidate_id", "interview_id"],
    include: [
      {
        model: db.Interview,
        required: true
      },
      {
        model: db.Candidate,
        required: true
      }
    ]
  })
    .then(results => {
      res.status(http.OK).json(results);
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