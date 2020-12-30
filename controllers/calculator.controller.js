const http = require("../utils/http-status");
const db = require("../models");

module.exports.calcPayroll = (req, res, next) => {
    const bonus = req.body.bonus;
    db.IntegerParameter.findOne({
        param_name: "days_per_week"
    })
    .then(daysPerWeek => {
        db.Employee.findOne({
            where: { id: req.body.employee_id },
            include: [
                {
                    model: db.SalaryCoefficient,
                    require: true
                },
            ]
        })
        .then (employee => {
            const coefficient = employee.SalaryCoefficient.value;
            db.IntegerParameter.findOne({
                param_name: "basic_pay"
            })
            .then (basicPay => {
                // const pay = (4 * daysPerWeek.param_value - )
            })
        })
    })
}