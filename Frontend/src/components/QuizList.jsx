import React from 'react'

const QuizList = ({ quizzes, OnStart }) => {
  return (
    <div>
        <h2>
            Available Quizzes
        </h2>
        {quizzes.length === 0 ? (
            <p>No quizzes available at the moment.</p>
        ) : (
            <div>
                {quizzes.map((quiz) => (
                    <div key={quiz.id} className="quiz-card">
                        <div>
                            <h3>{quiz.title}</h3>
                            <p>{quiz.questions.length} questions</p>
                        </div>
                        <button onClick={() => OnStart(quiz.id)}>Start Quiz</button>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default QuizList