const router = require('express').Router();
const subscriptionTypesController = require('../controllers/subscriptionTypes');
const { auth } = require('../middleware/auth');

router.get('/', auth, subscriptionTypesController.getAllSubscriptionTypes);
router.get('/:id', auth, subscriptionTypesController.getSubscriptionTypeById);
router.post('/', auth, subscriptionTypesController.addSubscriptionType);
router.put('/:id', auth, subscriptionTypesController.updateSubscriptionType);
router.delete('/:id', auth, subscriptionTypesController.deleteSubscriptionType);
module.exports = router;

