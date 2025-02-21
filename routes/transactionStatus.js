const router = require('express').Router();
const transactionStatusController = require('../controllers/transactionStatus');
const { auth } = require('../utils/auth');

router.get('/', auth, transactionStatusController.getAllTransactionStatus);
router.get('/:id', auth, transactionStatusController.getTransactionStatusById);
router.post('/', auth, transactionStatusController.addTransactionStatus);
router.put('/:id', auth, transactionStatusController.updateTransactionStatus);
router.delete('/:id', auth, transactionStatusController.deleteTransactionStatus);

module.exports = router;
