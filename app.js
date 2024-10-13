const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const revenueRoutes = require('./routes/revenueRoutes');
const seedDataController = require('./controllers/seedDataController')

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());


// API Routes
app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/revenues', revenueRoutes);
app.get('/api/seed', seedDataController)

// Error handling middleware
app.use(require('./middlewares/errorHandler'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
