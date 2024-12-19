const request = require('supertest');
const app = require('../../../src/app');
const { Supplier } = require("../../../src/models/supplier");

jest.mock('../../../src/models/supplier') // Mock the category model

describe('Suppliers API', () => {
  describe('GET /api/suppliers', () => {
    it('should get all suppliers', async () => {
        Supplier.aggregate.mockResolvedValue([{ name: "TechSupplier" }]);

        const response = await request(app).get('/api/suppliers');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0].name).toBe('TechSupplier');
    });

    it('should handle errors', async () => {
        Supplier.aggregate.mockRejectedValue(new Error("Database error"));

        const response = await request(app).get('/api/suppliers');
        expect(response.status).toBe(500);
    });
  });

  describe('GET /api/suppliers/:supplierId', () => { 
    it('should get a supplier by ID', async () => {
      Supplier.findOne.mockResolvedValue({ name: 'TechSupplier' }); // Mock the findOne method
      
      const response = await request(app).get('/api/suppliers/1'); 
      expect(response.status).toBe(200); 
      expect(response.body.name).toBe('TechSupplier');
    });

    it('should handle errors', async () => {
      Supplier.findOne.mockRejectedValue(new Error('Database error')); // Mock an error

      const response = await request(app).get('/api/suppliers/1'); 
      expect(response.status).toBe(500);
    }); 
  });
});