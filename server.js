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

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

/*
// ❌ Removed fallback to index.html as you do not have index.html
// It was causing crashes.
// If you add React or SPA in the future, you can uncomment this.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
*/

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});


