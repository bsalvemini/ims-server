const express = require('express');
const router = express.Router();
const { Category } = require('../../models/category');

/**
 * @description
 *
 * GET /
 *
 * Fetches a list of categories.
 *
 * Example:
 * fetch('/categories')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/', async(req, res, next) => {
  try {
    const categories = await Category.aggregate([
      {
        $group: {
          _id: '$categoryId',
          categoryName: { $first: '$categoryName' }
        }
      },
      {
        $project: {
          _id: 0,
          categoryId: '$_id', 
          categoryName: '$categoryName'
        }
      }
    ]);
    res.send(categories);
  } catch (err) {
    console.error('Error getting categories', err);
    next(err);
  }
});

/**
 * @description
 *
 * GET /:categoryId
 *
 * Fetch a category name.
 *
 * Example:
 * fetch('/categories/:categoryId')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/:categoryId', async(req, res, next) => {
  try {
    const category = await Category.findOne({categoryId: req.params.categoryId});
    res.send(category);
  } catch (err) {
    console.error('Error getting category', err);
    next(err);
  }
});

module.exports = router;