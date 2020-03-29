const Router = require('express').Router
const DashboardController = require('../Controllers/DashboardController')

const dashboardRouter = Router()

dashboardRouter.get('/main', DashboardController.getMainData)

module.exports = dashboardRouter;