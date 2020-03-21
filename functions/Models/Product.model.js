// import { Schema, Types, model } from 'mongoose'
const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
	name: String,
	price: Number,
	points: Number,
	isInven: Boolean,
	stock: Number
})

module.exports =  mongoose.model('product', productSchema)