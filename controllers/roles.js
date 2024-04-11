const db = require('../db');

module.exports = {
    getAllRoles: (req, res) => {
        (async () => {
            try {
                const roles = await db.query('SELECT * FROM roles');
                res.json(roles.rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    getRoleById: (req, res) => {
        (async () => {
            try {
                const role = await db.query('SELECT * FROM roles WHERE id = $1', [req.params.id]);
                res.json(role.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    addRole: (req, res) => {
        (async () => {
            try {
                const { role_name, description } = req.body;
                const newRole = await db.query('INSERT INTO roles (role_name, description) VALUES ($1, $2) RETURNING *', [role_name, description]);
                res.json(newRole.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    updateRole: (req, res) => {
        (async () => {
            try {
                const { role_name, description } = req.body;
                const updatedRole = await db.query('UPDATE roles SET role_name = $1, description = $2 WHERE id = $3 RETURNING *', [role_name, description, req.params.id]);
                res.json(updatedRole.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    deleteRole: (req, res) => {
        (async () => {
            try {
                await db.query('DELETE FROM roles WHERE id = $1', [req.params.id]);
                res.json({ message: 'Role deleted' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    }
}
