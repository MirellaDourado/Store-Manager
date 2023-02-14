const { salesModel, productModel } = require('../models');

const getAllSales = async () => {
  const allSales = await salesModel.findSales();

  return { type: null, message: allSales };
};

const getSaleById = async (id) => {
  const sale = await salesModel.findById(id);

  if (sale.length === 0) return { type: 404, message: 'Sale not found' };
  return { type: null, message: sale };
};

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
  getAllSales,
  getSaleById,
};