const router = express.router();
const transferController = require('../controllers/transfers');
const { auth } = require('../utils/auth');

router.get('/', auth, transferController.getAllTransfers);
router.get('/:id', auth, transferController.getTransferById);
router.post('/', auth, transferController.addTransfer);
router.put('/:id', auth, transferController.updateTransfer);
router.delete('/:id', auth, transferController.deleteTransfer);
module.exports = router;
