const axios = require("axios");
const Product = require("../db/models/product");

async function getAllProducts() {
  const req = Product.find();
  return req;
}

async function postProducts(products) {
 /*  products.map((product) => {
    let updatedProduct = new Product({
      id: product.id,
      title: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
    });
  }); */
  console.log(products);
  await Product.deleteMany({})
  await Product.insertMany(products);
  
}

module.exports = { getAllProducts, postProducts };
