// backend/server.js

const path = require('path'); 
const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const userAdminRoutes = require('./routes/userAdminRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

connectDB();

const app = express();

app.use(express.json());

// --- API Routes ---
// All your API routes will go here
app.use('/api/users', userRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/users/admin', userAdminRoutes);
app.use('/api/announcements', announcementRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});