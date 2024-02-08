const express = require("express");
const { signUp } = require("../controller/authController");

const userRouter = express.Router();

userRouter.route("/sign-up").post(signUp);

module.exports = userRouter;
