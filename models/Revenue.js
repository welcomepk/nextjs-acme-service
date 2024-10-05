const mongoose = require('mongoose');

const revenueSchema = new mongoose.Schema({
    month: { type: String, required: true },
    revenue: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Revenue', revenueSchema);
