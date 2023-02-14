const express = require('express');
const { salesController } = require('../controllers');
const { salesMiddleware } = require('../middlewares');

const router = express.Router();

router.post('/',
  salesMiddleware.quantityValueValidation,
  salesMiddleware.quantityValidation, salesMiddleware.ProductIdValidation,
  salesController.insertSales);

module.exports = router;