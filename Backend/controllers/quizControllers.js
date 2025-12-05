import { QuizModel } from "../model/QuizModel";
import {AttemptSchema} from "../model/AttemptSchema";

exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await QuizModel.find({isActive:true})
                        .select('-questions.correctAnswer')
                        .sort({ createdAt: -1 });
        
        res.json({
            sucess : true,
            count: quizzes.length,
            data : quizzes
        });
        
    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch quizzes",
            error: error.message
        });
    }

};

exports.getQuizById = async (req, res) => {
    const { quizId } = req.params;  
    try {
        const quiz = await QuizModel.findById(quizId)
        .select('-questions.correctAnswer');

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }
        res.json({
            success: true,
            data: quiz
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch quiz",
            error: error.message
        });
    }
};

//get quiz with answers for admin
exports.getQuizWithAnswer = async (req, res) => {
    try {
        const quiz = await QuizModel.findById(req.params.quizId);
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }
        res.json({
            success: true,
            data: quiz
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch quiz with answers",
            error: error.message
        }); 
    }

    //create a new quiz
exports.createQuiz = async (req, res) => {
    try {
        const {title,questions} = req.body;

        if(!title || !questions || questions.length === 0){
            return res.status(400).json({
                success: false,
                message: "Title and questions are required to create a quiz"
            });
        }
        const newQuiz = new QuizModel({ title, questions });
        await newQuiz.save();
        res.status(201).json({
            success: true,
            message: "Quiz created successfully",
            data: newQuiz
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create quiz",
            error: error.message
        });
    }
}
};


//submit quiz attempt
exports.submitQuizAttempt = async (req, res) => {
    try {
        const { quizId, userName, answers, timeTaken } = req.body; 
        const quiz = await QuizModel.findById(quizId);
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        let correctCount = 0;
        quiz.questions.forEach((question) => {
            const userAnswer = answers[quiestion.id];
            if(userAnswer?.toLowerCase().trim === question.correctAnswer.toLowerCase()){
                correctCount += 1;
            }else{
                if(userAnswer === question.correctAnswer){
                    correctCount += 1;
                }
            }
        });

        const totalQuestions = quiz.questions.length;
        const percentage = Math.round((correctCount / totalQuestions) * 100);
        
        const attempt = new AttemptSchema({
            quizId,
            quizTitle: quiz.title,  
            userName: userName || 'Guest',
            answers: answers,
            totalQuestions: totalQuestions,
            percentage: percentage,
            timeTaken: timeTaken || 0,
            score: correctCount,
        });

        await attempt.save();


        await QuizModel.save()

        res.status(201).json({
            success: true,
            message: "Quiz attempt submitted successfully",
            data: {
                score: correctCount,
                totalQuestions: totalQuestions,
                percentage: percentage
            }
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to submit quiz attempt",
            error: error.message
        });
    }
}       
        
