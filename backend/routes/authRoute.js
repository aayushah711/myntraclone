const express = require('express');
const router = express.Router();
const authenticateToken = require('../controllers/authenticateToken');
const { getUsers, loginUser, deleteUser, registerUser } = require('../controllers/userController');

// router.get('/', getUsers);
router.get('/', authenticateToken, getUsers);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.delete('/delete/:id', deleteUser);

module.exports = router;
