import React, { useState } from 'react';
import { QuestionDisplay } from './QquestionDisplay.jsx';
import apiServices from './ApiServices.js';


export const QuizPage = ({ quiz, onNavigate, onSubmit }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));   
  };

 const handleSubmit = async () => {
  try {
    // optional: basic validation
    if (Object.keys(answers).length === 0) return;

    const payload = {
      quizId: quiz._id,
      userName:  'Guest',   // you can manage this from parent/auth
      answers,                         // { [questionId]: value }
      timeTaken:  0,       // if you track timer
    };

    const res = await apiServices.submitQuizAttempt(payload);

    if (!res.success) {
      // optional: show error
      console.error(res.message);
      return;
    }

    // backend returns: { score, totalQuestions, percentage }
    onSubmit({
      correct: res.data.score,
      total: res.data.totalQuestions,
      percentage: res.data.percentage,
    });
  } catch (err) {
    console.error('Failed to submit quiz:', err);
  }
};

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">{quiz.title}</h1>
          <p className="text-gray-600 mb-8">{quiz.questions.length} questions</p>

          <div className="space-y-8">
            {quiz.questions.map((q, index) => (
              <QuestionDisplay
                key={q._id}
                question={q}
                index={index}
                answer={answers[q._id]}
                onAnswerChange={handleAnswerChange}
              />
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
