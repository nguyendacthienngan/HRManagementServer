const express = require("express");
const bodyParser = require("body-parser");
const loginRoute = require("./routes/login.route");
const employeesRoute = require("./routes/employees.route");
const { body } = require("express-validator");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use("/login", loginRoute);
app.use("/employees", employeesRoute);
app.get("/", function(req,res) {
    res.send("Welcome to this api");
});

app.listen(process.env.PORT || 8000, () => {
    console.log("Listening on port 8000")
})
