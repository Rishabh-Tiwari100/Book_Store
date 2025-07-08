import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getMyOrders,
} from "../controllers/order.controller.js";
import { authenticate, isAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", authenticate, getAllOrders);
router.get("/:id", authenticate, getOrderById);
router.get("/user/:id", authenticate, getMyOrders);
router.post("/", authenticate, createOrder);
router.put("/:id", authenticate, updateOrder);
router.delete("/:id", authenticate, isAdmin, deleteOrder);

export default router;
