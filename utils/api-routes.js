const apiRoutes = 
{
    objects:
    {
        employee:       "/employees",
        candidate:      "/candidates",
        event:          "/events",
        phoneNumber:    "/contacts",
        jobTitle:       "/jobtitles",

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