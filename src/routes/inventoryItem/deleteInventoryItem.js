/**
 * Author: Brandon Salvemini
 * Date: 12/9/2024
 * File: deleteInventoryItem.js
 * Description: Route file for deleting an inventory item
 */
'use strict';

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { InventoryItem } = require('../../models/inventoryItem');

// API to delete an inventory item
// The code for this API is loosely based on example 1 in this article
// slingacademy.com/article/understanding-mongoose-model-deleteone-method-with-examples/

router.delete('/:itemId', async(req, res, next) => {
    // Get the ID from the request parameters
    const { itemId } = req.params;
    console.log(itemId);

    try {
        const result = await InventoryItem.deleteOne({_id: itemId});
        console.log('result.deletedCount: ', result.deletedCount);
        
        if (result.deletedCount === 0) { // if deletedCount is zero, no document was deleted
            return next(createError(400, 'No item was deleted. Make sure you are using a valid item ID.'));
        }

        // Send response saying item deleted successfully, along with the item ID
        res.send({ 
            message: 'Item deleted successfully',
            _id: itemId
        });
        
    } catch (err) {
        console.error(`Error deleting item with ID ${itemId}: ${err}`);
        next(err);
    }
})

module.exports = router;