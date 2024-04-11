const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config/config.js');

app.use(bodyParser.json());
app.use(cors({ origin: 'https://skullpos.shotty.tech' }));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const staff = require('./routes/staff');
const customers = require('./routes/customers.js');
const products = require('./routes/products.js');
const transactions = require('./routes/transactions.js');
const categories = require('./routes/categories.js');
const discounts = require('./routes/discounts.js');
const locations = require('./routes/locations.js');
const roles = require('./routes/roles.js');
const subscriptions = require('./routes/subscriptions.js');
const subscriptionTypes = require('./routes/subscriptionTypes.js');
const terminals = require('./routes/terminals.js');
const transactionStatus = require('./routes/transactionStatus.js');
const transactionTypes = require('./routes/transactionTypes.js');



app.use('/api/staff', staff);
app.use('/api/customers', customers);
app.use('/api/products', products);
app.use('/api/transactions', transactions);
app.use('/api/categories', categories);
app.use('/api/discounts', discounts);
app.use('/api/locations', locations);
app.use('/api/roles', roles);
app.use('/api/subscriptions', subscriptions);
app.use('/api/subscriptionTypes', subscriptionTypes);
app.use('/api/terminals', terminals);
app.use('/api/transactionStatus', transactionStatus);
app.use('/api/transactionTypes', transactionTypes);



const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

app.use(cookieParser());
app.use(session ({secret: config.setup.secret}));
