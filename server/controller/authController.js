const User = require("../model/userModel");

exports.signUp = async (req, res, next) => {
  const newUser = await User.create(req.body);
  console.log(newUser);
  return res.status(201).json({
    status: "success",
  });
};
