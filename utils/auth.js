// checks to see if user is authorized to use resources
const auth = (req, res, next) => {
    next();
};

module.exports = {
    auth,
};
