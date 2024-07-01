const { getAllOpportunityData, appliedJob } = require("../controller/user.conroller");

const userRoutes = require("express").Router();


userRoutes.get("/opportunities", getAllOpportunityData);
userRoutes.patch("/apply-job/:currentUser", appliedJob);


module.exports = { userRoutes }