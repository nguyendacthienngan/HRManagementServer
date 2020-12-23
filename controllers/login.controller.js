const http = require("../utils/http-status");
const db = require("../models");
const Account = db.Account;
const employeeController = require("../controllers/employees.controller")

module.exports.doLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    Account.findOne({
        attributes: ["id", "username", "password", "employee_id"],
        include: [{ model: db.Employee, required: true }],
        where: {
            username: username,
            password: password
        }
    })
        .then(result => {
            if (!result) {
                const authData = {
                    message: "Invalid username or password"
                }
                return res.status(http.UNAUTHORIZED).json(authData);
            }

            const data = {
                message: "Login successfully",
                employee_id: result.employee_id,
                employee_name: result.Employee.first_name + " " + result.Employee.last_name
            }

            res.status(http.ACCEPTED).json(data);
        })
        .catch(err => {
            if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
            next(err);
        })
}