const connection = require('./connection');

const registerSaleProduct = async ({ id, sales }) => {
  sales.forEach((element) => {
    connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [id, element.productId, element.quantity],
    );
  });

  return { id, itemsSold: sales };
};

const registerSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

module.exports = {
  registerSales,
  registerSaleProduct,
};