// import Member from '../Models/Member.model'

const Member = require('../Models/Member.model')

exports.addMember = (req, res, next) => {
	const { name, mobile, cardNo } = req.body

	let member = new Member({ name, mobile, cardNo })
	member.save((err, member) => {
		if(err) {
			console.log('Error on Saving', err)
			res.status(500).json({ err: err })
		}
		
		console.log('member added', member)
		res.json(member)
	})
}

exports.updateMember = (req, res, next) => {
	const { name, mobile, cardNo } = req.body
	const id = req.params.id
	console.log('update Member', req.body)

	Member.updateOne({ _id: id }, { name, mobile, cardNo }, (err, updated) => {
		if (err) {
			console.log(err)
			res.status(500).json({msg: 'error while saving changes to database'})
		}

		res.status(200).json(updated)
	})


}

exports.getMembers = (req, res, next) => {
	Member.find({}, (err, members) => {
		if(err) {
			console.log('err', err)
			res.status(500).json({ err, msg: 'cannot get members' })
		}

		res.status(200).json(members)
	})
}