const { salesModel, productModel } = require('../models');

const validation = async (id) => {
  const [result] = await productModel.findById(id);
  if (!result) return { type: 404, message: 'Product not found' };

  return { type: null, message: '' };
};

const insertNewSale = async (sales) => {
  const verifiedProduct = await Promise.all(sales.map((sale) => validation(sale.productId)));

  const verify = verifiedProduct
    .find((error) => error.type !== null);
  
  if (verify !== undefined) return verify;
  
  const id = await salesModel.registerSales();
  const result = await salesModel.registerSaleProduct({ id, sales });

  return { type: null, message: result };
};

module.exports = {
  insertNewSale,
};