const { Router } = require ("express");
const { postActivity, getActivities } = require("../handlers/Activities")

const activitiesRoutes = Router();

 activitiesRoutes.post("/", postActivity);
activitiesRoutes.get("/", getActivities);



module.exports = activitiesRoutes;