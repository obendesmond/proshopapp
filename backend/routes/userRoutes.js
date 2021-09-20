import express from "express";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

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

// @desc Get all users - admins only
// @route GET /api/users
// @access Private/Admin
/* this route goes through two middlewares protect and admin, making sure
    the user is both loged in and is an admin before he can access this
    route 
*/
router.route("/").get(protect, admin, getUsers);

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
router.route("/profile").put(protect, updateUserProfile);

// @desc delete user
// @route DELETE /api/users/:id
// @access Private/Admin
router.route("/:id").delete(protect, admin, deleteUser);

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
router.route("/:id").get(protect, admin, getUserById);

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
router.route("/:id").put(protect, admin, updateUser);

export default router;
