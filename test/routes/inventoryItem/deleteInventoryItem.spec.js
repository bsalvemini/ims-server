/**
 * Author: Brandon Salvemini
 * Date: 12/9/2024
 * File: deleteInventoryItem.spec.js
 * Description: Tests for delete an inventory item
 */

const request = require('supertest');
const app = require('../../../src/app');
const createError = require('http-errors');
const { InventoryItem } = require("../../../src/models/inventoryItem");

jest.mock('../../../src/models/inventoryItem') // Mock the inventory item model

describe('Delete Inventory Item API', () => {
    it('should delete an item with a given id', async () => {
        InventoryItem.deleteOne.mockResolvedValue({
            message: 'Item deleted successfully',
            _id: '67579e6fc2da955ae28b760b'
        });

        const response = await request(app).delete('/api/deleteItem/67579e6fc2da955ae28b760b');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Item deleted successfully');
        expect(response.body._id).toBe('67579e6fc2da955ae28b760b');
    });
    
    it('should not delete an item with an invalid ID', async () => {
        InventoryItem.deleteOne.mockRejectedValue(createError(400, 'No items were deleted. Make sure you are using a valid item ID.'));

        const response = await request(app).delete('/api/deleteItem/67579e6fc2da955ae28b789b');

        console.log(response)
        expect(response.status).toBe(400);
        expect(response.body.type).toBe('error');
        expect(response.body.message).toBe('No items were deleted. Make sure you are using a valid item ID.');
        
    });

    it('should handle errors', async () => {
        InventoryItem.deleteOne.mockRejectedValue(new Error('Database error'));

        const response = await request(app).delete('/api/deleteItem/67579e6fc2da955ae28b760b');
        expect(response.status).toBe(500);
    });

});
