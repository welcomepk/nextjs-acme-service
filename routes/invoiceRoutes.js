const express = require('express');
const router = express.Router();
const {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceStatusSummary,
    getLatestInvoices
} = require('../controllers/invoiceController');

// GET /api/invoices - Fetch all invoices
router.get('/', getAllInvoices);

router.get('/latest', getLatestInvoices)

router.get('/status-summary', getInvoiceStatusSummary)

// GET /api/invoices/:id - Fetch an invoice by ID
router.get('/:id', getInvoiceById);

// POST /api/invoices - Create a new invoice
router.post('/', createInvoice);

// PUT /api/invoices/:id - Update an invoice by ID (e.g., mark as paid)
router.put('/:id', updateInvoice);

// DELETE /api/invoices/:id - Delete an invoice by ID
router.delete('/:id', deleteInvoice);


module.exports = router;
