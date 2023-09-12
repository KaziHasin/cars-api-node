const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "Product Price must be provided"],
  },
  features: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Toyota"],
      message: "{VALUE} not supported",
    },
  },
});

module.exports = mongoose.model("product", ProductSchema);
