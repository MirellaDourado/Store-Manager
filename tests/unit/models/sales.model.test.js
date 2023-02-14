const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSales, insertedSale } = require('./sales.model.mock');

describe('Verificando camada model de sales', function () {
  describe('Testando o GET', function () {
    it('Recupera toda a lista de sales', async function () {
      sinon.stub(connection, 'execute').resolves([allSales]);

      const saleList = await salesModel.findSales();

      expect(saleList).to.be.deep.equal(allSales);
    });
    it('Recupera uma venda por um ID específico', async function () {
      sinon.stub(connection, 'execute').resolves([allSales[1]]);

      const secondSale = await salesModel.findById(2);
      
      expect(secondSale).to.be.deep.equal(allSales[1]);
    });
  });

  describe('Testando o POST', function () {
    it('Insere um novo produto', async function () {
      sinon.stub(connection, 'execute').resolves(insertedSale);
      
      const product = await salesModel.registerSaleProduct({ id: 1, sales: insertedSale })
      
      expect(product).to.be.deep.equal({ id: 1, itemsSold: insertedSale });
    });
  });

  afterEach(() => {
    sinon.restore();
  })
})
