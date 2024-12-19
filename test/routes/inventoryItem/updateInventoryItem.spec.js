const request = require('supertest');
const app = require('../../../src/app');
const { InventoryItem } = require('../../../src/models/inventoryItem');
const { ObjectId } = require('mongodb');

jest.mock('../../../src/models/inventoryItem'); // Mock the InventoryItem model

// Test API to update an inventory item
describe('UpdateInventoryItem API', () => { 
  // Unit test 1: should update an inventory item successfully.
  it('should update an inventory item successfully', async () => {
    InventoryItem.findOne.mockResolvedValue({
      set: jest.fn(),
      save: jest.fn().mockResolvedValue({ inventoryItemId: new ObjectId("674e5ce5e703640d2ed2c7ca") })
    }); // Mock the findOne and save methods
      
    const response = await request(app).patch('/api/items/674e5ce5e703640d2ed2c7ca').send({
      categoryId: 1000,
      supplierId: 1,
      name: "XPS 13 Laptop",
      description: "Snapdragon® X Elite, X1E-80-100 (12 cores up to 3.4 GHz Dual-Core Boost up to 4 GHz, NPU integrated)",
      quantity: 10,
      price: 999.99
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Inventory item updated successfully');
  });

  // Unit test 2: should return validation errors for invalid data.
  it('should return validation errors for invalid data', async () => {
    const response = await request(app).patch('/api/items/674e5ce5e703640d2ed2c7ca').send({
      categoryId: 1000,
      supplierId: 1,
      name: "XP", // Invalid: too short
      description: "", // Invalid: empty
      quantity: 10,
      price: 999.99
    });
      
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('must NOT have fewer than 3 characters');
  });

  // Unit test 3: should return 500 for an invalid endpoint.
  it('should return 500 for an invalid endpoint', async () => {
    const response = await request(app).patch('/api/items/invalid-id');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: 'hex string must be 24 characters',
      type: 'error'
    });
  });
});