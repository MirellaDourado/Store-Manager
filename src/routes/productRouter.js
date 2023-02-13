const express = require('express');
const { productController } = require('../controllers'); 
const { nameValidation } = require('../middlewares/product.middlewares');

const router = express.Router();

router.get('/', productController.listProducts);

router.get('/:id', productController.listProductsById);

router.post('/', nameValidation, productController.insertProduct);

module.exports = router;