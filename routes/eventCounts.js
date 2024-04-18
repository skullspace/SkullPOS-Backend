const router = require('express').Router();
const eventCountController = require('../controllers/eventCounts');
const {auth} = require('../utils/auth');

router.get('/', auth, eventCountController.getAllEventCounts);
router.get('/:id', auth, eventCountController.getEventCountById);
router.post('/', auth, eventCountController.addEventCount);
router.put('/:id', auth, eventCountController.updateEventCount);
router.delete('/:id', auth, eventCountController.deleteEventCount);
module.exports = router;

