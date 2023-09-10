import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getTokenUserAuth,
  verifyOtpAndCreateUser,
  getAllUsers, // Add this line to import the getAllUsers function
} from "../controllers/userController.js";
import { searchUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/otp-verify", verifyOtpAndCreateUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.get("/search", searchUsers);
router.get("/get-tokenGithub", protect, getTokenUserAuth);
router.get("/getAllUsers", protect, getAllUsers); // Add this line to create the getAllUsers route

export default router;
