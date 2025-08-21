// backend/server.js

const express = require('express');
const dotenv = require('dotenv');

// FIXED: Load environment variables at the very top
dotenv.config();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const userAdminRoutes = require('./routes/userAdminRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/users/admin', userAdminRoutes);
app.use('/api/announcements', announcementRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});