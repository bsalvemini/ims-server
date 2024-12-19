/**
 * Author: Brandon Salvemini
 * Date: 12/2/2024
 * File: readInventoryItemById.spec.js
 * Description: Tests for read an inventory item by ID API
 */

const request = require('supertest');
const app = require('../../../src/app');
const { InventoryItem } = require('../../../src/models/inventoryItem');

jest.mock('../../../src/models/inventoryItem') // Mock the inventory item model

describe('Read an inventory item by ID API', () => {
    it('should get an inventory item for a given ID', async () => {
        InventoryItem.findById.mockResolvedValue({ // Mock the findById method
            "_id": "674752ac6db561ba71c1ab86",
            "categoryId": 1000,
            "supplierId": 1,
            "name": "Laptop",
            "description": "A cool gaming laptop",
            "quantity": 6,
            "price": 599.99,
            "dateCreated": "2021-01-01T00:00:00.000Z",
            "dateModified": "2021-01-30T09:45:13.000Z"
          });

          const response = await request(app).get('/api/itemById/674752ac6db561ba71c1ab86');
          expect(response.status).toBe(200);
          expect(response.body._id).toBe('674752ac6db561ba71c1ab86');
    });

    it('should handle errors', async () => {
        InventoryItem.findById.mockRejectedValue(new Error("Database error")); // Mock an error

        const response = await request(app).get('/api/itemById/674752ac6db561ba71c1ab86');
        expect(response.status).toBe(500);
    });

    it('should return 200 with an empty array if no item is found for the given ID', async () => {
        InventoryItem.findById.mockResolvedValue({}); // Mock the findById method

        const response = await request(app).get('/api/itemById/674752ac6db561ba71c1ac85');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({});
    });

});