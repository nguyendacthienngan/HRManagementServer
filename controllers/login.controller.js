const http = require("../utils/http-status");

module.exports.doLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    res.send(username);
    console.log(password);
}