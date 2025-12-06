import React, { useState, useEffect } from 'react';
import  HomePage  from './pages/HomePage.jsx';
import { AdminPage } from './pages/AdminPage.jsx';
import { QuizPage } from './components/QuizPage.jsx';
import { ResultsPage } from './components/ResultPage.jsx';
import apiService from './components/ApiServices.js';

const QuizApp = () => {
  const [view, setView] = useState('home');
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const loadQuizzes = async () => {
    try {
      const data = await apiService.getQuizzes();
      setQuizzes(data);
    } catch (err) {
      console.error('Failed to load quizzes',err);
    }
  };
  loadQuizzes();
  }, []);

  

  const handleStartQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setScore(null);
    setView('quiz');
  };

  const handleQuizSubmit = (scoreData) => {
    setScore(scoreData);
    setView('results');
  };

  const handleQuizSaved = (newQuiz) => {
    setQuizzes([...quizzes, newQuiz]);
  };

  return (
    <>
      {view === 'home' && (
        <HomePage 
          quizzes={quizzes}
          onNavigate={setView}
          onStartQuiz={handleStartQuiz}
        />
      )}
      
      {view === 'admin' && (
        <AdminPage 
          onNavigate={setView}
          onQuizSaved={handleQuizSaved}
        />
      )}
      
      {view === 'quiz' && currentQuiz && (
        <QuizPage 
          quiz={currentQuiz}
          onNavigate={setView}
          onSubmit={handleQuizSubmit}
        />
      )}
      
      {view === 'results' && score && (
        <ResultsPage 
          score={score}
          onNavigate={setView}
        />
      )}
    </>
  );
};

export default QuizApp;