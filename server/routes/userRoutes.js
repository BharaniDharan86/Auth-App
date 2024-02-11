const express = require("express");
const { signUp, signIn, google } = require("../controller/authController");

const userRouter = express.Router();

userRouter.route("/sign-up").post(signUp);
userRouter.route("/sign-in").post(signIn);
userRouter.route("/google").post(google);

module.exports = userRouter;
