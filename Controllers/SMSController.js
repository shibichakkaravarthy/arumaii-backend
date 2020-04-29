const Member = require('../Models/Member.model')
const aws = require('aws-sdk')
const env = require('dotenv')

exports.SendToAll = (req, res, next) => {
	const { msgBody } = req.body

	env.config()

	aws.config.update({
		secretAccessKey:  process.env.AWSSecretKey,
		accessKeyId: process.env.AWSAccessKeyId,
		region: 'ap-south-1'
	})

	  var params = {
	  Message: msgBody,
	  TopicArn: 'arn:aws:sns:ap-south-1:744153746229:arumaii-offers'
	};

	// Create promise and SNS service object
	var publishTextPromise = new aws.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

	// Handle promise's fulfilled/rejected states
	publishTextPromise.then(
	  function(data) {
	    console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
	    console.log("MessageID is " + data.MessageId);
	    res.json({ ...data, success: true })
	  }).catch(
	    function(err) {
	    console.error(err, err.stack);
	    res.status(500).json({ ...data, success: false})
	  });
}