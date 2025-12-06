import React from 'react'

const QuizList = ({ quizzes, OnStart }) => {
 return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Quizzes</h2>
      {quizzes.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No quizzes available yet</p>
      ) : (
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{quiz.title}</h3>
                <p className="text-sm text-gray-600">{quiz.questions.length} questions</p>
              </div>
              <button
                onClick={() => OnStart(quiz)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizList