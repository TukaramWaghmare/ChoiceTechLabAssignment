const express = require('express');
const connectDB = require('./config/db');
const redisClient = require('./config/redis');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// // Connect to Redis
// redisClient.connect().catch(console.error);

// Middleware
app.use(express.json());

// Routes
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
