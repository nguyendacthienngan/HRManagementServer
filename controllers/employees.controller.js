const db = require("../models");
const sequelize = require("sequelize");
const User = db.Employee;

module.exports.getAllUsers = (req, res, next) => {
    User.findAll(
      {
        attributes: ["employee_id", "manager_id", "first_name", "last_name", "national_id"],
      }
    )
        .then((users) => {
          res.status(200).json(users);
        })
        .catch((err) => {
          if (!err.status) err.statusCode = 500;
          next(err);
        });
}