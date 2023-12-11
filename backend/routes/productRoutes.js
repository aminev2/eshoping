import { Router } from "express";
import {
  getProducts,
  getProductById,
  getProductCountByDay,
  createProduct,
  deleteCategory,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/uploadImages.js";
const router = Router();

router.post("/", protect, admin, upload.array("image"), createProduct);

router.get("/", getProducts);

router.get("/count-by-day", getProductCountByDay);

router.get("/:id", getProductById);

router.delete("/:id",  protect, admin,  deleteCategory);

router.put("/:id",  protect, admin,  updateProduct);

export default router;
