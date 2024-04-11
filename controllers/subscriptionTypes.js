const db = require('../db');

module.exports = {
    getAllSubscriptionTypes: (req, res) => {
        (async () => {
            try {
                const subscriptionTypes = await db.query('SELECT * FROM subscription_types');
                res.json(subscriptionTypes.rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    getSubscriptionTypeById: (req, res) =>{
        (async () => {
            try {
                const subscriptionType = await db.query('SELECT * FROM subscription_types WHERE id = $1', [req.params.id]);
                res.json(subscriptionType.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    addSubscriptionType: (req, res) => {
        (async () => {
            try {
                const { type_name, cost, description } = req.body;
                const newSubscriptionType = await db.query('INSERT INTO subscription_types (type_name, cost, description) VALUES ($1, $2, $3) RETURNING *', [type_name, cost, description]);
                res.json(newSubscriptionType.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    updateSubscriptionType: (req, res) => {
        (async () => {
            try {
                const { type_name, cost, description } = req.body;
                const updatedSubscriptionType = await db.query('UPDATE subscription_types SET type_name = $1, cost = $2, description = $3 WHERE id = $4 RETURNING *', [type_name, cost, description, req.params.id]);
                res.json(updatedSubscriptionType.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    deleteSubscriptionType: (req, res) => {
        (async () => {
            try {
                await db.query('DELETE FROM subscription_types WHERE id = $1', [req.params.id]);
                res.json({ message: 'Subscription Type deleted' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    }
}
