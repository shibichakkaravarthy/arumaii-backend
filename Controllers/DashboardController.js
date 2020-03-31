const Bill = require('../Models/Bill.model')
const Member = require('../Models/Member.model')
const Expense = require('../Models/Expense.model')
const Product = require('../Models/Product.model')
const StockInput = require('../Models/StockInput.model')

exports.getMainData = async (req, res, next) => {
	const bills = await Bill.find({}, null, {sort: {date: -1}})
	const members = await Member.find({}, null)
	const products = await Product.find({}, null)
	const expenses = await Expense.find({}, null)

	console.log('dash data', bills, members, products, expenses)

	res.status(200).json({ bills, members, products, expenses })
}

exports.bulkStockInput = (req, res, next) => {
	const result = []

	req.body.items.map(async item => {
		await Product.updateOne({ _id: item._id }, { stock: item.stock + newStock }, (err, update) => {
			if(err) {
				result.push(err)
			}
			else {
				result.push(update)
			}

			return null
		})
	})

	const stockInput = new StockInput(req.body)

	stockInput.save((err, res) => {
		if(err) {
			res.status(500).json(err)
		}

		res.status(200).json(res)
	})
}