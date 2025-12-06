import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import quizRoutes from './routes/QuizRoutes.js';
import AiRoute from './routes/AiRoute.js';

dotenv.config()

const app = express();

//middleware
app.use(cors());
app.use(express.json());


//port 
const PORT = process.env.PORT || 5000;

//mongoose connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quizdb';
mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));   

//routes 
app.use('/api/quizzes', quizRoutes);
app.use('/api/ai', AiRoute);

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