import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { getToken } from "./githubController.js";
import sendEmail from "../utils/sendEmail.js";
import otpGenerator from "otp-generator";

let OTPs 

const getTokenUserAuth = expressAsyncHandler(async(req, res, token) => {
  //const token = req.user.token;
  getToken(token)
  console.log('success')
})

const generateOtp = () => {
  const otp = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false });
  OTPs = otp; // Store the OTP for verification
  console.log("3-",OTPs, otp);
}

const verifyOtp = (otp) => {
  const storedOtp = OTPs;
  console.log("1-",storedOtp, OTPs,otp,storedOtp === otp );
  if (storedOtp && storedOtp === otp) {
    return true;
  }
  return false;
};

// @desc Auth user/set token
// @route POST /api/users/auth
// @access Public
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    getTokenUserAuth(req, res, user.token);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
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
  generateOtp();
  const { name, username, email, password, country, gender, edu, token } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  sendEmail(email, OTPs);

  res.status(200).json({ message: "OTP sent successfully" });
});

// @desc verify
// route POST /api/users
// @access Public
const verifyOtpAndCreateUser = expressAsyncHandler(async (req, res) => {
  const { email, otp, name, username, password, country, gender, edu, token } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  console.log(`2- here the otp: ${OTPs}, ${otp}`);
  const isValidOtp = verifyOtp(otp);

  if (isValidOtp) {
    console.log("4- here");
    const user = await User.create({
      name,
      username,
      email,
      password,
      country,
      gender,
      edu,
      token
    });

    if (user) {
      generateToken(res, user._id);
      getTokenUserAuth(req, res, user.token);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        token: user.token,
        country: user.country,
        gender: user.gender,
        edu: user.edu,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } else {
    res.status(400);
    throw new Error(`error: ${otp} ${OTPs}`);
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
  getTokenUserAuth(req, res, null)
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
  verifyOtpAndCreateUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  searchUsers,
  getTokenUserAuth
};
