const Record = require("../models/User");

const createRecord = async (req, res) => {
  const { productId, orderId } = req.body;

  if (!productId || !orderId) {
    return res
      .status(400)
      .json({ error: "Product ID and Order ID are required" });
  }

  try {
    const newRecord = new Record({ productId, orderId });
    await newRecord.save();
    res.status(201).json({ message: "Record saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error saving record" });
  }
};

module.exports = {
  createRecord,
};
