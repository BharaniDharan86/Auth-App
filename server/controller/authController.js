const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const catchAsyncErr = require("../utils/catchAsyncErr");
const AppError = require("../utils/error");
const createJWT = require("../utils/createToken");
const generateRandomPassword = require("../utils/generatePassword");

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

  const token = createJWT(newUser._id);

  return res.cookie("access_token", token).status(201).json({
    status: "success",
  });
});

exports.signIn = async (req, res, next) => {
  // get the email and password from the user
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    next(new AppError("Invalid Credentials", 400));
  }
  //find the user from the db using email
  const user = await User.findOne({ email });
  console.log(user);
  //compare the password with the user's hashed password

  const isValidUser = bcrypt.compareSync(password, user.password);
  if (!isValidUser) {
    return next(new AppError("Invalid Email or Password", 404));
  }
  //if the user found send the token

  const token = createJWT(user._id);
  return res.cookie("access_token", token).status(200).json({
    status: "success",
    message: "Login In Successfully",
    token: token,
    user,
  });
};

exports.google = catchAsyncErr(async (req, res, next) => {
  const { email, username, photoUrl } = req.body;

  const currUser = await User.findOne({ email });

  if (!currUser) {
    const password = generateRandomPassword(12);
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      photoUrl,
    });

    const token = createJWT(newUser._id);

    return res.cookie("access_token", token).status(200).json({
      status: "success",
      users: newUser,
    });
  } else {
    const token = createJWT(currUser._id);

    return res.cookie("access_token", token).status(200).json({
      status: "success",
      users: currUser,
    });
  }
});
