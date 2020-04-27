const functions = require('firebase-functions');
// const express = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const aws = require('aws-sdk')
const multer = require('multer');
const multerS3 = require('multer-s3')
const mime = require('mime-types')
const env = require('dotenv')
// import {memberRouter, productsRouter, expenseRouter} from './Routes'

const expenseRouter = require('./Routes/ExpenseRoutes')
const productsRouter = require('./Routes/ProductRoutes')
const memberRouter = require('./Routes/MemberRoutes')
const billRouter = require('./Routes/BillRoutes')
const dashboardRouter = require('./Routes/DashboardRoutes')
const selfieRouter = require('./Routes/SelfieRoutes')

mongoose.connect('mongodb+srv://engine259:triadkube2019@cluster0-5ab7g.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.once('open', () => {
	console.log('connected to db')
})

env.config()
const app = express()

aws.config.update({
	secretAccessKey:  process.env.AWSSecretKey,
	accessKeyId: process.env.AWSAccessKeyId,
	region: 'ap-south-1'
})

const s3 = new aws.S3()

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'arumaiiselfiecontest',
		metadata: (req, file, cb) => {
			cb(null, { fieldName: 'TESTING_META_DATA' })
		},
		key: (req, file, cb) => {
			cb(null, Date.now().toString())
		}
	})
})

app.use(upload.single('photo'))

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res, next) => {
	res.send('Working')
})



app.use('/product', productsRouter)
app.use('/member', memberRouter)
app.use('/expense', expenseRouter)
app.use('/bill', billRouter)
app.use('/dashboard', dashboardRouter)
app.use('/selfie', selfieRouter)

app.get('/', (req, res, next) => {
	res.send('Working')
})

app.listen(3000, () => {
	console.log('Server Up and Running', process.env.AWSSecretKey)
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.app = functions.https.onRequest(app);
