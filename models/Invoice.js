const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    customer_id: { type: String, ref: 'Customer', required: true }, // Reference to Customer model
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid'], required: true },
    date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
