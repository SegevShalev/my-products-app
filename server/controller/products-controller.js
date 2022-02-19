const { MONGO_CLIENT_EVENTS } = require('mongodb')
const productsService = require('../services/products-services')

async function getProducts(req, res) {
    try{
        const products = await productsService.getAllProducts()
        return res.status(200).json({products,total:products.length})
    }catch(err){
        console.error(err)
    }

}

async function postProducts(req,res){
    await productsService.postProducts(req.body.products)
    return res.status(200).json('products'+req.products )
}

module.exports = {getProducts,postProducts}