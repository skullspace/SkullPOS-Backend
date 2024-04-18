const router = require('express').Router();
const eventController = require('../controllers/events');
const { auth } = require('../utils/auth');

router.get('/', auth, eventController.getAllEvents);
router.get('/:id', auth, eventController.getEventById);
router.post('/', auth, eventController.addEvent);
router.put('/:id', auth, eventController.updateEvent);
router.delete('/:id', auth, eventController.deleteEvent);
module.exports = router;
