const db = require('../db');

module.exports = {
    getAllTransactionTypes: (req, res) => {
        (async () => {
            try {
                const transactionTypes = await db.query('SELECT * FROM transaction_types');
                res.json(transactionTypes.rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    getTransactionTypeById: (req, res) =>{
        (async () => {
            try {
                const transactionType = await db.query('SELECT * FROM transaction_types WHERE id = $1', [req.params.id]);
                res.json(transactionType.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    addTransactionType: (req, res) => {
        (async () => {
            try {
                const { type_name } = req.body;
                const newTransactionType = await db.query('INSERT INTO transaction_types (type_name) VALUES ($1) RETURNING *', [type_name]);
                res.json(newTransactionType.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    updateTransactionType: (req, res) => {
        (async () => {
            try {
                const { type_name } = req.body;
                const updatedTransactionType = await db.query('UPDATE transaction_types SET type_name = $1 WHERE id = $2 RETURNING *', [type_name, req.params.id]);
                res.json(updatedTransactionType.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    deleteTransactionType: (req, res) => {
        (async () => {
            try {
                await db.query('DELETE FROM transaction_types WHERE id = $1', [req.params.id]);
                res.json({ message: 'Transaction Type deleted' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    }
}
