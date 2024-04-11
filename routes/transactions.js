const router = require('express').Router();
const transactionController = require('../controllers/transactions');
const { auth } = require('../middleware/auth');

router.get('/', auth, transactionController.getAllTransactions);
router.get('/:id', auth, transactionController.getTransactionById);
router.post('/', auth, transactionController.addTransaction);
router.put('/:id', auth, transactionController.updateTransaction);
router.delete('/:id', auth, transactionController.deleteTransaction);
module.exports = router;
