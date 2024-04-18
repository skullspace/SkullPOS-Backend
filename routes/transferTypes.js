const router = exmiddlewarepress.Router();
const transferTypesController = require('../controllers/transferTypes');
const { auth} = require('../utils/auth');

router.get('/', auth, transferTypesController.getAllTransferTypes);
router.get('/:id', auth, transferTypesController.getTransferTypeById);
router.post('/', auth, transferTypesController.addTransferType);
router.put('/:id', auth, transferTypesController.updateTransferType);
router.delete('/:id', auth, transferTypesController.deleteTransferType);
module.exports = router;
