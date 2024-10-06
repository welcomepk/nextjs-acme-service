const mongoose = require('mongoose');

// Define an array of allowed month values
const allowedMonths = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const revenueSchema = new mongoose.Schema({
    month: {
        type: String,
        enum: allowedMonths,   // Restrict the values to only the allowed months
        required: true,        // Make month a required field
        unique: true,          // Ensure each month is unique
    },
    revenue: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Revenue', revenueSchema);
