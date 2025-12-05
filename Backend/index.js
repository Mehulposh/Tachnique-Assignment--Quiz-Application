import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import quizRoutes from './routes/QuizRoutes.js';

dotenv.congig()

const app = express();

//middleware
app.use(cors());
app.use(express.json());


//port 
const PORT = process.env.PORT || 5000;

//mongoose connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quizdb';

//routes 
app.use('/api/quizzes', quizRoutes);

//health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server running successfully' });
});

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});