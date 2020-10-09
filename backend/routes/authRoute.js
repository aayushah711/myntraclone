const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('./validation');
const User = require('../models/User');
const { getUsers } = require('../controllers/userController');

router.get('/', getUsers);

router.post('/register', async (req, res, next) => {
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
});

router.post('/login', async (req, res, next) => {
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

    const { fullName, mobile, email } = user;

    const message = {
        fullName,
        mobile,
        email
    };

    res.send(message);
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json('Deletion successful!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;
