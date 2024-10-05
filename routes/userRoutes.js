const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/userController');

// GET /api/users - Get all users
router.get('/', getUsers);

// POST /api/users - Create new user
router.post('/', createUser);

module.exports = router;
