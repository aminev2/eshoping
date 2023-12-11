import { Router } from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  getCategoryById
} from "../controllers/categoryController.js";

const router = Router();

router.route("/").post( protect, admin,  addCategory).get(getAllCategories);
router
  .route("/:id")
  .delete( protect, admin,  deleteCategory)
  .post( protect, admin,  addCategory)
  .put(/* protect, admin, */ updateCategory)
  .get(protect, getCategoryById);
  

export default router;