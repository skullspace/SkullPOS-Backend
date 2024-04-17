// checks to see if user is authorized to use resources
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function auth(req, res, next) {
    // if coming from itself or from the login page, allow access
    if (req.headers['login'] === config.global.passkey) {
        next();
        return;
    }
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        jwt.verify(req.token, config.setup.secret, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}


module.exports = {
    auth,
};
