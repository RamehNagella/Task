const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//defining product schema
const productSchema = new Schema({
  order_id: {
    type: String,
    unique: true,
    required: true
  },
  item_name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  order_date: {
    type: String,
    required: true
  },
  delivery_date: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("Product", productSchema);
