const request = require('supertest');
const app = require('../../../src/app');
const { InventoryItem } = require('../../../src/models/inventoryItem');

jest.mock('../../../src/models/inventoryItem'); // Mock the InventoryItem model

// Test API to create an inventory item
describe('CreateInventoryItem API', () => {
  // Unit test 1: should create an inventory item successfully.
  it('should create an inventory item successfully', async () => {
    InventoryItem.prototype.save.mockResolvedValue({ _id: '507f1f77bcf86cd799439011' }); // Mock the save method
    
    const response = await request(app).post('/api/createInventoryItem').send({
      categoryId: 1000,
      supplierId: 1,
      name: 'MacBook Air 13.6 Laptop',
      description: 'M2 chip Built for Apple Intelligence - 8GB Memory - 256GB SSD - Midnight',
      quantity: 13,
      price: 749.99
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Inventory Item created successfully');
  });

  // Unit test 2: should return validation errors for invalid data.
  it('should return validation errors for invalid data', async () => {
    const response = await request(app).post('/api/createInventoryItem').send({
      categoryId: 1000,
      supplierId: 1,
      name: 'Ma',  // Invalid: too short
      description: 'M2 chip Built for Apple Intelligence - 8GB Memory - 256GB SSD - Midnight',
      quantity: 13,
      price: 749.99
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('must NOT have fewer than 3 characters');
  });

  // Unit test 3: should return 404 for an invalid endpoint.
  it('should return 404 for an invalid endpoint', async () => {
    const response = await request(app).post('/api/create-item');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Not Found',
      status: 404,
      type: 'error'
    });
  });
});