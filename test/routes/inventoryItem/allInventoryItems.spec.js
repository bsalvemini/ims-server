const request = require('supertest');
const app = require('../../../src/app');
const { InventoryItem } = require("../../../src/models/inventoryItem")

jest.mock('../../../src/models/inventoryItem') // Mock the inventory item model

describe('List All Inventory Items API', () => {
    it('should get all inventory items', async () => {
        InventoryItem.aggregate.mockResolvedValue([{ name: "Laptop" }]);

        const response = await request(app).get('/api/items');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0].name).toBe('Laptop')
    });

    it('should handle errors', async () => {
        InventoryItem.aggregate.mockRejectedValue(new Error("Database error"));

        const response = await request(app).get('/api/items');
        expect(response.status).toBe(500);
    });

    it('should get the categoryDetails and supplerDetails', async () => {
        InventoryItem.aggregate.mockResolvedValue([
            {
              _id: '674752ac6db561ba71c1ab86',
              categoryId: 1000,
              supplierId: 1,
              name: 'Item 1',
              description: 'Item 1 description',
              quantity: 5,
              price: 699.99,
              dateCreated: '2021-01-01T00:00:00.000Z',
              dateModified: '2021-01-30T09:45:13.000Z',
              categoryDetails: {
                _id: '650c1f1e1c9d440000a1b1c1',
                categoryId: 1000,
                categoryName: 'Electronics',
                description: 'Electronic devices and gadgets',
                dateCreated: '2021-01-01T00:00:00.000Z',
                dateModified: '2021-01-01T00:00:00.000Z',
              },
              supplerDetails: {
                _id: '650c1f1e1c9d440000a1b1c1',
                supplierId: 1,
                supplierName: 'TechSupplier',
                contactInformation: '123-456-7890',
                address: '123 Tech Street',
                dateCreated: '2021-01-01T00:00:00.000Z',
                dateModified: '2021-01-01T00:00:00.000Z',
              },
            },
            {
              _id: '674753586db561ba71c1ab95',
              categoryId: 1000,
              supplierId: 1,
              name: 'Item 2',
              description: 'Item 2 description',
              quantity: 10,
              price: 1500,
              dateCreated: '2021-01-01T00:00:00.000Z',
              dateModified: '2021-01-01T00:00:00.000Z',
              categoryDetails: {
                _id: '650c1f1e1c9d440000a1b1c1',
                categoryId: 1000,
                categoryName: 'Electronics',
                description: 'Electronic devices and gadgets',
                dateCreated: '2021-01-01T00:00:00.000Z',
                dateModified: '2021-01-01T00:00:00.000Z',
              },
              supplerDetails: {
                _id: '650c1f1e1c9d440000a1b1c1',
                supplierId: 1,
                supplierName: 'TechSupplier',
                contactInformation: '123-456-7890',
                address: '123 Tech Street',
                dateCreated: '2021-01-01T00:00:00.000Z',
                dateModified: '2021-01-01T00:00:00.000Z',
              },
            },
          ]);

        const response = await request(app).get('/api/items');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0].categoryDetails).toBeTruthy();
        expect(response.body[0].supplerDetails).toBeTruthy();
    });

});