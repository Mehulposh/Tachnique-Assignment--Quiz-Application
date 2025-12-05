import express from 'express';
import { Router } from 'express';   

import {getAllQuizzes,getQuizById,getQuizWithAnswer,createQuiz,submitQuizAttempt} from '../controllers/quizControllers.js';

const router = Router();

// Public Routes
router.get('/',getAllQuizzes);
router.get('/:quizId', getQuizById);
router.post('/submit/', submitQuizAttempt);

// Admin Routes
router.get('/:id/admin', getQuizWithAnswer);
router.post('/admin/create', createQuiz);

export default router;


