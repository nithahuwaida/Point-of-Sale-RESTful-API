const express = require('express');
const productController = require('../Controllers/product');
const Router = express.Router();

//Product CRUD
Router.get('/', productController.getProducts);
Router.get('/:id', productController.getProduct);
Router.post('/', productController.postProduct);
Router.patch('/:id', productController.updateProduct);
Router.delete('/:id', productController.deleteProduct);

//Product add Quantity 
Router.put('/qty/:id', productController.postQty);
Router.put('/qty/reduce/:id', productController.reduceQty);

module.exports = Router;