const User = require('../models/User');

// Get all users
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error); // Forward to error handler
    }
};

// Create a new user
const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = { getUsers, createUser };
