const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect, use } = chai;

use(sinonChai);

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { allProducts, thirdProduct } = require('./product.controller.mock');

describe('Verificando camada controller de products', function () {
  describe('Testa o GET', function () {
    
    it('Retorna a lista completa de todos os produtos', async function () {
      const res = {};
      const req = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(productService, 'findAll').resolves({ type: null, message: allProducts });
  
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
  });
  
  describe('Testa o POST', function () {
    it('Insere um novo produto no banco de dados com sucesso', async function () {
      const res = {
        body: {
          name: 'Anaklusmos'
        }
      };
      const req = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(productService, 'newProduct').resolves({ type: 201, message: { id: 1, name: 'Anaklusmos' } });
  
      await productController.insertProduct(req, res);
      
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ message: { id: 1, name: 'Anaklusmos' } });
    });
  
    it('Retorna um erro caso o nome tenha um tamanho menor que 5', async function () {
      const res = {
        body: {
          name: ''
        }
      };
      const req = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(productService, 'newProduct').resolves({ type: 422, message: '"name" length must be at least 5 characters long' });
  
      await productController.insertProduct(req, res);
      
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  
    it('Retorna um erro caso o campo name não seja informado', async function () {
      const res = {
        body: {}
      };
      const req = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(productService, 'newProduct').resolves({ type: 400, message: '"name" is required' });
  
      await productController.insertProduct(req, res);
      
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});