const express = require('express');
const router = express.Router();

const {
  getProducts,
  addProduct,
  getProductById,
  deleteProduct,
  updateProduct
} = require('../controllers/productController');

// ✅ Correct RESTful routes
router.get('/', getProducts);            // get all products
router.post('/', addProduct);            // add product
router.get('/:id', getProductById);      // get product by id
router.put('/:id', updateProduct);       // update product by id
router.delete('/:id', deleteProduct);    // delete product by id

module.exports = router;
