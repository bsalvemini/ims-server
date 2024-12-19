const request = require('supertest');
const app = require('../../../src/app');
const { Supplier } = require('../../../src/models/supplier');

jest.mock('../../../src/models/supplier'); // Mock the Supplier model

// Test API to create a supplier
describe('CreateSupplier API', () => {
  // Unit test 1: should create a supplier successfully.
  it('should create a supplier successfully', async () => {
    Supplier.prototype.save.mockResolvedValue({ _id: '507f1f77bcf86cd799439011' }); // Mock the save method
    
    const response = await request(app).post('/api/createSupplier').send({
      supplierName: 'Apple',
      contactInformation: '800-275-2273',
      address: '10600 N Tantau Ave'
    });

    console.log('response', response.body.message);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Supplier created successfully');
  });

  // Unit test 2: should return validation errors for invalid data.
  it('should return validation errors for invalid data', async () => {
    const response = await request(app).post('/api/createSupplier').send({
      supplierName: 'Ap', // Too short
      contactInformation: '(800) 275-2273', // Invalid format
      address: '10600 N Tantau Ave'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('must NOT have fewer than 3 characters');
  });

  // Unit test 3: should return 404 for an invalid endpoint.
  it('should return 404 for an invalid endpoint', async () => {
    const response = await request(app).post('/api/create-supplier');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Not Found',
      status: 404,
      type: 'error'
    });
  });
});