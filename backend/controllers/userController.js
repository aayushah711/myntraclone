const User = require('../models/User');

const getUsers = (req, res) => {
    User.find().then((users) => res.status(200).json(users)).catch((err) => res.status(400).json(err));
};

module.exports = { getUsers };
