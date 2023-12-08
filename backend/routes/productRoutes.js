import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProductReview,
  createProduct,
  filterProducts,
} from "../controllers/productController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";
const router = Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.get("/:id([0-9a-fA-F]{24})", getProductById);

router.route("/filter").get(filterProducts);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
