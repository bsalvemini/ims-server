const express = require('express');
const router = express.Router();
const { Supplier } = require('../../models/supplier');

/**
 * @description
 *
 * GET /
 *
 * Fetches a list of suppliers.
 *
 * Example:
 * fetch('/suppliers')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/', async(req, res, next) => {
  try {
    const suppliers = await Supplier.aggregate([
      {
        $group: {
          _id: '$supplierId',
          supplierName: { $first: '$supplierName' }
        }
      },
      {
        $project: {
          _id: 0,
          supplierId: '$_id', 
          supplierName: '$supplierName'
        }
      }
    ]);
    res.send(suppliers);
  } catch (err) {
    console.error('Error getting suppliers', err);
    next(err);
  }
});

/**
 * @description
 *
 * GET /:supplierId
 *
 * Fetch a supplier name.
 *
 * Example:
 * fetch('/suppliers/:supplierId')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/:supplierId', async(req, res, next) => {
  try {
    const supplier = await Supplier.findOne({supplierId: req.params.supplierId});
    res.send(supplier);
  } catch (err) {
    console.error('Error getting supplier', err);
    next(err);
  }
});

module.exports = router;