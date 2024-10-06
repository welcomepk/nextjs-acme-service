const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');

// Get all invoices
const getAllInvoices = async (req, res, next) => {
    try {
        const invoices = await Invoice.find()//.populate('customer_id', 'name email');
        res.status(200).send(invoices);
    } catch (error) {
        next(error);
    }
};

// Get a single invoice by ID
const getInvoiceById = async (req, res, next) => {
    try {
        const invoice = await Invoice.findById(req.params.id)//.populate('customer_id', 'name email');
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json(invoice);
    } catch (error) {
        next(error);
    }
};

// Create a new invoice
const createInvoice = async (req, res, next) => {
    try {
        const { customer_id, amount, status, date } = req.body;

        // Check if customer exists
        const customer = await Customer.findById(customer_id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });

        const newInvoice = new Invoice({ customer_id, amount, status, date });
        await newInvoice.save();
        res.status(201).json(newInvoice);
    } catch (error) {
        next(error);
    }
};

// Update an invoice by ID (e.g., mark as paid)
const updateInvoice = async (req, res, next) => {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInvoice) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json(updatedInvoice);
    } catch (error) {
        next(error);
    }
};

// Delete an invoice by ID
const deleteInvoice = async (req, res, next) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!deletedInvoice) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice
};
