// import { Router } from 'express'
// import { addProduct, getProducts } from '../Controllers/ProductController'

const Router = require('express').Router
const ProductController = require('../Controllers/ProductController')

const productsRouter = Router()

productsRouter.post('/add', ProductController.addProduct)

productsRouter.get('/', ProductController.getProducts)

module.exports = productsRouter