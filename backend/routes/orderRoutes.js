import express from "express";
import {
  addOrderItems,
  getOrderById,
  getOrders,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// could use: router.('/', protect, addOrderItems)
router.route("/").post(protect, addOrderItems);

router.route("/").get(protect, getOrders);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
