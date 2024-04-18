const db = require('../db');

module.exports = {
    getAllTransfers: (req, res) => {
        const query = 'SELECT * FROM transfers';
        db.query(query, (err
            , rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(rows);
            }
        }
        )
    },

    getTransferById: (req, res) => {
        const query = 'SELECT * FROM transfers WHERE id = $1';
        db.query(query, [req.params.id], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(rows[0]);
            }
        }
        )
    },

    addTransfer: (req, res) => {
        const { from_location_id, to_location_id, date, staff_id, type_id } = req.body;
        const query = 'INSERT INTO transfers (from_location_id, to_location_id, date, staff_id, type_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        db.query(query, [from_location_id, to_location_id, date, staff_id, type_id], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(rows[0]);
            }
        }
        )
    },

    updateTransfer: (req, res) => {
        const { from_location_id, to_location_id, date, staff_id, type_id } = req.body;
        const query = 'UPDATE transfers SET from_location_id = $1, to_location_id = $2, date = $3, staff_id = $4, type_id = $5 WHERE id = $6 RETURNING *';
        db.query(query, [from_location_id, to_location_id, date, staff_id, type_id, req.params.id], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(rows[0]);
            }
        }
        )
    }
    ,

    deleteTransfer: (req, res) => {
        const query = 'DELETE FROM transfers WHERE id = $1';
        db.query(query, [req.params.id], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: 'Transfer deleted successfully' });
            }
        }
        )
    }
}
