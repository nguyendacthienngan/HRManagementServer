const express = require("express");
const bodyParser = require("body-parser");
const loginRoute = require("./routes/login.route");
const { body } = require("express-validator");

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use("/login", loginRoute);
app.get("/", function(req,res) {
    res.send("Welcome to this api");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})