import { Router } from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  addOrderItems,
  getOrders,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";
  
const router = Router();

router.route("/").post(protect, addOrderItems).get(/* protect, admin, */ getOrders);

router.route("/mine").get(protect, getMyOrders);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/pay").put(protect, updateOrderToPaid);

router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
