/**
 * Author: Brandon Salvemini
 * Date: 12/14/2024
 * File: allSuppliers.js
 * Description: Route file for listing all supplier data
 */
'use strict';

const express = require('express');
const router = express.Router();
const { Supplier } = require('../../models/supplier');


/**
 * @description
 *
 * GET /all
 *
 * Fetches a list of all suppliers with all fields from the database
 *
 * Example:
 * fetch('/suppliers/all')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/', async(req, res, next) => {
    try {
        const allSuppliers = await Supplier.find({})
        res.send(allSuppliers);
    } catch (err) {
        console.error('Error getting all suppliers: ', err);
        next(err);
    }
});


module.exports = router;