const router = require('express').Router();
const customerController = require('../controllers/customer');
const { auth } = require('../middleware/auth');

router.get('/', auth, customerController.getAllCustomer);
router.get('/:id', auth, customerController.getCustomerById);
router.post('/', auth, customerController.addCustomer);
router.put('/:id', auth, customerController.updateCustomer);
router.delete('/:id', auth, customerController.deleteCustomer);
module.exports = router;
