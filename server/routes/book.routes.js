import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { authenticate, isAdmin } from "../middlewares/auth.middleware.js";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  addToFavourite,
  getFavourite,
} from "../controllers/book.controller.js";
const router = express.Router();

router.get("/", getAllBooks);
router.get("/favourites", authenticate, getFavourite);
router.get("/:id", getBookById);
router.post("/", authenticate, isAdmin, upload.single("image"), createBook);
router.put("/:id", authenticate, isAdmin, upload.single("image"), updateBook);
router.delete("/:id", authenticate, isAdmin, deleteBook);
router.post("/favourites", authenticate, addToFavourite);
export default router;
