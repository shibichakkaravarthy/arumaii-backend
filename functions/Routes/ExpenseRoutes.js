// import { Router } from 'express'
// import { addExpense, getExpenses } from '../Controllers/ExpenseController'

const Router = require('express').Router
const ExpenseController = require('../Controllers/ExpenseController')

const expenseRouter = Router()

expenseRouter.post('/add', ExpenseController.addExpense)

expenseRouter.get('/', ExpenseController.getExpenses)

module.exports = expenseRouter