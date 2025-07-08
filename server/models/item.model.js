import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  quantity: {
    type: Number,
    default: 1
  }
});

 export default  mongoose.model('Item', itemSchema);