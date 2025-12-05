import React from 'react'
import { ClipboardList, User } from 'lucide-react'
import QuizList from '../components/QuizList.jsx'

const HomePage = ({quizzes,onNavigate, OnStart, }) => {
  return (
    <div className='min-h-screen'>
        <div className='max-w-4xl'>
            <h1 className='text-4xl font-bold text-center my-8'>Welcome to QuizMaster</h1>
            <p className='text-center text-gray-600 mb-12'>Your ultimate destination for fun and challenging quizzes!</p>

            <div>
                <button
                onClick={() => onNavigate('admin')}
                >
                    <ClipboardList/>
                    <h2>
                        Admin Panel
                    </h2>
                    <p>Manage quizzes and questions</p>
                </button>

                <button 
                    onClick={() => {}}>
                    <User/>
                    <h2>
                        User Dashboard
                    </h2>
                    <p>Take quizzes and track your progress</p>
                </button>
            </div>

            <QuizList quizzes={quizzes} OnStart={OnStart}/>
        </div>

    </div>
  )
}

export default HomePage