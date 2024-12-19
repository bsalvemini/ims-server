/**
 * Author: Diana Ruiz Garcia
 * Date: 12/01/2024
 * File: createInventoryItem.js
 * Description: IMS api for create a new inventory item
 */

'use strict';

const express = require('express');
const Ajv = require('ajv');
const createError = require('http-errors');
const router = express.Router();
const { InventoryItem } = require('../../models/inventoryItem');
const { addInventoryItemSchema } = require('../../schemas/inventoryItemSchemas');

const ajv = new Ajv();
const validateAddInventoryItem = ajv.compile(addInventoryItemSchema);

router.post('/', async (req, res, next) => {
  try {
    const valid = validateAddInventoryItem(req.body);

    if (!valid) {
      return next(createError(400, ajv.errorsText(validateAddInventoryItem.errors)));
    }

    const newInventoryItem = new InventoryItem(req.body);
    await newInventoryItem.save();
    
    res.send({
      message: 'Inventory Item created successfully',
      name: newInventoryItem.name
    })
  } catch (err) {
    console.error(`Error while creating inventory item: ${err}`);
    next(err);
  }
});

module.exports = router;
