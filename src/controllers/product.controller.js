const { productService } = require('../services');

const listProducts = async (_req, res) => {
  const { type, message } = await productService.findAll();

  if (type) return res.status(500).json(message);

  res.status(200).json(message);
};

const listProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) {
    return res.status(type).json({ message });
  }

  return res.status(200).json(message[0]);
};

module.exports = {
  listProducts,
  listProductsById,
};