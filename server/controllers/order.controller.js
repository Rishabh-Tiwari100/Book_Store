import Order from "../models/order.model.js";
import Book from "../models/book.model.js";
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items provided." });
    }

    // Build secure orderItems from DB
    const secureOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const book = await Book.findById(item._id);
        if (!book) {
          throw new Error(`Book not found: ${item.book}`);
        }

        return {
          name: book.name,
          qty: item.quantity,
          image: book.image,
          price: book.price,
          book: book._id,
        };
      })
    );

    const order = new Order({
      user: req.user.id,
      orderItems: secureOrderItems,
      shippingAddress,
    });

    const createdOrder = await order.save();
    return res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Order creation failed:", error.message);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("user");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};