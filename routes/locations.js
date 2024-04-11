const router = require('express').Router();
const locationController = require('../controllers/location');
const { auth } = require('../middleware/auth');

router.get('/', auth, locationController.getAllLocations);
router.get('/:id', auth, locationController.getLocationById);
router.post('/', auth, locationController.createLocation);
router.put('/:id', auth, locationController.updateLocation);
router.delete('/:id', auth, locationController.deleteLocation);
module.exports = router;
