const Router = require('express').Router
const BillController = require('../Controllers/BillController')

const billRouter = Router()

billRouter.post('/add', BillController.addBill)

billRouter.get('/', BillController.getBills)

module.exports = billRouter