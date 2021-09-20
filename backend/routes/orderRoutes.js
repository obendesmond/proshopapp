import express from "express";
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// all routes go to /api/orders

// could use: router.('/', protect, addOrderItems)
router.route("/").post(protect, addOrderItems);

router.route("/myorders").get(protect, getMyOrders);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

router.route("/").get(protect, admin, getOrders);

export default router;
