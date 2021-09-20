import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// general route /api/products/

// could use: router.route("/").get(getProducts);
router.route("/").get(getProducts).post(protect, admin, createProduct);

// could use router.route("/:id").get(getProduct);
router.get("/:id", getProduct);

router
  .route("/:id")
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
