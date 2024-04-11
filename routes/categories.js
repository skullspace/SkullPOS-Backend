const router = require('express').Router();
const categories = require('../controllers/categories');
const { auth } = require('../middleware/auth');

router.get('/', auth, categories.getAllCategories);
router.get('/:id', auth, categories.getCategoryById);
router.post('/', auth, categories.createCategory);
router.put('/:id', auth, categories.updateCategory);
router.delete('/:id', auth, categories.deleteCategory);

module.exports = router;
