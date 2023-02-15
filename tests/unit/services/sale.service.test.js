const { expect } = require('chai');
const sinon = require('sinon');

const { allSales } = require('./sale.service.mock');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

describe('Verificando camada service de products', function () {
  describe('Testando o GET', function () {
    it('Retorna a lista completa de todas as vendas', async function () {
      sinon.stub(salesModel, 'findSales').resolves(allSales);
      
      const result = await salesService.getAllSales();
  
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allSales);
    });

    it('Retorna uma venda com sucesso', async function () {
      sinon.stub(salesModel, 'findById').resolves([allSales[0]]);
      
      const result = await salesService.getSaleById(1);

      expect(result.type).to.be.equal(null)
      expect(result.message).to.deep.equal([allSales[0]]);
    });

    it('Retorna um erro caso o produto não seja encontrado', async function () {
      sinon.stub(salesModel, 'findById').resolves({ message: 'Sale not found' });
      
      const result = await salesService.getSaleById(9990);
      // console.log(result);
      expect(result.message).to.deep.equal({ message: 'Sale not found' });
    });
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });