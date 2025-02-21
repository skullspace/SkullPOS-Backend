const router = require('express').Router();
const subscriptionController = require('../controllers/subscriptions');
const { auth } = require('../utils/auth');

router.get('/', auth, subscriptionController.getAllSubscriptions);
router.get('/:id', auth, subscriptionController.getSubscriptionById);
router.post('/', auth, subscriptionController.addSubscription);
router.put('/:id', auth, subscriptionController.updateSubscription);
router.delete('/:id', auth, subscriptionController.deleteSubscription);
module.exports = router;
