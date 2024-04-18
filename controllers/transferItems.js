const db = require('../db');

module.exports = {
    getAllTransferItems: (req, res) => {
        const query = 'SELECT * FROM transfer_items';
        db.query(query, (err, rows) => {
        if (err) {
            res.status(500).send
            res.status(500).json({ error: err.message });
        }
        res.json(rows);
        }
        )
    },

    getTransferItemById: (req, res) => {
        const query = 'SELECT * FROM transfer_items WHERE id = $1';
        db.query(query, [req.params.id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.json(rows[0]);
        }
        )
    },

    addTransferItem: (req, res) => {
        const { transfer_id, product_id, quantity } = req.body;
        const query = 'INSERT INTO transfer_items (transfer_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
        db.query(query, [transfer_id, product_id, quantity], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.json(rows[0]);
        }
        )
    },

    updateTransferItem: (req, res) => {
        const { transfer_id, product_id, quantity } = req.body;
        const query = 'UPDATE transfer_items SET transfer_id = $1, product_id = $2, quantity = $3 WHERE id = $4 RETURNING *';
        db.query(query, [transfer_id, product_id, quantity, req.params.id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.json(rows[0]);
        }
        )
    },

    deleteTransferItem: (req, res) => {
        const query = 'DELETE FROM transfer_items WHERE id = $1';
        db.query(query, [req.params.id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Transfer item deleted successfully' });
        }
        )
    }
}
