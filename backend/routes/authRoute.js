const express = require('express');
const router = express.Router();
const authenticateToken = require('../controllers/authenticateToken');
const {
    getUsers,
    loginUser,
    loginGithub,
    loginCallbackGithub,
    deleteUser,
    registerUser
} = require('../controllers/userController');

// router.get('/', getUsers);
router.get('/', (req, res) => {
    res.send('OAuth with Github');
});

router.get('/', authenticateToken, getUsers);

router.post('/register', registerUser);

router.post('/login', loginUser);
router.get('/login/github', loginGithub);
router.get('/login/github/callback', loginCallbackGithub);

router.delete('/delete/:id', deleteUser);

module.exports = router;
