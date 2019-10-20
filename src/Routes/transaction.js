const express = require('express');
const transactionController = require('../Controllers/transaction.js');
const Router = express.Router();

Router.post('/', transactionController.postTransaction);
Router.post('/product/', transactionController.postProductTransaction);

module.exports = Router;