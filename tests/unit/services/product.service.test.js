const { expect } = require('chai');
const sinon = require('sinon');

const { allProducts } = require('./product.service.mock');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');

describe('Verificando service de products', function () {
  it('retorna a lista completa de todos os produtos', async function () {
    sinon.stub(productModel, 'findAll').resolves(allProducts);
    
    const result = await productService.findAll();

    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allProducts);
  });

  it('retorna a lista completa de todos os produtos', async function () {
    sinon.stub(productModel, 'findById').resolves([[allProducts[1]]]);
    
    const result = await productService.findById(2);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal([[allProducts[1]]]);
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });