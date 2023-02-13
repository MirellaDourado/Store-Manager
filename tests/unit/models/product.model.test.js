const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const { allProducts } = require('./product.model.mock');
const { productModel } = require('../../../src/models');

describe('Teste de unidade do product ', function () {
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

  afterEach(function () {
    sinon.restore();
  })
});