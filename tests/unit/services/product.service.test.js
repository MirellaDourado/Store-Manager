const { expect } = require('chai');
const sinon = require('sinon');

const { allProducts } = require('./product.service.mock');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');

describe('Verificando camada service de products', function () {
  describe('Testando o GET', function () {
    it('Retorna a lista completa de todos os produtos', async function () {
      sinon.stub(productModel, 'findAll').resolves(allProducts);
      
      const result = await productService.findAll();
  
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  
    it('Retorna um produto pelo id', async function () {
      sinon.stub(productModel, 'findById').resolves([[allProducts[1]]]);
      
      const result = await productService.findById(2);
  
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal([[allProducts[1]]]);
    });

    it('Retorna um erro caso o produto não seja encontrado', async function () {
      sinon.stub(productModel, 'findById').resolves({ message: 'Product not found' });
      
      const result = await productService.findById(100);
  
      expect(result.type).to.be.equal(404);
      expect(result.message).to.deep.equal('Product not found');
    });
  });

  describe('Testando o POST', function () {
    it('Insere um novo produto com sucesso', async function () {
      sinon.stub(productModel, 'insert').resolves({ id: 1, name: 'Anaklusmos'})

      const result = await productService.newProduct(2);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal({ id: 1, name: 'Anaklusmos'});
    })
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });