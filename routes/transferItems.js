const router = require('express').Router();
const transferItemsController = require('../controllers/transferItems');
const { auth } = require('../utils/auth');

router.get('/', auth, transferItemsController.getAllTransferItems);
router.get('/:id', auth, transferItemsController.getTransferItemById);
router.post('/', auth, transferItemsController.addTransferItem);
router.put('/:id', auth, transferItemsController.updateTransferItem);
router.delete('/:id', auth, transferItemsController.deleteTransferItem);
module.exports = router;
