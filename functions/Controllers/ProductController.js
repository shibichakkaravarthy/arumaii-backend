// import Product from '../Models/Product.model'

const Product = require('../Models/Product.model')

exports.addProduct = (req, res, next) => {
	const { name, price, points, isInven, stock } = req.body

	const product = new Product({ name, price, points, isInven, stock })

	product.save((err, product) => {
		if(err) {
			console.log('err', err)
			res.status(500).json(err)
		}

		res.status(200).json(product)
	})
}

exports.getProducts = (req, res, next) => {
	Product.find({}, (err, products) => {
		if(err) {
			console.log('error', err)
			res.status(500).json(err)
		}

		res.status(200).json(products)
	})
}