import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/", authenticate, upload.single("avatar"), updateUser);
router.delete("/:id", deleteUser);

export default router;
