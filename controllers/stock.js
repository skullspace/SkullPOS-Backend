const db =  require('../db');

module.exports = {
    getAllStocks: (req, res) => {
        const query = 'SELECT * FROM stock';
        db.query(query, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(result.rows);
            }
        }
        )
    },

    getStockById: (req, res) => {
        const query = 'SELECT * FROM stock WHERE id = $1';
        db.query(query, [req.params.id], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(result.rows[0]);
            }
        }
        )
    },

    addStock: (req, res) => {
        const { product_id, location_id, quantity } = req.body;
        const query = 'INSERT INTO stock (product_id, location_id, quantity) VALUES ($1, $2, $3) RETURNING *';
        db.query(query, [product_id, location_id, quantity], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(result.rows[0]);
            }
        }
        )
    },

    updateStock: (req, res) => {
        const { product_id, location_id, quantity } = req.body;
        const query = 'UPDATE stock SET product_id = $1, location_id = $2, quantity = $3 WHERE id = $4 RETURNING *';
        db.query(query, [product_id, location_id, quantity, req.params.id], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(result.rows[0]);
            }
        }
        )
    },

    deleteStock: (req, res) => {
        const query = 'DELETE FROM stock WHERE id = $1';
        db.query(query, [req.params.id], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: 'Stock deleted successfully' });
            }
        }
        )
    }
}

