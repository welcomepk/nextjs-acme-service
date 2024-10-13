const Revenue = require('../models/Revenue')
// Get all revenues
const getRevenues = async (req, res, next) => {
    try {
        const invoices = await Revenue.find()//.populate('customer_id', 'name email');
        res.status(200).send(invoices);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getRevenues
}