const request = require('supertest');
const app = require('../../../src/app');
const { InventoryItem } = require("../../../src/models/inventoryItem")

jest.mock('../../../src/models/inventoryItem') // Mock the inventory item model

describe('Search Inventory Items API', () => {
  // Unit test 1: should get an inventory item.
  it('should get an inventory item', async () => {
    InventoryItem.aggregate.mockResolvedValue([{ name: "Laptop" }]);

    const response = await request(app).get('/api/searchItems?name=Laptop');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].name).toBe('Laptop')
  });

  // Unit test 2: should get the categoryDetails and supplerDetails of an inventory item.
  it('should get the categoryDetails and supplerDetails', async () => {
    InventoryItem.aggregate.mockResolvedValue([
      {
        _id: '67547feb4dcf93328696c978',
        categoryId: 1000,
        supplierId: 1,
        name: "ThinkPad T490 Lenovo Laptop",
        description: "14.0 FHD (1920 x 1080) 250 nits",
        quantity: 15,
        price: 249.99,
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
      }
    ]);

    const response = await request(app).get('/api/searchItems?name=Laptop');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].categoryDetails).toBeTruthy();
    expect(response.body[0].supplerDetails).toBeTruthy();
  });

  // Unit test 3: should handle errors.
  it('should handle errors', async () => {
    InventoryItem.aggregate.mockRejectedValue(new Error("Database error."));

    const response = await request(app).get('/api/searchItems');
    expect(response.status).toBe(500);
  });
});