const Customer = require('../models/Customer');

// Get all customers
const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        next(error);
    }
};

// Get a single customer by ID
const getCustomerById = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json(customer);
    } catch (error) {
        next(error);
    }
};

// Create a new customer
const createCustomer = async (req, res, next) => {
    try {
        const { name, email, image_url } = req.body;
        const newCustomer = new Customer({ name, email, image_url });
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        next(error);
    }
};

// Update a customer by ID
const updateCustomer = async (req, res, next) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCustomer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json(updatedCustomer);
    } catch (error) {
        next(error);
    }
};

// Delete a customer by ID
const deleteCustomer = async (req, res, next) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};
