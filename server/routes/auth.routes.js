import express from "express";
import { register, login, logout, refresh, profile } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
const router = express.Router();

router.post("/register",upload.single("avatar"), register);
router.post("/login", login);           
router.post("/logout", logout);
router.get("/profile", profile);
router.get("/refresh", refresh);
export default router;