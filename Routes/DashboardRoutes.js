const Router = require('express').Router
const DashboardController = require('../Controllers/DashboardController')

const dashboardRouter = Router()

dashboardRouter.get('/main', DashboardController.getMainData)

dashboardRouter.post('/getMemberData', DashboardController.getMembersData)

dashboardRouter.get('/getMember/:id', DashboardController.getMember)

module.exports = dashboardRouter;