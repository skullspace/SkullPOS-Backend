const router = require('express').Router();
const productController = require('../controllers/products');
const { auth } = require('../middleware/auth');

router.get('/', auth, productController.getAllProducts);
router.get('/:id', auth, productController.getProductById);
router.post('/', auth, productController.addProduct);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);
module.exports = router;
