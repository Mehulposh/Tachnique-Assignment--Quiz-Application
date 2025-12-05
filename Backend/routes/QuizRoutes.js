import express from 'express';
import { Router } from 'express';   

import quizController from '../controllers/quizController.js';
const router = Router();


//Public Routes
router.get('/', quizController.getAllQuizzes);
router.get('/:quizId', quizController.getQuizById);
router.post('/submit/', quizController.submitQuiz);


//Admin Routes
router.get('/:id/admin', quizController.getQuizWithAnswer);
router.post('/admin/create', quizController.createQuiz);


module.exports = router;