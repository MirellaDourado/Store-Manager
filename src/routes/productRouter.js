const express = require('express');
const { productController } = require('../controllers'); 
const { productMiddleware } = require('../middlewares');

const router = express.Router();

router.get('/', productController.listProducts);

router.get('/:id', productController.listProductsById);

router
  .post('/', productMiddleware
    .nameValidation, productMiddleware.nameLengthValidation, productController.insertProduct);

router
  .put('/:id', productMiddleware
    .nameValidation, productMiddleware.nameLengthValidation, productController.updatingProduct);

module.exports = router;