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

const validation = async (id) => {
  const [result] = await productModel.findById(id);
  if (!result) return { type: 404, message: 'Product not found' };

  return { type: null, message: '' };
};

const updateProduct = async (name, id) => {
  const verifiedProduct = await validation(id);

  if (verifiedProduct.type !== null) return { type: 404, message: 'Product not found' };

  const result = await productModel.update({ name, id });

  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  newProduct,
  updateProduct,
};