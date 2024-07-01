const { opportunityCollection } = require("../model/opportunity.model");
const { userCollection } = require("../model/user.model");

const getAllOpportunityData = async (request, response) => {
    try {
        const opportunityData = await opportunityCollection.find({});
        response.status(200).send({
            success: true,
            msg: "Opportunity data loaded successfully",
            opportunityData: opportunityData
        })

    } catch (error) {
        response.status(500).send({
            success: false,
            msg: `Server failed to load data : ${error.message}`
        })
    }
}
const appliedJob = async (request, response) => {
    try {
        const { jobID } = request.body;
        const { currentUser } = request.params;
        const updatedUser = await userCollection.findOneAndUpdate({ userEmail: currentUser }, { $addToSet: { appliedJob: jobID } });
        if (updatedUser) {
            return response.status(200).json({
                success: true,
                msg: `Successfully applied the job`
            })
        } else {
            return response.status(404).json({
                success: false,
                msg: "User not found"
            })
        }

    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success: false,
            msg: `Server failed to load: ${error.message}`
        })
    }
}

module.exports = {
    getAllOpportunityData,
    appliedJob
}