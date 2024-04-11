const db = require('../db');

module.exports = {
    getAllTransactionStatus: (req, res) => {
        (async () => {
            try {
                const transactionStatus = await db.query('SELECT * FROM transaction_status');
                res.json(transactionStatus.rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    getTransactionStatusById: (req, res) => {
        (async () => {
            try {
                const transactionStatus = await db.query('SELECT * FROM transaction_status WHERE id = $1', [req.params.id]);
                res.json(transactionStatus.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    addTransactionStatus: (req, res) => {
        (async () => {
            try {
                const { status_name } = req.body;
                const newTransactionStatus = await db.query('INSERT INTO transaction_status (status_name) VALUES ($1) RETURNING *', [status_name]);
                res.json(newTransactionStatus.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    updateTransactionStatus: (req, res) => {
        (async () => {
            try {
                const { status_name } = req.body;
                const updatedTransactionStatus = await db.query('UPDATE transaction_status SET status_name = $1 WHERE id = $2 RETURNING *', [status_name, req.params.id]);
                res.json(updatedTransactionStatus.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    deleteTransactionStatus: (req, res) => {
        (async () => {
            try {
                await db.query('DELETE FROM transaction_status WHERE id = $1', [req.params.id]);
                res.json({ message: 'Transaction status deleted' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    }
}
