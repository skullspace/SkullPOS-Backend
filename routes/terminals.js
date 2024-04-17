const router = require('express').Router();
const terminalsController = require('../controllers/terminals');

const { auth } = require('../utils/auth');

router.get('/',auth, terminalsController.getAllTerminals);
router.get('/:id',auth, terminalsController.getTerminalById);
router.post('/', auth,terminalsController.addTerminal);
router.put('/:id',auth, terminalsController.updateTerminal);
router.delete('/:id',auth, terminalsController.deleteTerminal);

module.exports = router;
