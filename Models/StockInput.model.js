const mongoose = require('mongoose')

const stockInputSchema = new mongoose.Schema({
	from: '',
	date: { type: Date, default: new Date() },
	items: Array,
	amount: Number
})

module.exports =  mongoose.model('StockInput', stockInputSchema)