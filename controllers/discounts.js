const db = require('../db');

module.exports = {
    getAllDiscounts: (req, res) => {
        (async () => {
            try {
                const discounts = await db.query('SELECT * FROM discounts');
                res.json(discounts.rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    getDiscountById: (req, res) => {
        (async () => {
            try {
                const discount = await db.query('SELECT * FROM discounts WHERE id = $1', [req.params.id]);
                res.json(discount.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    addDiscount: (req, res) => {
        (async () => {
            try {
                const { discount_name, percentage, description, role_id } = req.body;
                const newDiscount = await db.query('INSERT INTO discounts (discount_name, percentage, description, role_id) VALUES ($1, $2, $3, $4) RETURNING *', [discount_name, percentage, description, role_id]);
                res.json(newDiscount.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    updateDiscount: (req, res) => {
        (async () => {
            try {
                const { discount_name, percentage, description, role_id } = req.body;
                const updatedDiscount = await db.query('UPDATE discounts SET discount_name = $1, percentage = $2, description = $3, role_id = $4 WHERE id = $5 RETURNING *', [discount_name, percentage, description, role_id, req.params.id]);
                res.json(updatedDiscount.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    deleteDiscount: (req, res) => {
        (async () => {
            try {
                await db.query('DELETE FROM discounts WHERE id = $1', [req.params.id]);
                res.json({ message: 'Discount deleted' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    }
}
