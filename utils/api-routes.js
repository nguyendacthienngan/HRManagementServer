const apiRoutes = 
{
    version:            "/v1",

    objects:
    {
        employee:       "/employees",
        candidate:      "/candidates",
        event:          "/events",
        phoneNumber:    "/contacts",
        jobTitle:       "/jobtitles",
        salaryCoef:     "/salaries",
        status:         "/statuses"
    },

    actions:
    {
        create:         "/add",
        search:         "/search",
        update:         "/update",
        delete:         "/delete"
    }
}

module.exports = apiRoutes;