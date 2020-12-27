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
      const finalResults = results.map(result => {
        let candidate = result.Candidate;
        let interview = result.Interview;

        return Object.assign({}, {
          candidate_id: result.candidate_id,
          interview_id: result.interview_id,
          candidate: candidate,
          interview: interview
        })
      })
      res.status(http.OK).json(finalResults);
    })
    .catch((err) => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    });
}

module.exports.assignRelations = (req, res, next) => {
  let results = [];
  req.body.forEach(relation => {
    const candidate_id = relation.candidate_id;
    const interview_id = relation.interview_id;

    details.findOne({
      where: {
        candidate_id: candidate_id,
        interview_id: interview_id
      }
    })
      .then(result => {
        if (!result) {
          details.create({
            candidate_id: candidate_id,
            interview_id: interview_id
          })
            .then(result => {
              results.push(result);
              if (results.length == req.body.length) {
                res.status(http.OK).json(results);
              }
            })
            .catch(err => {
              if (!err.status) err.statusCode = http.NOTFOUND;
              next(err);
            })
        }
      })
      .catch(err => {
        if (!err.status) err.statusCode = http.NOTFOUND;
        next(err);
      })
  });
}

module.exports.updateRelations = (req, res, next) => {
  let results = [];
  let count = 0;

  req.body.forEach(relation => {
    const old_candidate_id = relation.old.candidate_id;
    const old_interview_id = relation.old.interview_id;

    const new_candidate_id = relation.new.candidate_id;
    const new_interview_id = relation.new.interview_id;

    console.log(new_candidate_id + "|" + new_interview_id);

    details.findOne({
      where: {
        candidate_id: old_candidate_id,
        interview_id: old_interview_id
      }
    })
      .then(result => {
        if (result) {
          result.update({
            candidate_id: new_candidate_id,
            interview_id: new_interview_id
          })
            .then(updated => {
              console.log(updated);
              results.push(updated);
              if (results.length === count) {
                res.status(http.OK).json(results);
              }
            })
            .catch(err => {
              if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
              next(err);
            })
        }
        count++;
      })
      .catch(err => {
        if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
        next(err);
      })
  });
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