const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect, use } = chai;

use(sinonChai);

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { allProducts, thirdProduct } = require('./product.controller.mock');

describe('Verificando camada controller de products', function () {
  it('Retorna a lista completa de todos os produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.stub(productService, 'findAll').resolves({ type: null, message: allProducts});

    await productController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Retorna um produto pelo id', async function () {
    const res = {};
    const req = {
      params: { id: 3 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.stub(productService, 'findById').resolves({ type: null, message: [thirdProduct] });

    await productController.listProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(thirdProduct);
  });

   it('Retorna um erro caso o id do produto não exista', async function () {
    const res = {};
    const req = {
      params: { id: 10 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.stub(productService, 'findById').resolves({ type: 404, message: 'Product not found' });

    await productController.listProductsById(req, res);

    expect(res.status).to.have.been.calledWith(404);
     expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});