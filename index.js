const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
// Import routes
const loginRoute = require("./routes/login.route");
const employeesRoute = require("./routes/employees.route");
const jobtitlesRoute = require("./routes/jobtitles.route");

// Import utils
const { body } = require("express-validator");
const api = require("./utils/api-routes");

const app = express();  
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use("/login", loginRoute);
app.use(api.objects.employee, employeesRoute);
app.use(api.objects.jobTitle, jobtitlesRoute);

app.get("/", function(req,res) {
    res.send("Welcome to this api");
});

app.listen(process.env.PORT || 8000, () => {
    console.log("Listening on port 8000")
})
