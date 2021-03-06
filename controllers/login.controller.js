const http = require("../utils/http-status");
const db = require("../models");
const Account = db.Account;
const employeeController = require("../controllers/employees.controller");

module.exports.getAccountFromEmployeeID = (req, res, next) => {
    Account.findOne({
        attributes: ["id", "username", "password"],
        where: { employee_id: req.params.id }
    })
        .then(result => {
            res.status(http.OK).json(result);
        })
        .catch(err => {
            if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
            next(err);
        })
}

module.exports.doLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    Account.findOne({
        attributes: ["id", "username", "password", "role", "employee_id"],
        include: [{ model: db.Employee, required: true }],
        where: {
            username: username,
            password: password
        }
    })
        .then(async result => {
            if (!result) {
                const authData = {
                    message: "Invalid username or password"
                }
                return res.status(http.UNAUTHORIZED).json(authData);
            }

            db.Re_Employee_Team.findAll({
                where: { employee_id: result.employee_id }
            })
                .then(r => {
                    const data = {
                        message: "Login successfully",
                        employee_id: result.employee_id,
                        team: r.map(t => { return { team_id: t.team_id } }),
                        role: result.role,
                        employee_name: result.Employee.first_name + " " + result.Employee.last_name
                    }

                    res.status(http.ACCEPTED).json(data);
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

module.exports.modifyPassword = (req, res, next) => {
    Account.findOne({
        where: {
            username: req.body.username,
            password: req.body.old_password
        }
    })
        .then(account => {
            account.update({
                password: req.body.new_password
            })
                .then(result => {
                    res.status(http.ACCEPTED).json(result);
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