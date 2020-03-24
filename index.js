const functions = require('firebase-functions');
// const express = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// import {memberRouter, productsRouter, expenseRouter} from './Routes'

const expenseRouter = require('./Routes/ExpenseRoutes')
const productsRouter = require('./Routes/ProductRoutes')
const memberRouter = require('./Routes/MemberRoutes')
const billRouter = require('./Routes/BillRoutes')

mongoose.connect('mongodb+srv://engine259:triadkube2019@cluster0-5ab7g.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.once('open', () => {
	console.log('connected to db')
})

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res, next) => {
	res.send('Working')
})



app.use('/product', productsRouter)
app.use('/member', memberRouter)
app.use('/expense', expenseRouter)
app.use('/bill', billRouter)

app.get('/', (req, res, next) => {
	res.send('Working')
})

app.listen(3000, () => {
	console.log('Server Up and Running')
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.app = functions.https.onRequest(app);
