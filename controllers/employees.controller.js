const db = require("../models");
const sequelize = require("sequelize");
const User = db.Employee;
const http = require("../utils/http-status");

module.exports.getAllUsers = (req, res, next) => {
    User.findAll(
      {
        attributes: ["employee_id", "manager_id", "first_name", "last_name", "national_id"],
      }
    )
        .then((users) => {
          res.status(http.OK).json(users);
        })
        .catch((err) => {
          if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
          next(err);
        });
}