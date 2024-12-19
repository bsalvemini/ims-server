/**
 * Author: Brandon Salvemini
 * Date: 12/15/2024
 * File: allSuppliers.spec.js
 * Description: Test file for listing all supplier data API
 */

const request = require('supertest');
const app = require('../../../src/app');
const { Supplier } = require('../../../src/models/supplier');

jest.mock('../../../src/models/supplier') // Mock the supplier model

describe('List all suppliers API', () => {
    it('should get all suppliers', async () => {
        Supplier.find.mockResolvedValue([{supplierName: 'TechSupplier'}])

        const response = await request(app).get('/api/suppliers/all');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0].supplierName).toBe('TechSupplier');
    });

    it('should handle errors', async () => {
        Supplier.find.mockRejectedValue(new Error("Database error"));

        const response = await request(app).get('/api/suppliers/all');
        expect(response.status).toBe(500);
    });

    it('should return all supplier fields from the database', async () => {
        const supplierFields = ["_id", "supplierId", "supplierName", "contactInformation", "address", "dateCreated", "dateModified"];

        const mockSuppilers = [
            {
              "_id": "650c1f1e1c9d440000a1b1c1",
              "supplierId": 1,
              "supplierName": "TechSupplier",
              "contactInformation": "123-456-7890",
              "address": "123 Tech Street",
              "dateCreated": "2021-01-01T00:00:00.000Z",
              "dateModified": "2021-01-01T00:00:00.000Z"
            },
            {
              "_id": "67540039030e05e5ee39579c",
              "supplierId": 2,
              "supplierName": "Koblenz",
              "contactInformation": "800-548-5741",
              "address": "P.O. Box 18363",
              "dateCreated": "2021-01-01T00:00:00.000Z",
              "dateModified": "2021-01-01T00:00:00.000Z"
            }
          ]
          
          Supplier.find.mockResolvedValue(mockSuppilers);

          const response = await request(app).get('/api/suppliers/all');
          expect(response.status).toBe(200);
          expect(Object.keys(response.body[0])).toEqual(supplierFields);
    });
});