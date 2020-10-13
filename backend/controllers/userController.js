const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { registerValidation, loginValidation } = require('./validation');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
    const userExists = await User.findOne({ email: req.user.email }, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Something went wrong!' });
        }
    });
    const { fullName, mobile } = userExists;
    return res.status(200).json({ fullName, mobile });
};
// const getUsers = (req, res) => {
//     User.find().then((users) => res.status(200).json(users)).catch((err) => res.status(400).json(err));
// };

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json('Deletion successful!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

const registerUser = async (req, res, next) => {
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
            return res.status(400).send('Email already exists in the database');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

        const { email, fullName, mobile, gender } = req.body;
        const user = new User({
            email,
            password: hashedPassword,
            fullName,
            mobile,
            gender
        });

        const savedUser = await user.save();
        const message = {
            fullName,
            mobile
        };
        res.status(200).send(message);
    } catch (err) {
        res.status(400).send(err);
    }
};

const loginUser = async (req, res, next) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Email or password is wrong');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid password');
    }

    const email = req.body.email;
    const tokenisedUser = { email };

    const accessToken = jwt.sign(tokenisedUser, process.env.SECRET_KEY_TO_ACCESS, { expiresIn: '60s' });
    return res.json({ accessToken: accessToken });
};

module.exports = { getUsers, registerUser, loginUser, deleteUser };
