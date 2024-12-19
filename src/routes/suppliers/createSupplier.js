/**
 * Author: Diana Ruiz Garcia
 * Date: 12/16/2024
 * File: createSupplier.js
 * Description: IMS API for create a new supplier
 */

'use strict';

const express = require('express');
const Ajv = require('ajv');
const createError = require('http-errors');
const router = express.Router();
const { Supplier } = require('../../models/supplier');
const { createSupplierSchema } = require('../../schemas/supplierSchemas');

const ajv = new Ajv();
const validateCreateSupplier = ajv.compile(createSupplierSchema); // Add validation to the createSupplier endpoint.

router.post('/', async (req, res, next) => {
  try {
    const valid = validateCreateSupplier(req.body);

    if (!valid) {
      return next(createError(400, ajv.errorsText(validateCreateSupplier.errors)));
    }

    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    
    res.send({
      message: 'Supplier created successfully',
      supplierId: newSupplier.supplierId
    })
  } catch (err) {
    console.error(`Error while creating supplier: ${err}`);
    next(err);
  }
});

module.exports = router;