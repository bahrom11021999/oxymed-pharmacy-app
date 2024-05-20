const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) =>
  jwt.sign({ id }, "mario-cat", {
    expiresIn: "30d",
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
    withCredentials: true,
  });

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    data: user,
  });
};

exports.signUp = catchAsync(async (req, res) => {
  const input = {
    username: req.body.username,
    password: req.body.password,
  };

  // Create a new user
  const user = await User.create(input);

  createSendToken(user, 201, req, res);
});

exports.login = catchAsync(async (req, res) => {
  const { username, password } = {
    username: req.body.username,
    password: req.body.password,
  };

  // Check if user provided data
  if (!username || !password)
    throw new Error("🔐 Please provide username and password");

  // Check if user exists
  const user = await User.findOne({ username }).select("+password");

  if (!user) throw new Error("👻 User not found");

  // Check if password is correct
  if (password !== user.password) throw new Error("🔐 Password is incorrect");

  createSendToken(user, 200, req, res);
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await promisify(jwt.verify)(req.cookies.jwt, "mario-cat");
      console.log(decoded);
      const user = await User.findById(decoded.id);
      user.password = undefined;

      if (!user) {
        res.status(401).json({
          status: "fail",
          message: "User no longer exists",
        });
      }

      res.status(200).json({
        status: "success",
        data: user,
      });
    }
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: "🍪 Please log in first",
    });
  }
});

exports.logOut = catchAsync(async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
    withCredentials: true,
  };
  res.cookie("jwt", "loggedOut", cookieOptions);
  res.status(200).json({ status: "success", message: "✌️ See you soon!" });
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;

  // Check if there is a token
  if (!token)
    res.status(401).json({
      status: "fail",
      message: "🔐 Please login first",
    });

  const decoded = await promisify(jwt.verify)(token, "mario-cat");
  console.log(decoded);

  // Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user)
    res.status(401).json({
      status: "fail",
      message: "🔐 User no longer exists",
    });

  // Send user data
  req.user = user;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      res.status(401).json({
        status: "error",
        message: "⛔ You do not have permission to perform this action!",
      });

    return next();
  };
