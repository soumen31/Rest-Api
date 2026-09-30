const express = require('express');
const productController = require('../controllers.js/productController');
const { protect, authorize } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', protect, productController.createProduct);
router.put('/:id', protect, authorize('admin', 'moderator'), productController.updateProduct);
router.delete('/:id', protect, authorize('admin'), productController.deleteProduct);

module.exports = router;
