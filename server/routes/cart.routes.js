import express from "express";
import {
    addToCart,
    removeFromCart,
    getCart,
    updateCart,
} from "../controllers/cart.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, getCart);
router.post("/", authenticate, addToCart);
router.put("/:id", authenticate, updateCart);
router.delete("/:id", authenticate, removeFromCart);

export default router;