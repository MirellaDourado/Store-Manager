const express = require('express');
const { productController } = require('../controllers'); 

const router = express.Router();

router.get('/', productController.listProducts);

router.get('/:id', productController.listProductsById);

router.post('/', productController.insertProduct);

module.exports = router;