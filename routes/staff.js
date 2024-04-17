const router = require('express').Router();
const staffController = require('../controllers/staff');
const { auth } = require('../utils/auth');

router.get('/', auth, staffController.getAllStaff);
router.get('/:id', auth, staffController.getStaffById);
router.post('/',auth, staffController.addStaff);
router.put('/:id', auth, staffController.updateStaff);
router.delete('/:id', auth, staffController.deleteStaff);
// get staff by username
router.get('/username/:username', auth, staffController.getStaffByUsername);
module.exports = router;

