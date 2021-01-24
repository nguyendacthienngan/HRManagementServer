const db = require("../models");
const { QueryTypes } = require('sequelize');
const TimeOff = db.TimeOff;
const http = require("../utils/http-status");
const localEventController = require("./localevents.controller")
const details = require("./employees-localevents.controller");
const { sequelize } = require("../models");

module.exports.getEmployeeTimeoff = (req, res, next) => {
  let query = `SELECT TF.leave_type, TF.day_off, EV.event_status, EV.announcement, EV.start_date, EV.end_date FROM	"Re_Employee_LocalEvents" as REL, "LocalEvents" as LE, "TimeOffs" as TF, "Events" as EV WHERE 	REL.employee_id=? AND REL.local_event_id=LE.id AND LE.id=TF.local_event_id AND LE.event_info_id=EV.id`
  sequelize.query(query,
    { replacements: [req.params.id], type: sequelize.QueryTypes.SELECT })
    .then(results => {
      // console.log(results)
      res.status(http.OK).json(results)
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR
      next(err)
    })
}

module.exports.getTeamTimeoff = (req, res, next) => {
  let query = `SELECT MLE.team_name, MLE.first_name, MLE.last_name, MLE.title_name,
  MLE.event_name, MLE.start_date, MLE.end_date, MLE.event_status, MLE.announcement,
  MLE.leave_type, MLE.day_off
FROM 
(SELECT *
  FROM 
  (SELECT RET.employee_id, TM.team_name, EM.first_name, EM.last_name, JT.title_name
    FROM "Re_Employee_Teams" AS RET, 
  "Employees" AS EM,
  "Teams" AS TM,
  "JobTitles" AS JT
    WHERE RET.employee_id=EM.id AND RET.team_id=TM.id AND
  EM.job_title_id=JT.id AND
  TM.id=?) AS TEAM_MEM, 
 "Re_Employee_LocalEvents" AS REL,
 "LocalEvents" AS LE,
 "Events" AS EV,
 "TimeOffs" AS TF
 WHERE TEAM_MEM.employee_id=REL.employee_id AND
 REL.local_event_id=LE.id AND
 LE.event_info_id=EV.id AND
 TF.local_event_id=REL.local_event_id) AS MLE`
 sequelize.query(query,
  { replacements: [req.params.id], type: sequelize.QueryTypes.SELECT })
  .then(results => {
    // console.log(results)
    res.status(http.OK).json(results)
  })
  .catch(err => {
    if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR
    next(err)
  }) 
}

module.exports.getAll = (req, res, next) => {
  TimeOff.findAll({
    include: [
      {
        model: db.LeaveType,
        required: true
      },
      {
        model: db.LocalEvent,
        required: true
      }
    ]
  })
    .then(results => {
      console.log(results);
      const finalResults = [];
      let index = 0;
      results.forEach(result => {
        localEventController.extractFromID(result.LocalEvent.id)
          .then(r => {
            finalResults.push({
              id: result.id,
              local_event_id: r.id,
              event_id: r.event_info_id,
              event_name: r.event_name,
              event_status: r.event_status,
              start_date: r.start_date,
              end_date: r.end_date,
              announcement: r.announcement,
              day_off: result.day_off,
              leave_type: {
                id: result.LeaveType.id,
                name: result.LeaveType.leave_type_name
              }
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

module.exports.createTimeOff = (req, res, next) => {
  localEventController.createInternally(req)
    .then(result => {
      TimeOff.create({
        local_event_id: result.id,
        leave_type: req.body.leave_type_id,
        day_off: req.body.day_off,
      })
        .then(r => {
          let detailReq = {
            body: [{
              employee_id: req.body.employee_id,
              local_event_id: r.local_event_id
            }]
          }
          details.assignRelationsInternally(detailReq)
            .then(r2 => {
              res.status(http.CREATED).json(r2);
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
      next(err);
    })
}

module.exports.updateTimeOff = (req, res, next) => {
  TimeOff.findOne({
    include: [{ model: db.LocalEvent, required: true }],
    where: { id: req.body.timeoff_id }
  })
    .then(result => {
      if (!result || !result.LocalEvent) {
        return res.status(http.NOTFOUND).json("TimeOff does not exist!");
      }

      result.update(
        { day_off: req.body.day_off, leave_type: req.body.leave_type_id }
      )
        .then(updatedA => {
          localEventController.updateInternally({
            body: {
              local_event_id: result.local_event_id,
              event_name: req.body.event_name,
              start_date: req.body.start_date,
              end_date: req.body.end_date,
              event_status: req.body.event_status,
              announcement: req.body.announcement
            }
          })
            .then(updatedB => {
              res.status(http.OK).json({
                id: updatedA.id,
                local_event_id: updatedB.id,
                event_info_id: updatedB.event_info_id,
                event_name: updatedB.event_name,
                start_date: updatedB.start_date,
                end_date: updatedB.end_date,
                announcement: updatedB.announcement,
                day_off: updatedA.day_off,
                leave_type: updatedA.leave_type
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

module.exports.getFromID = id => {
  return new Promise((resolve, reject) => {
    TimeOff.findOne({
      include: [
        {
          model: db.LeaveType,
          required: true
        },
        {
          model: db.LocalEvent,
          required: true
        }
      ],
      where: { id: req.params.id }
    })
      .then(result => {
        if (!result) {
          reject({
            status: "404 NOT FOUND",
            statusCode: http.NOTFOUND
          });
        }
        localEventController.extractFromID(result.local_event_id)
          .then(r => {
            resolve({
              id: result.id,
              local_event_id: result.local_event_id,
              event_info_id: r.event_info_id,
              event_name: r.event_name,
              event_status: r.event_status,
              start_date: r.start_date,
              end_date: r.end_date,
              announcement: r.announcement,
              day_off: result.day_off,
              leave_type: {
                id: result.LeaveType.id,
                name: result.LeaveType.leave_type_name
              }
            })
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

module.exports.getTimeOff = (req, res, next) => {
  this.getFromID(req.params.id)
    .then(result => {
      res.status(http.OK).json(result);
    })
    .catch(err => {
      next(err);
    })
}

module.exports.deleteTimeOff = (req, res, next) => {
  TimeOff.findOne({
    where: { id: req.params.id }
  })
    .then(r => {
      if (!r) {
        return res.status(http.NOTFOUND).json("TimeOff does not exist!");
      }

      localEventController.deleteInternally(r.local_event_id)
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