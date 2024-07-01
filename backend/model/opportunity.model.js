const mongoose = require("mongoose");
const opportunityModel = mongoose.Schema({
    opportunityID: {
        type: Number,
        required: true,
        unique: true
    },
    profileName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    company_logo: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    stipend: {
        type: String,
        required: true,
    },
    location: {
        type: Array,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    }
});
const opportunityCollection = mongoose.model("opportunity", opportunityModel);

module.exports = { opportunityCollection };
