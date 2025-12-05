import  QuizModel  from "../model/QuizModel.js";
import  AttemptSchema  from "../model/AttemptSchema.js"; 

// Get all active quizzes (without correct answers)
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await QuizModel.find({ isActive: true })
      .select("-questions.correctAnswer")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: quizzes.length,
      data: quizzes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quizzes",
      error: error.message,
    });
  }
};

// Get a quiz by ID (without correct answers)
export const getQuizById = async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await QuizModel.findById(quizId).select(
      "-questions.correctAnswer"
    );

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    res.json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz",
      error: error.message,
    });
  }
};

// Get quiz with answers for admin
export const getQuizWithAnswer = async (req, res) => {
  try {
    const quiz = await QuizModel.findById(req.params.quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    res.json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz with answers",
      error: error.message,
    });
  }
};

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;

    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Title and questions are required to create a quiz",
      });
    }

    const newQuiz = new QuizModel({ title, questions });
    await newQuiz.save();

    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      data: newQuiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create quiz",
      error: error.message,
    });
  }
};

// Submit quiz attempt
export const submitQuizAttempt = async (req, res) => {
  try {
    const { quizId, userName, answers, timeTaken } = req.body;

    const quiz = await QuizModel.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    let correctCount = 0;

    // Assuming `answers` is an object like { [questionId]: "userAnswer" }
    quiz.questions.forEach((question) => {
      const questionId = question._id?.toString() || question.id;
      const rawUserAnswer = answers?.[questionId];

      if (!rawUserAnswer) return;

      const userAnswer = String(rawUserAnswer).trim().toLowerCase();
      const correctAnswer = String(question.correctAnswer).trim().toLowerCase();

      if (userAnswer === correctAnswer) {
        correctCount += 1;
      }
    });

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    const attempt = new AttemptSchema({
      quizId,
      quizTitle: quiz.title,
      userName: userName || "Guest",
      answers: answers,
      totalQuestions,
      percentage,
      timeTaken: timeTaken || 0,
      score: correctCount,
    });

    await attempt.save();

    res.status(201).json({
      success: true,
      message: "Quiz attempt submitted successfully",
      data: {
        score: correctCount,
        totalQuestions,
        percentage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit quiz attempt",
      error: error.message,
    });
  }
};


