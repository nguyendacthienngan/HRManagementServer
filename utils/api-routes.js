const apiRoutes = 
{
    version:            "/v1",

    objects:
    {
        employee:       "/employees", 
        benefit:        "/benefits",
        candidate:      "/candidates",
        event:          "/events",
        phoneNumber:    "/contacts",
        jobTitle:       "/jobtitles",
        salaryCoef:     "/salaries",
        status:         "/statuses",
        authentication: "/authentication",
        event:          "/events",

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