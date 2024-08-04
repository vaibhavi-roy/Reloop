const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
