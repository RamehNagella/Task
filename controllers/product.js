const Product = require("../models/product");

exports.createProduct = async (req, res, next) => {
  try {
    const order_id = req.body.order_id;
    const item_name = req.body.item_name;
    const cost = req.body.cost;
    const order_date = req.body.order_date;
    const delivery_date = req.body.delivery_date;

    // const order_id = "123";
    // const item_name = "Samsung Mobile";
    // const cost = 400;
    // const order_date = new Date(Date.now());
    // const delivery_date = new Date(2023, 11, 11);
    // checking is the product is already present in db or not
    const productExits = await Product.findOne({ order_id });
    if (productExits) {
      return res.status(400).json({ error: " Product already exists" });
    }
    //create new error
    const newOrder = new Product({
      order_id,
      item_name,
      cost,
      order_date,
      delivery_date
    });
    await newOrder.save();
    res
      .status(201)
      .json({
        message: "order created successfully.",
        order_id,
        order_date,
        item_name
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

//update the order for a specific order ID
exports.updateProduct = async (req, res, next) => {
  try {
    const order_id = req.body.order_id;
    const delivery_date = req.body.delivery_date;

    const updatedOrder = await Product.findOneAndUpdate(
      { order_id },
      { $set: { delivery_date: new Date(delivery_date) } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//list the all products from db for a given data
exports.fetchProducts = async (req, res, next) => {
  try {
    const date = req.params.order_date;
    const products = await Product.find({ order_date: date }).sort({
      order_date: 1
    });

    // const formattedProducts = products.map(product =>{
    //   return product.toObject(),order_date:formatDate(product.order_date)
    // })
    res.status(200).json(products);
    // res.status(200).json(formattedProducts)
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Query for a specific order with Order ID
exports.getProduct = async (req, res) => {
  try {
    const orderId = req.params.order_id;

    const order = await Product.findOne({ order_id: orderId });
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
    const order_id = req.params.order_id;

    const deletedOrder = await Product.findOneAndDelete({ order_id: order_id });

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
