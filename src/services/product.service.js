const { productModel } = require('../models');

const findAll = async () => {
  const products = await productModel.findAll();

  return { type: null, message: products };
};

const findById = async (id) => {
  const product = await productModel.findById(id);

  if (!product.length) return { type: 404, message: 'Product not found' };
  return { type: null, message: product };
};

const newProduct = async (product) => {
  const response = await productModel.insert(product);
  
  return { type: null, message: response };
};

module.exports = {
  findAll,
  findById,
  newProduct,
};