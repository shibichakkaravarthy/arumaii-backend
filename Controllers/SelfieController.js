const Selfie = require('../Models/Selfie.model')

exports.addSelfie = (req, res, next) => {
	console.log('recieved')
	try {
		const { memberId } = req.body
		const { location, mimetype } = req.file
		if(location) {
			console.log('fileuploadSelfie', req.file.mimetype)
			const selfie = new Selfie({ memberId, location, mimetype, date: new Date() })
			selfie.save((err, selfie) => {
				if(err) {
					// res.status(500).json({ msg: 'Error on saving selfie' })
					console.log('goyyala', err)
				}

				console.log('selfie', selfie)
				res.json({ msg: 'Selfie uploaded successfully' })

			})
		}
	}

	catch (err) {
		console.log('err', err)
	}
}