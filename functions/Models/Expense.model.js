// import { Schema, Types, model } from 'mongoose'

const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
	title: String,
	description: String,
	date: { type: Date, default: new Date() },
	amount: Number
})

module.exports =  mongoose.model('Expense', expenseSchema)