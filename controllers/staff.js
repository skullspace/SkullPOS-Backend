const db = require('../db');

module.exports = {
    getAllStaff: (req, res) => {
        (async () => {
            try {
                const staff = await db.query('SELECT * FROM staff');
                res.json(staff.rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    getStaffById: (req, res) => {
        (async () => {
            try {
                const staff = await db.query('SELECT * FROM staff WHERE id = $1', [req.params.id]);
                res.json(staff.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    addStaff: (req, res) => {
        (async () => {
            try {
                const { first_name, last_name, username, pin, password, role_id, active } = req.body;
                const newStaff = await db.query('INSERT INTO staff (first_name, last_name, username, pin, password, role_id, active) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [first_name, last_name, username, pin, password, role_id, active]);
                res.json(newStaff.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    updateStaff: (req, res) => {
        (async () => {
            try {
                const { first_name, last_name, username, pin, password, role_id, active } = req.body;
                const updatedStaff = await db.query('UPDATE staff SET first_name = $1, last_name = $2, username = $3, pin = $4, password = $5, role_id = $6, active = $7 WHERE id = $8 RETURNING *', [first_name, last_name, username, pin, password, role_id, active, req.params.id]);
                res.json(updatedStaff.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    deleteStaff: (req, res) => {
        (async () => {
            try {
                await db.query('DELETE FROM staff WHERE id = $1', [req.params.id]);
                res.json({ message: 'Staff deleted' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    }
}
