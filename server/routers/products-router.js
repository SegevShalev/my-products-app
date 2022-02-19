const express = require('express')

const {getProducts,postProducts} = require('../controller/products-controller')

const productsRouter = express.Router()

productsRouter.get('/',getProducts)
productsRouter.post('/',postProducts)
productsRouter.put('/')
productsRouter.delete('/')

module.exports = productsRouter