import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProductReview,
  createProduct,
  filterProducts,
  getProductCountByDay,
  deleteProduct,
  getProductsCountByCategory,
} from "../controllers/productController.js";
import { upload } from "../utils/uploadImages.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
const router = Router();

router.get("/count-by-day", getProductCountByDay);
router
  .route("/")
  .get(getProducts)
  .post(protect, admin, upload.array("image"), createProduct);

router.get("/:id([0-9a-fA-F]{24})", getProductById);

router.delete("/:id([0-9a-fA-F]{24})", deleteProduct);

router.route("/filter").get(filterProducts);

router.route("/:id/reviews").post(protect, createProductReview);

router.get("/products-count-by-category", getProductsCountByCategory);

export default router;
