const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require("http");
const authRoutes = require('./routes/userRoute');

const app = express();
const server = http.createServer(app);
dotenv.config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("MongoDB Connection Failed", error);
        process.exit(1); 
    }
}

connectDB();

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true
}));

app.use('/api/auth', authRoutes);

const Port = process.env.PORT || 5000

server.listen(Port, () => { 
    console.log(`Server running on port ${Port}`);
});