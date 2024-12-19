/**
 * Author: Diana Ruiz Garcia
 * Date: 12/09/2024
 * File: searchInventoryItem.js
 * Description: IMS API for search an inventory item
 */

'use strict';

const express = require('express');
const router = express.Router();
const { InventoryItem } = require('../../models/inventoryItem');

router.get('/', async (req, res, next) => {
  try {
    const { name } = req.query;

    // Check if the name has no values
    if (name === '') name = null;

    // Execute the search
    const inventoryItems = await InventoryItem.aggregate([
      {
        '$match': { 'name' : { $regex: name, $options: "i" } }
      },
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
    ]);
    res.send(inventoryItems); // Respond with the data
  } catch (error) {
    console.error(`Error while searching inventory items: ${error.message}`);
    next(error);
  }
});

module.exports = router;
