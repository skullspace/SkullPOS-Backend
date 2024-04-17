const router = require('express').Router();
const rolesController = require('../controllers/roles');
const { auth } = require('../utils/auth');

router.get('/', auth, rolesController.getAllRoles);
router.get('/:id', auth, rolesController.getRoleById);
router.post('/', auth, rolesController.addRole);
router.put('/:id', auth, rolesController.updateRole);
router.delete('/:id', auth, rolesController.deleteRole);
module.exports = router;

