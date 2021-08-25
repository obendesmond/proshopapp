import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Register a new user
// @route POST /api/users
// @access Public
router.route("/").post(registerUser);

// @desc Authenticate user & get token
// @route POST /api/users/login
// @access Public
router.route("/login").post(authUser);

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
// protect middleware is going to run whenever we hit /api/users/profile
router.route("/profile").get(protect, getUserProfile);

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
router.route("/profile").put(protect, updateUserProfile);

export default router;
