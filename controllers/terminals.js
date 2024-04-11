const db = require('../db');

module.exports = {
    getAllTerminals: (req, res) => {
        (async () => {
            try {
                const terminals = await db.query('SELECT * FROM terminals');
                res.json(terminals.rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    getTerminalById: (req, res) => {
        (async () => {
            try {
                const terminal = await db.query('SELECT * FROM terminals WHERE id = $1', [req.params.id]);
                res.json(terminal.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    addTerminal: (req, res) => {
        (async () => {
            try {
                const { terminal_name, location_id, description } = req.body;
                const newTerminal = await db.query('INSERT INTO terminals (terminal_name, location_id, description) VALUES ($1, $2, $3) RETURNING *', [terminal_name, location_id, description]);
                res.json(newTerminal.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    updateTerminal: (req, res) => {
        (async () => {
            try {
                const { terminal_name, location_id, description } = req.body;
                const updatedTerminal = await db.query('UPDATE terminals SET terminal_name = $1, location_id = $2, description = $3 WHERE id = $4 RETURNING *', [terminal_name, location_id, description, req.params.id]);
                res.json(updatedTerminal.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    deleteTerminal: (req, res) => {
        (async () => {
            try {
                await db.query('DELETE FROM terminals WHERE id = $1', [req.params.id]);
                res.json({ message: 'Terminal deleted' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    }
}
