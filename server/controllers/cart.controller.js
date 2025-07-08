import User from "../models/user.model.js";
import Item from "../models/item.model.js";
import Book from "../models/book.model.js";
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { book } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const item = await Book.findById(book);
    if (!item) {
      return res.status(404).json({ error: "User not found" });
    }
    user.cart.push(book);
    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.cart.pull(req.params.id);
    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.cart = [];
    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.cart = req.body;
    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
