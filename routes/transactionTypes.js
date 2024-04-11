const router = require('express').Router();
const transactionTypesController = require('../controllers/transactionTypes');
const { auth } = require('../middleware/auth');

router.get('/', auth, transactionTypesController.getAllTransactionTypes);
router.get('/:id', auth, transactionTypesController.getTransactionTypeById);
router.post('/', auth, transactionTypesController.addTransactionType);
router.put('/:id', auth, transactionTypesController.updateTransactionType);
router.delete('/:id', auth, transactionTypesController.deleteTransactionType);

module.exports = router;

