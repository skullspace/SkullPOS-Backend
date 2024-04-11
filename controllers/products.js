const db = require('../db');

module.exports = {
    getAllProducts: (req, res) => {
        (async () => {
            try {
                const products = await db.query('SELECT * FROM products');
                res.json(products.rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    getProductById: (req, res) => {
        (async () => {
            try {
                const product = await db.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
                res.json(product.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    addProduct: (req, res) => {
        (async () => {
            try {
                const { cost, item_name, item_image, category_id } = req.body;
                const newProduct = await db.query('INSERT INTO products (cost, item_name, item_image, category_id) VALUES ($1, $2, $3, $4) RETURNING *', [cost, item_name, item_image, category_id]);
                res.json(newProduct.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    updateProduct: (req, res) => {
        (async () => {
            try {
                const { cost, item_name, item_image, category_id } = req.body;
                const updatedProduct = await db.query('UPDATE products SET cost = $1, item_name = $2, item_image = $3, category_id = $4 WHERE id = $5 RETURNING *', [cost, item_name, item_image, category_id, req.params.id]);
                res.json(updatedProduct.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    deleteProduct: (req, res) => {
        (async () => {
            try {
                await db.query('DELETE FROM products WHERE id = $1', [req.params.id]);
                res.json({ message: 'Product deleted' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    }
}
