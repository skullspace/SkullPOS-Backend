const router = require('express').Router();
const customerController = require('../controllers/customers');
const { auth } = require('../utils/auth');

router.get('/', auth, customerController.getAllCustomers);
router.get('/:id', auth, customerController.getCustomerById);
router.post('/', auth, customerController.addCustomer);
router.put('/:id', auth, customerController.updateCustomer);
router.delete('/:id', auth, customerController.deleteCustomer);
module.exports = router;
