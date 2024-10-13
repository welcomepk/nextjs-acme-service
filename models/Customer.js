const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const customerSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image_url: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
