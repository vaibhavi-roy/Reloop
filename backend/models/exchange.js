const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true },
  district: { type: String, required: true },
});

const exchangeRequestSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone_number: { type: Number, required: true },
  product_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  order_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  image_link: { type: String, required: true },
  reason: { type: String, required: true },

  address: { type: AddressSchema, required: true },
});

module.exports = mongoose.model("exchangeRequest", exchangeRequestSchema);
