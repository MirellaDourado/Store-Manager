const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const { allProducts } = require('./product.model.mock');
const { productModel } = require('../../../src/models');

describe('Verificando camada model de products', function () {
  describe('Testando o GET', function () {
    it('Recuperando a lista de produtos', async function () {
      sinon.stub(connection, 'execute').resolves([allProducts]);
  
      const productList = await productModel.findAll();
  
      expect(productList).to.be.deep.equal(allProducts);
    });
  
    it('Recuperando um produto pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([allProducts[0]]);
      const product = await productModel.findById(1);
  
      expect(product).to.be.deep.equal(allProducts[0]);
    });
  });

  describe('Testando o POST', function () {
    it('Insere um novo produto', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

      const product = await productModel.insert({ name: 'Anaklusmos' });

      expect(product).to.be.deep.equal({ id: 1, name: 'Anaklusmos' });
    });
  });

  afterEach(function () {
    sinon.restore();
  })
});