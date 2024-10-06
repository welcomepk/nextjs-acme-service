const express = require('express');
const router = express.Router();
const {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController');

// GET /api/customers - Fetch all customers
router.get('/', getAllCustomers);

// GET /api/customers/:id - Fetch a customer by ID
router.get('/:id', getCustomerById);

// POST /api/customers - Create a new customer
router.post('/', createCustomer);

// PUT /api/customers/:id - Update a customer by ID
router.put('/:id', updateCustomer);

// DELETE /api/customers/:id - Delete a customer by ID
router.delete('/:id', deleteCustomer);

module.exports = router;
