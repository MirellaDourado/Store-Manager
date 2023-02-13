const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id');
  return result;
};

const findById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return result;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.products (name) VALUE (?)',
      [product.name],
  );
  return { id: insertId, name: product.name };
};

module.exports = {
  findAll,
  findById,
  insert,
};