

module.exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    res.send('POST request to the homepage');
}