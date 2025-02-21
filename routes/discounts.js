const router = require('express').Router();
const discountController = require('../controllers/discounts');
const { auth } = require('../utils/auth');

router.get('/', auth, discountController.getAllDiscounts);
router.get('/:id', auth, discountController.getDiscountById);
router.post('/', auth, discountController.addDiscount);
router.put('/:id', auth, discountController.updateDiscount);
router.delete('/:id', auth, discountController.deleteDiscount);
module.exports = router;
