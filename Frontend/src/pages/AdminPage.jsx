import React, { useState } from 'react';
import { QuizEditor } from '../components/QuizEditor.jsx';
import { AIQuizGenerator } from '../components/AIQuizGenerator.jsx';
import ErrorHandler from '../components/ErrorHandler.jsx';
import apiService from '../components/ApiServices.js';

export const AdminPage = ({ onNavigate, onQuizSaved }) => {
  const [editingQuiz, setEditingQuiz] = useState({ title: '', questions: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 const handleSaveQuiz = async () => {
  if (!editingQuiz.title || editingQuiz.questions.length === 0) {
    setError('Please add a title and at least one question');
    return;
  }

  setLoading(true);
  try {
    const savedQuizResponse = await apiService.createQuiz(editingQuiz);

    if (!savedQuizResponse.success) {
      setError(savedQuizResponse.message || 'Failed to save quiz');
      return;
    }

    onQuizSaved(savedQuizResponse.data);
    setEditingQuiz({ title: '', questions: [] });
    setError('');
    alert('Quiz saved successfully!');
  } catch (err) {
    console.error(err);
    setError('Failed to save quiz');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Back to Home
          </button>
        </div>

        <ErrorHandler message={error} />

        <AIQuizGenerator 
          onQuizGenerated={setEditingQuiz}
          error={error}
          setError={setError}
        />

        <QuizEditor
          quiz={editingQuiz}
          onQuizChange={setEditingQuiz}
          onSave={handleSaveQuiz}
          loading={loading}
        />
      </div>
    </div>
  );
};
