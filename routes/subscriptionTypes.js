const router = require('express').Router();
const subscriptionTypesController = require('../controllers/subscriptionTypes');
const { auth } = require('../middleware/auth');

router.get('/', auth, subscriptionTypesController.getAllSubscriptionTypess);
router.get('/:id', auth, subscriptionTypesController.getSubscriptionTypesById);
router.post('/', auth, subscriptionTypesController.createSubscriptionTypes);
router.put('/:id', auth, subscriptionTypesController.updateSubscriptionTypes);
router.delete('/:id', auth, subscriptionTypesController.deleteSubscriptionTypes);
module.exports = router;

