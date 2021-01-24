const db = require("../models");
const sequelize = require("sequelize");
const details = db.Re_Employee_LocalEvent;
const http = require("../utils/http-status");

module.exports.getEmployeeLocalEvents = (req) => {
  return new Promise((resolve, reject) => {
    details.findAll({
      where: { employee_id: req.body.employee_id },
    })
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR
        reject(err)
      })
  })
}

module.exports.getAll = (req, res, next) => {
  details.findAll({
    attributes: ["employee_id", "local_event_id"],
    include: [
      {
        model: db.Employee,
        required: true
      },
      {
        model: db.LocalEvent,
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

module.exports.assignRelationsInternally = (req) => {
  let results = [];
  return new Promise((resolve, reject) => {
    req.body.forEach(relation => {
      const employee_id = relation.employee_id;
      const local_event_id = relation.local_event_id;

      details.findOne({
        where: {
          employee_id: employee_id,
          local_event_id: local_event_id
        }
      })
        .then(result => {
          if (!result) {
            details.create({
              employee_id: employee_id,
              local_event_id: local_event_id
            })
              .then(result => {
                results.push(result);
                if (results.length == req.body.length) {
                  resolve(results)
                }
              })
              .catch(err => {
                if (!err.status) err.statusCode = http.NOTFOUND;
                reject(err);
              })
          }
        })
        .catch(err => {
          if (!err.status) err.statusCode = http.NOTFOUND;
          reject(err);
        })
    });
  })
}

module.exports.assignRelations = (req, res, next) => {
  this.assignRelationsInternally(req)
    .then(results => {
      res.status(http.OK).json(results);
    })
    .catch(err => {
      next(err);
    })
}
