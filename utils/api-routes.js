const apiRoutes = 
{
    version:            "/v1",

    objects:
    {
        employee:       "/employees", 
        benefit:        "/benefits",
        candidate:      "/candidates",
        phoneNumber:    "/contacts",
        jobTitle:       "/jobtitles",
        salaryCoef:     "/salaries",
        status:         "/statuses",
        teams:          "/teams",
        teamSchedule:   "/schedules",
        managers:       "/managers",
        authentication: "/authentication",
        
        event:
        {
            general:            "/events",
            local:
            {
                general:        "/local-events",
                timeOff:        "/local-events-timeoff",
                meeting:        "/local-events-meetings"
            },
            
            public: 
            {
                general:        "/public-events",
                interview:      "/public-events-interviews"
            }
        },
        
        rooms:          "/rooms",
        leaveTypes:     "/leave-types",

        relations:
        {
            employees_benefits:     "/employees-benefits",
            employees_teams:        "/employees-teams",
            employees_localEvents:  "/employees-localevents",
            employees_interviews:   "/employees-interviews",
            candidates_interviews:  "/candidates-interviews"
        },

        calculator:     "/calculators",
        faceRecognizer: "/recognizer"
    },

    actions:
    {
        login:          "/login",

        create:         "/add",
        search:         "/search",
        update:         "/update",
        delete:         "/delete",

        confirm:        "/confirm",

        calculator: 
        {
            payroll: "/payroll"
        },

        faceRecognizer:
        {
            sample: "/sample",
            identify: "/identify"
        }
    }
}

module.exports = apiRoutes;