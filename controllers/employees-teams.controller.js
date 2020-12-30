const db = require("../models");
const sequelize = require("sequelize");
const details = db.Re_Employee_Team;
const http = require("../utils/http-status");

module.exports.getAll = (req, res, next) => {
  details.findAll({
    attributes: ["employee_id", "team_id"],
    include: [
      {
        model: db.Employee,
        required: true
      },
      {
        model: db.Team,
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

module.exports.assignRelations = (req, res, next) => {
  let results = [];
  req.body.forEach(relation => {
    const employee_id = relation.employee_id;
    const team_id = relation.team_id;

    details.findOne({
      where: {
        employee_id: employee_id,
        team_id: team_id
      }
    })
      .then(result => {
        if (!result) {
          details.create({
            employee_id: employee_id,
            team_id: team_id
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

// module.exports.updateRelations = (req, res, next) => {
//   let results = [];
//   let count = 0;

//   req.body.forEach(relation => {
//     const old_candidate_id = relation.old.candidate_id;
//     const old_interview_id = relation.old.interview_id;

//     const new_candidate_id = relation.new.candidate_id;
//     const new_interview_id = relation.new.interview_id;

//     console.log(new_candidate_id + "|" + new_interview_id);

//     details.findOne({
//       where: {
//         candidate_id: old_candidate_id,
//         interview_id: old_interview_id
//       }
//     })
//       .then(result => {
//         if (result) {
//           result.update({
//             candidate_id: new_candidate_id,
//             interview_id: new_interview_id
//           })
//             .then(updated => {
//               console.log(updated);
//               results.push(updated);
//               if (results.length === count) {
//                 res.status(http.OK).json(results);
//               }
//             })
//             .catch(err => {
//               if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
//               next(err);
//             })
//         }
//         count++;
//       })
//       .catch(err => {
//         if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
//         next(err);
//       })
//   });
// }
