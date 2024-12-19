/**
 * Author: Diana Ruiz Garcia
 * Date: 12/02/2024
 * File: updateInventoryItem.js
 * Description: IMS API for update an inventory item
 */

'use strict';

const express = require('express');
const Ajv = require('ajv');
const createError = require('http-errors');
const router = express.Router();
const { InventoryItem } = require('../../models/inventoryItem');
const { updateInventoryItemSchema } = require('../../schemas/inventoryItemSchemas');
const { ObjectId } = require('mongodb');

const ajv = new Ajv();
const validateUpdateInventoryItem = ajv.compile(updateInventoryItemSchema);

router.patch('/:itemId', async (req, res, next) => {
  try {
    const inventoryItemId = ObjectId.createFromHexString(req.params.itemId);
    const inventoryItem = await InventoryItem.findOne({ _id: inventoryItemId });
    const valid = validateUpdateInventoryItem(req.body);

    if (!valid) {
      return next(createError(400, ajv.errorsText(validateUpdateInventoryItem.errors)));
    }

    inventoryItem.set({
      categoryId: req.body.categoryId,
      supplierId: req.body.supplierId,
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
      dateModified: req.body.dateModified
    });

    await inventoryItem.save();

    res.send({
      message: 'Inventory item updated successfully',
      id: inventoryItem._id
    });
  } catch (err) {
    console.error(`Error while updating inventory item: ${err}`);
    next(err);
  }
});

module.exports = router;