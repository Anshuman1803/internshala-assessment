const { userRegister, userSignIn } = require("../controller/auth.controller");

const authRoutes = require("express").Router();

authRoutes.post("/register", userRegister)
authRoutes.post("/login", userSignIn)

module.exports = { authRoutes }