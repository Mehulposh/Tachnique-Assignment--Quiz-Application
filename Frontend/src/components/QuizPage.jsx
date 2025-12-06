import React, { useState } from 'react';
import { QuestionDisplay } from './QuestionDisplay.jsx';


export const QuizPage = ({ quiz, onNavigate, onSubmit }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.questions.forEach((q) => {
      const userAnswer = answers[q.id];
      if (q.type === 'text') {
        if (userAnswer?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
          correct++;
        }
      } else {
        if (userAnswer === q.correctAnswer) {
          correct++;
        }
      }
    });
    onSubmit({ correct, total: quiz.questions.length });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">{quiz.title}</h1>
          <p className="text-gray-600 mb-8">{quiz.questions.length} questions</p>

          <div className="space-y-8">
            {quiz.questions.map((q, index) => (
              <QuestionDisplay
                key={q.id}
                question={q}
                index={index}
                answer={answers[q.id]}
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
