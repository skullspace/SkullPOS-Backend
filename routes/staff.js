const router = require('express').Router();
const transactionController = require('../controllers/staff');
const { auth } = require('../middleware/auth');

router.get('/', auth, transactionController.getAllStaff);
router.get('/:id', auth, transactionController.getStaffById);
router.post('/', auth, transactionController.addStaff);
router.put('/:id', auth, transactionController.updateStaff);
router.delete('/:id', auth, transactionController.deleteStaff);
module.exports = router;

