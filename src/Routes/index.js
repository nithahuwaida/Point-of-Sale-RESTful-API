const express = require('express');
const category = require('./category');
const product = require('./product');
const transaction = require('./transaction');

const Router = express.Router();

Router.use('/categories', category);
Router.use('/products', product);
Router.use('/transactions',transaction)

module.exports = Router;