const db = require('../db');

module.exports = {
    getAllSubscriptions: (req, res) => {
        (async () => {
            try {
                const subscriptions = await db.query('SELECT * FROM subscriptions');
                res.json(subscriptions.rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    getSubscriptionById: (req, res) => {
        (async () => {
            try {
                const subscription = await db.query('SELECT * FROM subscriptions WHERE id = $1', [req.params.id]);
                res.json(subscription.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    addSubscription: (req, res) => {
        (async () => {
            try {
                const { customer_id, type_id, cost } = req.body;
                const newSubscription = await db.query('INSERT INTO subscriptions (customer_id, type_id, cost) VALUES ($1, $2, $3) RETURNING *', [customer_id, type_id, cost]);
                res.json(newSubscription.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    updateSubscription: (req, res) => {
        (async () => {
            try {
                const { customer_id, type_id, cost } = req.body;
                const updatedSubscription = await db.query('UPDATE subscriptions SET customer_id = $1, type_id = $2, cost = $3 WHERE id = $4 RETURNING *', [customer_id, type_id, cost, req.params.id]);
                res.json(updatedSubscription.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    deleteSubscription: (req, res) => {
        (async () => {
            try {
                await db.query('DELETE FROM subscriptions WHERE id = $1', [req.params.id]);
                res.json({ message: 'Subscription deleted' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    }
}
