const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/user');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const hashedPassword = await bcrypt.hash('admin4132', 10);
        const admin = new User({
            email: 'admin@example.com',
            password: hashedPassword,
            isAdmin: true
        });

        await admin.save();
        console.log('Admin user created');
        mongoose.disconnect();
    })
    .catch(err => console.error(err));
