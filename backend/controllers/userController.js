import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { getToken } from "./githubController.js";

// @desc Auth user/set token
// @route POST /api/users/auth
// @access Public
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    getToken(user.token)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      userName: user.userName,
      email: user.email,
      token: user.token,
      country: user.country,
      gender: user.gender,
      edu: user.edu,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc Register a new user
// route POST /api/users
// @access Public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, userName, email, password, country, gender, edu, token } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    userName,
    email,
    password,
    country,
    gender,
    edu,
    token
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      userName: user.user,
      name: user.name,
      email: user.email,
      country: user.country,
      gender: user.gender,
      edu: user.edu,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout user
// route POST /api/users/logout
// @access Public
const logoutUser = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc Get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    country: req.user.country,
    gender: req.user.gender,
    edu: req.user.edu,
  };
  res.status(200).json(user);
});

// @desc Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.country = req.body.country || user.country;
    user.gender = req.body.gender || user.gender;
    user.edu = req.body.edu || user.edu;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      country: updatedUser.country,
      gender: updatedUser.gender,
      edu: updatedUser.edu,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Search users by name or email
// @route GET /api/users/search
// @access Private (or Public, depending on your use case)
const searchUsers = expressAsyncHandler(async (req, res) => {
  const searchTerm = req.query.q; // Get the search term from the query parameter

  const users = await User.find({
    $or: [
      { name: { $regex: searchTerm, $options: "i" } }, 
      { email: { $regex: searchTerm, $options: "i" } },
    ],
  });

  if (users.length === 0) {
    res.status(404).json({ message: "No users found matching the search term" });
  } else {
    res.status(200).json(users);
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  searchUsers
};
