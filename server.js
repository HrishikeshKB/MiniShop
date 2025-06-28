const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// Allow requests from any origin (or restrict to your frontend URL for security)
app.use(cors());

// Parse incoming JSON
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/products', productRoutes);
app.use('/api', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);


// Serve static frontend files
app.use(express.static(path.join(__dirname, 'Public')));

// ✅ Serve shop.html on the root route to avoid "Cannot GET /"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'login.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});
