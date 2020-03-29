const Bill = require('../Models/Bill.model')
const Member = require('../Models/Member.model')
const Expense = require('../Models/Expense.model')
const Product = require('../Models/Product.model')

exports.getMainData = async (req, res, next) => {
	const bills = await Bill.find({}, null, {sort: {date: -1}})
	const members = await Member.find({}, null)
	const products = await Product.find({}, null)

	console.log('dash data', bills, members, products)

	res.status(200).json({ bills, members, products })
}