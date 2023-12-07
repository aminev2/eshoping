import { Router } from "express";
const router = Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  updateUser,
  deleteUser,
  getUserCountByDay,
  getCustomerCountByDay
} from "../controllers/userController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
router.route("/register").post(registerUser);
router.route("/").get(getUsers);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.get("/count-user-by-day", getUserCountByDay );
router.get("/count-customer-by-day", getCustomerCountByDay );
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(/* protect, admin, */ deleteUser)
  .put(/* protect, admin, */ updateUser)
  .get(/* protect, admin, */ getUserByID);

export default router;
