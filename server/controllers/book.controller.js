import Book from "../models/book.model.js";
import User from "../models/user.model.js";
import fs from "fs";
import cloudinary from "../utils/cloudinary.js";
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBook = async (req, res) => {
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.image = result.secure_url;
      fs.unlinkSync(req.file.path);
    }
    const book = await Book.create({ ...req.body });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req, res) => {
  console.log(req.body);
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.image = result.secure_url;
      fs.unlinkSync(req.file.path);
    }
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    cloudinary.uploader.destroy(book.image);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getFavourite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favouriteBooks");
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.favouriteBooks);
  } catch (error) {
    res.status(503).json({ error: error.message });
    console.log(error);
  }
};

export const addToFavourite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.favouriteBooks.push(req.body._id);
    await user.save();
    res.status(200).json(user.favourite);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};
