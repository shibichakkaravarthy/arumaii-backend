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

exports.getMembers = (req, res, next) => {
	Member.find({}, (err, members) => {
		if(err) {
			console.log('err', err)
			res.status(500).json({ err, msg: 'cannot get members' })
		}

		res.status(200).json(members)
	})
}