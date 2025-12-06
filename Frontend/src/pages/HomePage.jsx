import React from 'react'
import { ClipboardList, User } from 'lucide-react'
import QuizList from '../components/QuizList.jsx'

const HomePage = ({quizzes,onNavigate, OnStart, }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 text-indigo-900">Quiz Master</h1>
        <p className="text-center text-gray-600 mb-12">Test your knowledge or create amazing quizzes</p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <button
            onClick={() => onNavigate('admin')}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <ClipboardList className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Panel</h2>
            <p className="text-gray-600">Create and manage quizzes</p>
          </button>
          
          <button
            onClick={() => {}}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <Users className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Take a Quiz</h2>
            <p className="text-gray-600">Test your knowledge</p>
          </button>
        </div>

        <QuizList quizzes={quizzes} OnStart={OnStart} />
      </div>
    </div>
  );
}

export default HomePage