import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
      },
    ],
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD"],
      default: "COD",
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: { type: Date },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: { type: Date },
    status: {
      type: String,
      enum: ["Pending", "Out for delivery", "Delivered", "Cancelled"],
      required: true,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
