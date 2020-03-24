const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
	memberId: {
		type: mongoose.Types.ObjectId,
		ref: 'member'
	},
	date: {
		type: Date,
		default: new Date()
	},
	items: Array,
	totalAmount: Number,
	totalPoints: Number
})

module.exports = mongoose.model('bill', billSchema)