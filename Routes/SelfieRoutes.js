const Router = require('express').Router
const SelfieController = require('../Controllers/SelfieController')

const selfieRouter = Router()

selfieRouter.post('/add', SelfieController.addSelfie )

module.exports = selfieRouter