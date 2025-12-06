import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import apiService from '../services/apiService.jsx';

export  const AIQuizGenerator = ({ onQuizGenerated, error, setError }) => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a topic for the quiz');
      return;
    }

    setGenerating(true);
    setError('');

    try {
      const quizData = await apiService.generateQuizWithAI(prompt);
      onQuizGenerated(quizData);
      setPrompt('');
    } catch (err) {
      setError('Failed to generate quiz: ' + err.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 mb-8 text-white">
      <div className="flex items-center mb-4">
        <Sparkles className="w-6 h-6 mr-2" />
        <h2 className="text-2xl font-bold">AI Quiz Generator</h2>
      </div>
      <p className="mb-4 opacity-90">Let AI create a quiz for you on any topic</p>
      <div className="flex gap-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter topic (e.g., 'World History', 'JavaScript Basics')"
          className="flex-1 px-4 py-3 rounded-lg text-gray-800"
          disabled={generating}
        />
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
        >
          {generating ? 'Generating...' : 'Generate'}
        </button>
      </div>
    </div>
  );
};

