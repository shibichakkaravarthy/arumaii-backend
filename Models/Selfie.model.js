const mongoose = require('mongoose')

const selfieSchema = new mongoose.Schema({
	memberId: { type: mongoose.Types.ObjectId, ref: 'member' },
	date: { type: Date },
	location: String,
	mimetype: String
})

module.exports = mongoose.model('selfie', selfieSchema)