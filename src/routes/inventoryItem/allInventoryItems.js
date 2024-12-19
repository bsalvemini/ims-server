const express = require('express');
const router = express.Router();
const { InventoryItem } = require('../../models/inventoryItem');

// API to list all inventory items
router.get('/', async(req, res, next) => {
    try {
        const inventoryItems = await InventoryItem.aggregate([
            {
              '$lookup': {
                'from': 'categories', 
                'localField': 'categoryId', 
                'foreignField': 'categoryId', 
                'as': 'categoryDetails'
              }
            }, {
              '$lookup': {
                'from': 'suppliers', 
                'localField': 'supplierId', 
                'foreignField': 'supplierId', 
                'as': 'supplerDetails'
              }
            }, {
              '$addFields': {
                'categoryDetails': {
                  '$arrayElemAt': [
                    '$categoryDetails', 0
                  ]
                }
              }
            }, {
              '$addFields': {
                'supplerDetails': {
                  '$arrayElemAt': [
                    '$supplerDetails', 0
                  ]
                }
              }
            }
          ])
        console.log('inventoryItems: ', inventoryItems);
        res.send(inventoryItems);
    } catch (err) {
       console.error(`Error retrieving inventory items: ${err}`);
       next(err);
    }
});

module.exports = router;