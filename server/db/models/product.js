const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  id: {
    type: String,
    trim: true,
    unique: true
  },
  title:{
    type: String,
      maxlength: 30
  },
  description:{
    type: String,
    maxlength: 30
  },
  price: {
    type: String,
  },
  image:{
    type: String,
  },

});

const Product = mongoose.model("Product",productSchema)
module.exports = Product;
