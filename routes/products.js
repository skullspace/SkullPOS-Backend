const router = require('express').Router();
const productController = require('../controllers/product');
const { auth } = require('../middleware/auth');

router.get('/', auth, productController.getAllProduct);
router.get('/:id', auth, productController.getProductById);
router.post('/', auth, productController.addProduct);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);
module.exports = router;
