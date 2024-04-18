const db = require('../db');

module.exports = {
    getAllEventCounts: async (req, res) => {
        try {
            const eventCounts = await db.query('SELECT * FROM event_counts');
            res.json(eventCounts.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getEventCountById: async (req, res) => {
        try {
            const eventCount = await db.query('SELECT * FROM event_counts WHERE id = $1', [req.params.id]);
            res.json(eventCount.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    addEventCount: async (req, res) => {
        try {
            const { event_id, product_id, start_count, end_count } = req.body;
            const eventCount = await db.query('INSERT INTO event_counts (event_id, product_id, start_count, end_count) VALUES ($1, $2, $3, $4) RETURNING *', [event_id, product_id, start_count, end_count]);
            res.json(eventCount.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateEventCount: async (req, res) => {
        try {
            const { event_id, product_id, start_count, end_count } = req.body;
            const eventCount = await db.query('UPDATE event_counts SET event_id = $1, product_id = $2, start_count = $3, end_count = $4 WHERE id = $5 RETURNING *', [event_id, product_id, start_count, end_count, req.params.id]);
            res.json(eventCount.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteEventCount: async (req, res) => {
        try {
            await db.query('DELETE FROM event_counts WHERE id = $1', [req.params.id]);
            res.json({ message: 'Event count deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


}
