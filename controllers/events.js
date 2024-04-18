const db = require('../db');

module.exports = {
    getAllEvents: async (req, res) => {
        try {
            const events = await db.query('SELECT * FROM events');
            res.json(events.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getEventById: async (req, res) => {
        try {
            const event = await db.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
            res.json(event.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    addEvent: async (req, res) => {
        try {
            const { event_name, description, date_start, date_end } = req.body;
            const event = await db.query('INSERT INTO events (event_name, description, date_start, date_end) VALUES ($1, $2, $3, $4) RETURNING *', [event_name, description, date_start, date_end]);
            res.json(event.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateEvent: async (req, res) => {
        try {
            const { event_name, description, date_start, date_end } = req.body;
            const event = await db.query('UPDATE events SET event_name = $1, description = $2, date_start = $3, date_end = $4 WHERE id = $5 RETURNING *', [event_name, description, date_start, date_end, req.params.id]);
            res.json(event.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteEvent: async (req, res) => {
        try {
            await db.query('DELETE FROM events WHERE id = $1', [req.params.id]);
            res.json({ message: 'Event deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
