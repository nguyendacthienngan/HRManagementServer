const http = require("../utils/http-status");
const db = require("../models");

module.exports.calcPayroll = (req, res, next) => {
    const daysPerWeek = 5;
    const bonus = req.body.bonus;
}