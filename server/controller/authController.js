const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const catchAsyncErr = require("../utils/catchAsyncErr");
const AppError = require("../utils/error");

exports.signUp = catchAsyncErr(async (req, res, next) => {
  const { password, email, username } = req.body;

  if ((!password && !email) || !username) {
    return next(new AppError("Please Provide All The Required Fields", 403));
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (!newUser) {
    return next(new AppError("Cannot Create New User"), 400);
  }

  return res.status(201).json({
    status: "success",
  });
});
