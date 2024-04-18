const db = require('../db');

module.exports = {
    getAllTransferTypes: (req, res) => {
        const query = 'SELECT * FROM transfer_types';
        db.query(query, (err, result) => {
        if (err) {
            res.status
            res.status(500).json({ error: err.message });
        }
        res.json(result.rows);
        }
        )
    },

    getTransferTypeById: (req, res) => {
        const query = 'SELECT * FROM transfer_types WHERE id = $1';
        db.query(query, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.json(result.rows[0]);
        }
        )
    },

    addTransferType: (req, res) => {
        const { type_name } = req.body;
        const query = 'INSERT INTO transfer_types (type_name) VALUES ($1) RETURNING *';
        db.query(query, [type_name], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.json(result.rows[0]);
        }
        )
    },

    updateTransferType: (req, res) => {
        const { type_name } = req.body;
        const query = 'UPDATE transfer_types SET type_name = $1 WHERE id = $2 RETURNING *';
        db.query(query, [type_name, req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.json(result.rows[0]);
        }
        )
    },

    deleteTransferType: (req, res) => {
        const query = 'DELETE FROM transfer_types WHERE id = $1';
        db.query(query, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Transfer type deleted successfully' });
        }
        )
    }
}
