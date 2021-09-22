import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProduct,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// general route /api/products/

// could use: router.route("/").get(getProducts);
router.route("/").get(getProducts).post(protect, admin, createProduct);

// router.get("/top", getTopProducts);
router.route('/top').get(getTopProducts)

// could use router.route("/:id").get(getProduct);
router.get("/:id", getProduct);

router
  .route("/:id")
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

router.route("/:id/reviews").post(protect, createProductReview);


export default router;
