const { productService } = require('../services');

const listProducts = async (_req, res) => {
  const { type, message } = await productService.findAll();

  if (type) return res.status(500).json(message);

  return res.status(200).json(message);
};

const listProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) {
    return res.status(type).json({ message });
  }

  return res.status(200).json(message[0]);
};

const insertProduct = async (req, res) => {
  const product = req.body;
  const { type, message } = await productService.newProduct(product);

  if (type) {
    return res.status(type).json({ message });
  }
  
  return res.status(201).json(message);
};

const updatingProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
  
    const { type, message } = await productService.updateProduct(name, id);
    if (type) {
      return res.status(type).json({ message });
    }
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listProducts,
  listProductsById,
  insertProduct,
  updatingProduct,
};