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

//const staff = require('./routes/staff');
//const customer = require('./routes/customers.js');
//const product = require('./routes/products.js');
//const transaction = require('./routes/transactions.js');
const categories = require('./routes/categories.js');
//const discount = require('./routes/discounts.js');
//const location = require('./routes/locations.js');
//const role = require('./routes/roles.js');
//const subscription = require('./routes/subscriptions.js');
//const subscriptionType = require('./routes/subscriptionTypes.js');
//const terminal = require('./routes/terminals.js');
//const transactionStatus = require('./routes/transactionStatus.js');
//const transactionType = require('./routes/transactionTypes.js');



//app.use('/api/staff', staff);
//app.use('/api/customers', customers);
//app.use('/api/products', products);
//app.use('/api/transactions', transactions);
app.use('/api/categories', categories);
//app.use('/api/discounts', discounts);
//app.use('/api/locations', locations);
//app.use('/api/roles', roles);
//app.use('/api/subscriptions', subscriptions);
//app.use('/api/subscriptionTypes', subscriptionTypes);
//app.use('/api/terminals', terminals);
//app.use('/api/transactionStatus', transactionStatus);
//app.use('/api/transactionTypes', transactionTypes);



const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

app.use(cookieParser());
app.use(session ({secret: config.setup.secret}));
