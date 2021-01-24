const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
// Import routes
const faceRecRoute          = require("./routes/facerecognition.route");
const loginRoute            = require("./routes/login.route");
const employeesRoute        = require("./routes/employees.route");
const jobtitlesRoute        = require("./routes/jobtitles.route");
const leaveTypeRoute        = require("./routes/leavetypes.route");
const phoneNumberRoute      = require("./routes/phonenumber.route");
const salaryCoefRoute       = require("./routes/salarycoefficient.route");
const roomRoute             = require("./routes/rooms.route");
const candidateStatusRoute  = require("./routes/candidatestatus.route");
const candidateRoute        = require("./routes/candidate.route");
const eventRoute            = require("./routes/events.route");
const publicEventRoute      = require("./routes/publicevents.route");
const localEventRoute       = require("./routes/localevents.route");
const timeOffRoute          = require("./routes/timeoff.route");
const interviewRoute        = require("./routes/interviews.route");
const candidateInterviewRoute = require("./routes/candidates-interviews.route");
const employeeTeamRoute       = require("./routes/employees-teams.route");
const employeeLocalEventRoute       = require("./routes/employees-localevents.route");
const teamRoute             = require("./routes/teams.route");
const scheduleRoute         = require("./routes/teamsschedule.route");
const calcRoute             = require("./routes/calculator.route");

// Import utils
const { body } = require("express-validator");
const api = require("./utils/api-routes");

const app = express();  
app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true}));

app.use(api.version + api.objects.faceRecognizer, faceRecRoute);

app.use(api.version + api.objects.authentication, loginRoute);
app.use(api.version + api.objects.employee      , employeesRoute);
app.use(api.version + api.objects.jobTitle      , jobtitlesRoute);
app.use(api.version + api.objects.leaveTypes    , leaveTypeRoute);
app.use(api.version + api.objects.phoneNumber   , phoneNumberRoute);
app.use(api.version + api.objects.salaryCoef    , salaryCoefRoute);
app.use(api.version + api.objects.status        , candidateStatusRoute);
app.use(api.version + api.objects.candidate     , candidateRoute);
app.use(api.version + api.objects.rooms         , roomRoute);
app.use(api.version + api.objects.teams         , teamRoute);
app.use(api.version + api.objects.teamSchedule  , scheduleRoute);

app.use(api.version + api.objects.event.general , eventRoute);
app.use(api.version + api.objects.event.public.general, publicEventRoute);
app.use(api.version + api.objects.event.public.interview, interviewRoute);
app.use(api.version + api.objects.event.local.general, localEventRoute);
app.use(api.version + api.objects.event.local.timeOff, timeOffRoute);

app.use(api.version + api.objects.relations.candidates_interviews, candidateInterviewRoute);
app.use(api.version + api.objects.relations.employees_teams, employeeTeamRoute);
app.use(api.version + api.objects.relations.employees_localEvents, employeeLocalEventRoute);

app.use(api.version + api.objects.calculator    , calcRoute);

app.get("/", function(req,res) {
    res.send("Welcome to this api");
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Listening on port 8080")
})
