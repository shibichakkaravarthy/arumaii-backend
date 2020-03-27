const Bill = require('../Models/Bill.model')
const Member = require('../Models/Member.model')

exports.addBill = (req, res, next) => {
	const { memberId, items, totalAmount, totalPoints } = req.body
	console.log(req.body)
        let oldPoints = 0

	let bill = new Bill({ memberId, items, totalAmount, totalPoints })

	bill.save(async (err, bill) => {
		if(err) {
			console.log(err)
			res.status(500).json({ msg: 'Error Ocuured while saving the bill', error: err })
		}
		
		await Member.findById(memberId, (err, member) => {
			oldPoints = member.points
		})

		console.log(oldPoints)
		
		Member.updateOne({ _id: memberId }, { points: oldPoints + totalPoints })
		.then(points => {
			res.status(200).json({bill, points})
		})
		.catch(err => {
			res.status(500).json({ msg: 'Error Ocuured while saving the points', err })
		})
	})
}

exports.getBills = (req, res, next) => {
	Bill.find({}, null, {sort: {date: -1}}, (err, bills) => {
		if(err) {
			res.status(500).json({ msg: 'Error occured while fetching Bills' })
		}

		res.status(200).json(bills)
	})
}
