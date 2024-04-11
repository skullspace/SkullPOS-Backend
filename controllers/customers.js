const db = require('../db');

module.exports = {
    getAllCustomers: (req, res) => {
        (async () => {
            try {
                const customers = await db.query('SELECT * FROM customers');
                res.json(customers.rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    getCustomerById: (req, res) => {
        (async () => {
            try {
                const customer = await db.query('SELECT * FROM customers WHERE id = $1', [req.params.id]);
                res.json(customer.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    addCustomer: (req, res) => {
        (async () => {
            try {
                const { first_name, last_name, phone_number, email, member } = req.body;
                const newCustomer = await db.query('INSERT INTO customers (first_name, last_name, phone_number, email, member) VALUES ($1, $2, $3, $4, $5) RETURNING *', [first_name, last_name, phone_number, email, member]);
                res.json(newCustomer.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    updateCustomer: (req, res) => {
        (async () => {
            try {
                const { first_name, last_name, phone_number, email, member } = req.body;
                const updatedCustomer = await db.query('UPDATE customers SET first_name = $1, last_name = $2, phone_number = $3, email = $4, member = $5 WHERE id = $6 RETURNING *', [first_name, last_name, phone_number, email, member, req.params.id]);
                res.json(updatedCustomer.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    },

    deleteCustomer: (req, res) => {
        (async () => {
            try {
                await db.query('DELETE FROM customers WHERE id = $1', [req.params.id]);
                res.json({ message: 'Customer deleted' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })();
    }

}
