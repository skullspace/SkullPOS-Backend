const db = require('../db');

module.exports = {
    getAllTransactions: (req, res) => {
        (async () => {
            try {
                const transactions = await db.query('SELECT * FROM transactions');
                res.json(transactions.rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    getTransactionById: (req, res) => {
        (async () => {
            try {
                const transaction = await db.query('SELECT * FROM transactions WHERE id = $1', [req.params.id]);
                res.json(transaction.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    addTransaction: (req, res) => {
        (async () => {
            try {
                const { date, items, amount_paid, staff_id, stripe_payment_id, status_id, terminal_id, type_id, customer_id, subscription_id } = req.body;
                const newTransaction = await db.query('INSERT INTO transactions (date, items, amount_paid, staff_id, stripe_payment_id, status_id, terminal_id, type_id, customer_id, subscription_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [date, items, amount_paid, staff_id, stripe_payment_id, status_id, terminal_id, type_id, customer_id, subscription_id]);
                res.json(newTransaction.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    updateTransaction: (req, res) => {
        (async () => {
            try {
                const { date, items, amount_paid, staff_id, stripe_payment_id, status_id, terminal_id, type_id, customer_id, subscription_id } = req.body;
                const updatedTransaction = await db.query('UPDATE transactions SET date = $1, items = $2, amount_paid = $3, staff_id = $4, stripe_payment_id = $5, status_id = $6, terminal_id = $7, type_id = $8, customer_id = $9, subscription_id = $10 WHERE id = $11 RETURNING *', [date, items, amount_paid, staff_id, stripe_payment_id, status_id, terminal_id, type_id, customer_id, subscription_id, req.params.id]);
                res.json(updatedTransaction.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    deleteTransaction: (req, res) => {
        (async () => {
            try {
                await db.query('DELETE FROM transactions WHERE id = $1', [req.params.id]);
                res.json({ message: 'Transaction deleted' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    }
}
