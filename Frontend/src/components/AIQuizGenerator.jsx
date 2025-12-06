import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import apiService from './ApiServices.js';


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
      const aiQuiz = await apiService.generateQuizWithAI(prompt);

      // ✅ Normalize AI quiz shape for the rest of the app / backend
      const normalizedQuiz = {
        title: aiQuiz.title || `${prompt} Quiz`,
        questions: (aiQuiz.questions || []).map((q, index) => {
          const type = q.type || ''; 

          // Ensure options always exists
          let options = q.options;
          if (!options) {
            if (type === 'truefalse') {
              options = ['true', 'false'];
            } else {
              options = []; // for text or anything else
            }
          }

          return {
            id: q.id || `q${index + 1}`,
            type, // normalized lowercase type
            question: q.question || '',
            options,
            correctAnswer: String(q.correctAnswer ?? '').trim(),
          };
        }),
      };

      onQuizGenerated(normalizedQuiz); // fills { title, questions } into AdminPage
    } catch (err) {
      console.error('AI generate error:', err);
      setError(err.message || 'Failed to generate quiz');
    } finally {
      setGenerating(false);
    }
  };


  return (
    <div className="bg-linear-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 mb-8 text-white">
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

