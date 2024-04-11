const db = require('../db');

module.exports = {
    getAllLocations: (req, res) => {
        (async () => {
            try {
                const locations = await db.query('SELECT * FROM locations');
                res.json(locations.rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    getLocationById: (req, res) => {
        (async () => {
            try {
                const location = await db.query('SELECT * FROM locations WHERE id = $1', [req.params.id]);
                res.json(location.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    addLocation: (req, res) => {
        (async () => {
            try {
                const { location_name, description } = req.body;
                const newLocation = await db.query('INSERT INTO locations (location_name, description) VALUES ($1, $2) RETURNING *', [location_name, description]);
                res.json(newLocation.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    updateLocation: (req, res) => {
        (async () => {
            try {
                const { location_name, description } = req.body;
                const updatedLocation = await db.query('UPDATE locations SET location_name = $1, description = $2 WHERE id = $3 RETURNING *', [location_name, description, req.params.id]);
                res.json(updatedLocation.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    deleteLocation: (req, res) => {
        (async () => {
            try {
                await db.query('DELETE FROM locations WHERE id = $1', [req.params.id]);
                res.json({ message: 'Location deleted' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    }
}
