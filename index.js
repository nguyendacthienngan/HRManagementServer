const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
// Import routes
const loginRoute = require("./routes/login.route");
const employeesRoute = require("./routes/employees.route");
const jobtitlesRoute = require("./routes/jobtitles.route");
const phoneNumberRoute = require("./routes/phonenumber.route");
const salaryCoefRoute = require("./routes/salarycoefficient.route");
const candidateStatusRoute = require("./routes/candidatestatus.route");
const candidateRoute = require("./routes/candidate.route");
const eventRoute = require("./routes/events.route");

// Import utils
const { body } = require("express-validator");
const api = require("./utils/api-routes");

const app = express();  
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(api.version + api.objects.authentication, loginRoute);
app.use(api.version + api.objects.employee      , employeesRoute);
app.use(api.version + api.objects.jobTitle      , jobtitlesRoute);
app.use(api.version + api.objects.phoneNumber   , phoneNumberRoute);
app.use(api.version + api.objects.salaryCoef    , salaryCoefRoute);
app.use(api.version + api.objects.status        , candidateStatusRoute);
app.use(api.version + api.objects.candidate     , candidateRoute);

app.use(api.version + api.objects.event.general , eventRoute);

app.get("/", function(req,res) {
    res.send("Welcome to this api");
});

app.listen(process.env.PORT || 8000, () => {
    console.log("Listening on port 8000")
})
