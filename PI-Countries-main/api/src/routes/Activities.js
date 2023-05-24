const { Router } = require ("express");
const { postActivity, getActivities, deleteActivity } = require("../handlers/Activities")

const activitiesRoutes = Router();

activitiesRoutes.post("/", postActivity);
activitiesRoutes.get("/", getActivities);

//............Extra Credits..............

activitiesRoutes.delete("/", deleteActivity)


module.exports = activitiesRoutes;