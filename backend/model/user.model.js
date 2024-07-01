const mongoose = require("mongoose");
const userModel = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    userPassword: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
    },
    appliedJob: [
        {
            type: Number,
            _id: { type: mongoose.Schema.Types.ObjectId, auto: false }
        }
    ],
    token: {
        type: String,
    }
});
const userCollection = mongoose.model("users", userModel);

module.exports = { userCollection };
