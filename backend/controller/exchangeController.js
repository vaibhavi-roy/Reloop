const exchangeRequest = require("../models/exchange");
const User = require("../models/User");

const createExchangeRequest = async (req, res) => {
  try {
    const { productId, orderId } = req.body;
    const user = await User.findOne({ productId, orderId });
    if (!user) {
      return res.status(400).send({ error: "Invalid productId or orderId" });
    }
    const ExchangeRequest = new exchangeRequest({
      ...req.body,
      product_id: user._id,
      order_id: user._id,
    });

    await ExchangeRequest.save();
    res.status(201).json({ message: "Record saved successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error saving record" });
  }
};
module.exports = { createExchangeRequest };
