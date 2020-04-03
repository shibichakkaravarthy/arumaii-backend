const Bill = require('../Models/Bill.model')
const Member = require('../Models/Member.model')
const Product = require('../Models/Product.model')

exports.addBill = (req, res, next) => {
	const { memberId, items, totalAmount, totalPoints, date } = req.body
	console.log(req.body)
        let oldPoints = 0

	let bill = new Bill({ memberId, items, totalAmount, totalPoints, date })

	bill.save(async (err, bill) => {
		if(err) {
			console.log(err)
			res.status(500).json({ msg: 'Error Ocuured while saving the bill', error: err })
		}

		items.map(async item => {
			if(item.isInven) {	
				const oldStock = await Product.findById(item._id)
				Product.updateOne({_id: item._id}, { stock: oldStock.stock - item.quantity }, (err, stock) => console.log('stock updated'))
			}
		})
		
		await Member.findById(memberId, (err, member) => {
			if(member.points) {
				oldPoints = member.points
			}
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
