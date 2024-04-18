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

/* models
"staff";
"terminals";
"locations";
"transactions";
"transaction_types";
"transaction_status";
"products";
"categories";
"discounts";
"roles";
"customers";
"subscriptions";
"subscription_types";
"events";
"transfers";
"transfer_types";
"transfer_items";
"stock";
"event_counts";
*/

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
const events = require('./routes/events.js');
const transfers = require('./routes/transfers.js');
const transferTypes = require('./routes/transferTypes.js');
const transferItems = require('./routes/transferItems.js');
const stock = require('./routes/stock.js');
const eventCounts = require('./routes/eventCounts.js');


const functions = require('./routes/functions.js');




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
app.use('/api/events', events);
app.use('/api/transfers', transfers);
app.use('/api/transferTypes', transferTypes);
app.use('/api/transferItems', transferItems);
app.use('/api/stock', stock);
app.use('/api/eventCounts', eventCounts);

app.use('/api/functions', functions);




const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

app.use(cookieParser());
app.use(session ({secret: config.setup.secret}));
