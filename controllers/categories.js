const db = require('../db');

module.exports = {

    getAllCategories: (req, res) => {
        (async () => {
            try {
                const categories = await db.query('SELECT * FROM categories');
                res.json(categories.rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    getCategoryById: (req, res) => {
        (async () => {
            try {
                const category = await db.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
                res.json(category.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    createCategory: (req, res) => {
        (async () => {
            try {
                console.log(req.body)
                const { category_name,description } = req.body;
                const category = await db.query('INSERT INTO categories (category_name,description) VALUES ($1, $2) RETURNING *', [category_name,description]);
                res.json(category.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    updateCategory: (req, res) => {
        (async () => {
            try {
                const { category_name, description } = req.body;
                const category = await db.query('UPDATE categories SET category_name = $1, description = $2 WHERE id = $3 RETURNING *', [category_name, description, req.params.id]);
                res.json(category.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    deleteCategory: (req, res) => {
        (async () => {
            try {
                await db.query('DELETE FROM categories WHERE id = $1', [req.params.id]);
                res.json({ message: 'Category deleted successfully' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },
}
