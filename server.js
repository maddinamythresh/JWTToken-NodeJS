const express= require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
// Middleware
app.use(express.json()); // Parse JSON request bodies

// Connect to the database
connectDB();

// Routes
app.use('/api/auth', authRoutes);



app.listen(process.env.PORT||3000,()=>{
    console.log("Server running at 3000")
})