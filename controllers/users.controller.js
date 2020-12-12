const db = require("../models");
const sequelize = require("sequelize");
const User = db.User;
const Account = db.Account;

module.exports.getAllUsers = (req, res, next) => {
    User.findAll()
        .then((users) => {
          res.status(200).json(users);
        })
        .catch((err) => {
          if (!err.status) err.statusCode = 500;
          next(err);
        });
}