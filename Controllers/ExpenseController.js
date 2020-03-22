// import Expense from '../Models/Expense.model'

const Expense = require('../Models/Expense.model')

exports.addExpense = (req, res, next) => {
	const { title, description, date, amount } = req.body

	const expense = new Expense(req.body)
	expense.save((err, expense) => {
		if(err) {
			console.log('error', err)
			res.status(500).json(err)
		}

		res.status(200).json(expense)
	})
}

exports.getExpenses = (req, res, next) => {
	Expense.find({}, (err, expenses) => {
		if(err) {
			res.status(500).json(err)
		}

		res.status(200).json(expenses)
	})
}