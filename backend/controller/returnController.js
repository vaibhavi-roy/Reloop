const ReturnRequest = require("../models/return");
const User = require("../models/User");

const createReturnRequest = async (req, res) => {
  try {
    const { productId, orderId } = req.body;
    const user = await User.findOne({ productId, orderId });
    if (!user) {
      return res.status(400).send({ error: "Invalid productId or orderId" });
    }
    const returnRequest = new ReturnRequest({
      ...req.body,
      product_id: user._id,
      order_id: user._id,
    });

    await returnRequest.save();
    res.status(201).json({ message: "Record saved successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error saving record" });
  }
};
module.exports = { createReturnRequest };
