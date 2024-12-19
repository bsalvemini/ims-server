const request = require('supertest');
const app = require('../../../src/app');
const { Category } = require("../../../src/models/category");

jest.mock('../../../src/models/category') // Mock the category model

describe('Categories API', () => {
  describe('GET /api/categories', () => {
    it('should get all categories', async () => {
        Category.aggregate.mockResolvedValue([{ name: "Electronics" }]);

        const response = await request(app).get('/api/categories');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0].name).toBe('Electronics');
    });

    it('should handle errors', async () => {
        Category.aggregate.mockRejectedValue(new Error("Database error"));

        const response = await request(app).get('/api/categories');
        expect(response.status).toBe(500);
    });
  });

  describe('GET /api/categories/:categoryId', () => { 
    it('should get a category by ID', async () => {
      Category.findOne.mockResolvedValue({ name: 'Electronics' }); // Mock the findOne method
      
      const response = await request(app).get('/api/categories/1000'); 
      expect(response.status).toBe(200); 
      expect(response.body.name).toBe('Electronics');
    });

    it('should handle errors', async () => {
      Category.findOne.mockRejectedValue(new Error('Database error')); // Mock an error

      const response = await request(app).get('/api/categories/1000'); 
      expect(response.status).toBe(500);
    }); 
  });
});