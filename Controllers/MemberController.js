// import Member from '../Models/Member.model'

const Member = require('../Models/Member.model')
const aws = require('aws-sdk')

const sns = new aws.SNS()

aws.config.update({
	secretAccessKey:  process.env.AWSSecretKey,
	accessKeyId: process.env.AWSAccessKeyId,
	region: 'ap-south-1'
})

exports.addMember = (req, res, next) => {
	const { name, mobile, cardNo } = req.body

	let member = new Member({ name, mobile, cardNo })
	member.save((err, member) => {
		if(err) {
			console.log('Error on Saving', err)
			res.status(500).json({ err: err })
		}
		
		var params = {
		  Protocol: 'sms', /* required */
		  TopicArn: 'arn:aws:sns:ap-south-1:744153746229:arumaii-offers', /* required */
		  Endpoint: `+91${mobile}`,
		};

		var subscribePromise = new aws.SNS({apiVersion: '2010-03-31'}).subscribe(params).promise();

		// Handle promise's fulfilled/rejected states
		subscribePromise.then(
		  function(data) {
		    console.log("Subscription ARN is " + data.SubscriptionArn);
		  }).catch(
		    function(err) {
		    console.error(err, err.stack);
		  });
		
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

exports.getMemberByMobile = (req, res, next) => {
	const { mobile } = req.body

	Member.findOne({ mobile }, (err, member) => {
		if(err) {
			res.status(500).json({ msg: 'something worng happened' })
		}

		res.status(200).json(member)
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