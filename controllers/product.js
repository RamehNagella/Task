const Product = require("../models/product");

exports.createProduct = async (req, res, next) => {
  try {
    const order_id = req.body.order_id;
    const item_name = req.body.item_name;
    const cost = req.body.cost;
    const order_date = req.body.order_date;
    const delivery_date = req.body.delivery_date;

    //checking is the product is already present in db or not
    const productExits = Product.findOne({ order_id });
    if (productExits) {
      const error = new Error("Product is already exisitng.");
      return res.status(400).json({ error: error });
    }
    //create new error
    const newOrder = new Order({
      order_id,
      item_name,
      cost,
      order_date,
      delivery_date
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

//update the order
exports.updateProduct = async (req, res, next) => {
  try {
    const order_id = req.body.order_id;
    const delivery_date = req.body.delivery_date;

    const updatedOrder = await Order.findOneAndUpdate(
      { order_id },
      { $set: { delivery_date } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get the single product from db
exports.fetchProduct = async (req, res, next) => {
  try {
    const orderId = req.query.order_id;
    const product = await Product.find({ order_id: orderId });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Query for a specific order with Order ID
exports.findProduct = async (req, res) => {
  try {
    const orderId = req.body.order_id;

    const order = await Product.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an order with Order ID
exports.deleteProduct = async (req, res) => {
  try {
    const order_id = req.params.orderId;

    const deletedOrder = await Product.findOneAndDelete({ order_id });

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(deletedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
