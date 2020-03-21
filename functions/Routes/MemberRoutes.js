// import { Router } from 'express'
// import { addMember, getMembers } from '../Controllers/MemberController'

const Router = require('express').Router

const memberController = require('../Controllers/MemberController')

const memberRouter = Router()

console.log('memberRoute', memberController)

memberRouter.post('/add', memberController.addMember )

memberRouter.get('/', memberController.getMembers)

module.exports = memberRouter