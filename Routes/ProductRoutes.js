// import { Router } from 'express'
// import { addProduct, getProducts } from '../Controllers/ProductController'

const Router = require('express').Router
const ProductController = require('../Controllers/ProductController')

const productsRouter = Router()

productsRouter.post('/add', ProductController.addProduct)

productsRouter.get('/', ProductController.getProducts)

productsRouter.patch('/update/:id', ProductController.updateProduct)

productsRouter.delete('/delete/:id', ProductController.deleteProduct)

module.exports = productsRouter