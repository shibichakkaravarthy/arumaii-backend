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

exports.updateProduct = (req, res, next) => {
	const id = req.params.id
	const { name, price, points, isInven, stock } = req.body

	Product.updateOne({ _id: id }, { name, price, points, isInven, stock }, (err, updated) => {
		if(err) {
			res.status(500).json({ msg: 'Error while Updating product', err: err })
		}

		res.status(200).json({ msg: 'success', updated })
	})
}

exports.deleteProduct = (req, res, next) => {
	const id = req.params.id

	Product.deleteOne({ _id: id }, (err) => {
		if(err) => {
			res.status(500).json({ msg: 'There was an error while deleting the product', err })
		}

		res.status(200).json({ msg: 'Product was deleted' })
	})
}