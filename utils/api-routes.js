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
        managers:       "/managers",
        authentication: "/authentication",
        
        event:
        {
            general:            "/events",
            local:
            {
                general:        "/events/local",
                timeOff:        "/events/local/time-off",
                meeting:        "/events/local/meetings"
            },
            
            public: 
            {
                general:        "/events/public",
                interview:      "/events/public/interviews"
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
        }
    },

    actions:
    {
        login:          "/login",

        create:         "/add",
        search:         "/search",
        update:         "/update",
        delete:         "/delete"
    }
}

module.exports = apiRoutes;