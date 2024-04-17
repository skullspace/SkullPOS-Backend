const router = require('express').Router();
const terminalsController = require('../controllers/terminals');
const auth = require('../utils/auth');

router.get('/', terminalsController.getAllTerminals);
router.get('/:id', terminalsController.getTerminalById);
router.post('/', terminalsController.addTerminal);
router.put('/:id', terminalsController.updateTerminal);
router.delete('/:id', terminalsController.deleteTerminal);

module.exports = router;
