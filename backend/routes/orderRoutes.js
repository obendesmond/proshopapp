import express from "express";
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// all routes go to /api/orders

// could use: router.('/', protect, addOrderItems)
router.route("/").post(protect, addOrderItems);

router.route("/myorders").get(protect, getMyOrders);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
