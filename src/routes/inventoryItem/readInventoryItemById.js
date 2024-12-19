/**
 * Author: Brandon Salvemini
 * Date: 12/2/2024
 * File: readInventoryItemById.js
 * Description: Route file for reading an inventory item by ID
 */
'use strict';

const express = require('express');
const router = express.Router();
const { InventoryItem } = require('../../models/inventoryItem');

// API to read an inventory item by ID
router.get('/:itemId', async(req, res, next) => {
    // Get the ID from the request parameters
    const { itemId } = req.params;
    console.log(itemId)

    try {
        const inventoryItemForId = await InventoryItem.findById(itemId); // Find item with the given ID
        console.log(`Inventory item for ID ${itemId}: ${inventoryItemForId}`);

        // If inventoryItemForId is equal to null
        // This is done to return an empty object instead of nothing if inventoryItemForId is equal to null
        if (inventoryItemForId === null) { 
            res.send({}); // Send an empty object.
            return;
        }
        res.send(inventoryItemForId) // Respond with the data
    } catch (err) {
        console.error(`Error retrieving inventory item for ID ${itemId}: ${err}`);
        next(err);
    }
})

module.exports = router;