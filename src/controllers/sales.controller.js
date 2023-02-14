const { salesService } = require('../services');

const insertSales = async (req, res) => {
   try {
    const sales = req.body;
    const { type, message } = await salesService.insertNewSale(sales);
  
    if (type) return res.status(type).json({ message });
    return res.status(201).json(message);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  insertSales,
};