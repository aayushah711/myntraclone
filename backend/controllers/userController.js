const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/User');
const { registerValidation, loginValidation } = require('./validation');
const { getAccessToken, fetchGitHubUser } = require('./githubAuth');

const getUsers = async (req, res) => {
    const userExists = await User.findOne({ email: req.user.email }, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Something went wrong!' });
        }
    });
    const { fullName, mobile } = userExists;
    return res.status(200).json({ fullName, mobile });
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json('Deletion successful!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

const deleteAllUsers = async (req, res) => {
    try {
        await User.remove({}, (err) => {
            if (err) {
                res.json('Could not delete all users!');
            } else {
                res.json('Deletion successful!');
            }
        });
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

loginCallbackGithub = async (req, res) => {
    const code = req.query.code;
    const access_token = await getAccessToken(code);
    const user = await fetchGitHubUser(access_token);
    console.log('user', user);
    const { name, email, location } = user;
    if (email) {
        const userExists = await User.findOne({ email: email }, (err, user) => {
            if (err) {
                // some unknown error
                return res.status(400).json({ message: 'Something went wrong!' });
            } else {
                if (user) {
                    // if user exists
                    const tokenisedUser = { email: user.email };
                    const accessToken = jwt.sign(tokenisedUser, process.env.SECRET_KEY_TO_ACCESS, { expiresIn: '60s' });
                    return res.json({ accessToken: accessToken });
                }
            }
        });
        if (!userExists) {
            const password = email + process.env.SECRET_KEY_TO_ACCESS;
            const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

            const user = new User({
                email,
                password: hashedPassword,
                fullName: name
            });

            const savedUser = await user.save();

            const tokenisedUser = { email: savedUser.email };
            const accessToken = jwt.sign(tokenisedUser, process.env.SECRET_KEY_TO_ACCESS, { expiresIn: '60s' });
            return res.json({ accessToken: accessToken });
        }
    } else {
        return res.status(400).json({ message: 'Something went wrong!' });
    }
};

module.exports = { getUsers, registerUser, loginUser, loginCallbackGithub, deleteUser, deleteAllUsers };
