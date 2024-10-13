const { invoices, customers, revenue: revenues, users } = require('../lib/placeholder-data');
const User = require('../models/User')
const Invoice = require('../models/Invoice')
const Customer = require('../models/Customer')
const Revenue = require('../models/Revenue')

async function seedUsers() {
    const allUsersToSeed = users.map(async (user) => {
        // Check if the user already exists (on conflict - do nothing equivalent)
        const existingUser = await User.findOne({ id: user.id });

        if (!existingUser) {
            // Create a new user if they don't exist
            return await User.create({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
            });
        }
        // If user exists, we do nothing (mimicking SQL's "ON CONFLICT DO NOTHING")
        return null;
    })
    const insertedUsers = await Promise.all(allUsersToSeed)
    return insertedUsers.filter(user => user !== null)
}

async function seedCustomers() {
    const allCustomersToSeed = customers.map(async (customer) => {
        const existingCustomer = await Customer.findOne({ id: customer.id })
        if (!existingCustomer) {
            return await Customer.create({
                _id: customer.id,
                name: customer.name,
                email: customer.email,
                image_url: customer.image_url
            })
        }
        // If customer already exists, return null (mimics "ON CONFLICT DO NOTHING")
        return null;
    })

    const insertedCustomers = await Promise.all(allCustomersToSeed)
    return insertedCustomers.filter(customer => customer !== null)
}

async function seedInvoices() {
    const allInvicesToSeed = invoices.map(async (invoice) => {

        // Check if the invoice already exists based on customer_id, amount, and date
        const existingInvoice = await Invoice.findOne({
            customer_id: invoice.customer_id,
            amount: invoice.amount,
            date: invoice.date,
        });

        if (!existingInvoice) {
            // If no invoice is found, create a new one
            return await Invoice.create({
                customer_id: invoice.customer_id,
                amount: invoice.amount,
                status: invoice.status,
                date: invoice.date,
            });
        }

        // If invoice already exists, return null (mimics "ON CONFLICT DO NOTHING")
        return null;
    })
    const insertedInvoices = await Promise.all(allInvicesToSeed)
    return insertedInvoices.filter(invoice => invoice !== null)

}

async function seedRevenue() {
    const allRevenuesToSeed = revenues.map(async (revenue) => {
        const existingRevenue = await Revenue.findOne({ month: revenue.month })
        if (!existingRevenue) {
            return await Revenue.create({
                month: revenue.month,
                revenue: revenue.revenue
            })
        }
    })
}
module.exports = async (req, res, next) => {
    try {
        await seedUsers();
        await seedCustomers();
        await seedInvoices();
        await seedRevenue();

        return res.status(201).json({
            message: 'Database seeded successfully'
        })
    } catch (error) {
        console.log(error);

        next(error)
    }
}

