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

const getLatestInvoices = async () => {
    try {
        const latestInvoices = await Invoice.find()
            .populate({
                path: 'customer_id',            // Populate the customer_id field with customer data
                select: 'name image_url email'  // Select only the necessary fields from the Customer model
            })
            .sort({ date: -1 })               // Sort by date in descending order
            .limit(5);                        // Limit to the latest 5 invoices

        return latestInvoices;
    } catch (error) {
        console.error('Error fetching latest invoices:', error);
        throw error;
    }
};

const getLatestInvoicesController = async (req, res, next) => {
    try {
        const latestInvoices = await getLatestInvoices(); // Call the function we created earlier
        res.status(200).json(latestInvoices); // Send the data back as JSON
    } catch (error) {
        next(error)
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

// Controller to get the status summary of invoices (paid and pending totals)
const getInvoiceStatusSummary = async (req, res, next) => {
    try {
        // Mongoose aggregation pipeline to calculate total 'paid' and 'pending' amounts
        const invoiceStatus = await Invoice.aggregate([
            {
                $group: {
                    _id: null, // No grouping by field, just calculate totals
                    paid: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "paid"] }, "$amount", 0] // Sum amounts where status is 'paid'
                        }
                    },
                    pending: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "pending"] }, "$amount", 0] // Sum amounts where status is 'pending'
                        }
                    }
                }
            }
        ]);

        // If there are no invoices, initialize totals as 0
        const result = invoiceStatus[0] || { paid: 0, pending: 0 };

        // Send the response with status 200
        res.status(200).json(result);
    } catch (error) {
        // Handle errors by returning a 500 status with error details
        next(error)
    }
};


module.exports = {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceStatusSummary,
    getLatestInvoices: getLatestInvoicesController
};
