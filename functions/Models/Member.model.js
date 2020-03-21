// import {Schema, Types, model } from 'mongoose'
const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
	name: String,
	mobile: String,
	ponits: Number,
	cardNo: String,
	isPremium: { type: Boolean, default: false },
	joined: { type: Date, default: new Date() }
})

module.exports =  mongoose.model('member', memberSchema)



