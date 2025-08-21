const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const userAdminRoutes = require('./routes/userAdminRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// ✅ Mount routes correctly
app.use('/api/users', userRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', userAdminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));