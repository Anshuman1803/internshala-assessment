const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const dotENV = require("dotenv");
const { userCollection } = require("../model/user.model");
dotENV.config();
const KEY = process.env.secretKey;

// User registration controller
const userRegister = async (request, response) => {
    try {
        let { userEmail, fullName, gender, userPassword } = request.body;

        const isUserExists = await userCollection.findOne({ userEmail: userEmail });

        if (isUserExists) {
            return response.send({
                success: false,
                msg: `${userEmail} already registered`,
            });
        }

        // hashing password using bcrypt
        userPassword = bcrypt.hashSync(userPassword, 15);

        // saving new user in database
        const registredResult = await userCollection.create({
            userEmail: userEmail,
            fullName: fullName,
            gender: gender,
            userPassword: userPassword,
            token: "",
            createdAt: Date.now(),
            appliedJob: [],
        });

        if (registredResult) {
            return response.status(200).json({
                success: true,
                msg: "user successfully registered",
                user: registredResult
            });
        } else {
            return response.status(200).json({
                success: false,
                msg: "Try again later",
                user: registredResult
            });
        }

    } catch (error) {
        console.log(error)
        response.status(500).send({
            success: false,
            msg: `Server failed to load data : ${error.message}`
        })
    }
};

// User login controller
const userSignIn = async (request, response) => {
    try {
        const tempUser = request.body;
        const isUserExists = await userCollection.findOne({
            userEmail: tempUser.userID
        })

        if (!isUserExists) {
            return response.send({
                success: false,
                msg: `User not registered`,
            });
        }
        // matching Password

        const userAuthenticaticated = bcrypt.compareSync(
            tempUser.userPassword,
            isUserExists.userPassword
        );

        if (userAuthenticaticated) {
            // creating json token
            const generatedToken = JWT.sign({ USER: tempUser.userEmail }, KEY, {
                expiresIn: "72h",
            });
            isUserExists.userPassword = undefined;
            isUserExists.UserDetails = generatedToken;
            await userCollection.findOneAndUpdate({
                token: generatedToken
            })
            return response.send({
                success: true,
                UserDetails: isUserExists,
            });
        } else {
            return response.send({ success: false, msg: "Wrong Password" });
        }
    } catch (error) {
        response.status(500).json({ msg: `Check your internet connect and Try again - ${error.message}` });
    }
};

module.exports = {
    userRegister,
    userSignIn,
};
