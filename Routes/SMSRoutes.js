const router = require('express').Router
const SMSController = require('../Controllers/SMSController')

const smsRouter = router()

smsRouter.post('/offer', SMSController.SendToAll)

module.exports = smsRouter;