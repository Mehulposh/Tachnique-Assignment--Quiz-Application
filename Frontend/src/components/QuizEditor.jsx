export const QuizEditor = ({ quiz, onQuizChange, onSave, loading }) => {
  const addQuestion = (type) => {
    const newQuestion = {
      id: `q${quiz.questions.length + 1}`,
      type,
      question: '',
      correctAnswer: '',
      ...(type === 'mcq' && { options: ['', '', '', ''] })
    };
    onQuizChange({
      ...quiz,
      questions: [...quiz.questions, newQuestion]
    });
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    onQuizChange({ ...quiz, questions: updatedQuestions });
  };

  const deleteQuestion = (index) => {
    onQuizChange({
      ...quiz,
      questions: quiz.questions.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Quiz</h2>
      
      <input
        type="text"
        value={quiz.title}
        onChange={(e) => onQuizChange({ ...quiz, title: e.target.value })}
        placeholder="Quiz Title"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 text-lg"
      />

      <div className="space-y-6 mb-6">
        {quiz.questions.map((q, index) => (
          <QuestionEditor
            key={q.id}
            question={q}
            index={index}
            onUpdate={updateQuestion}
            onDelete={deleteQuestion}
          />
        ))}
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => addQuestion('mcq')}
          className="flex-1 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
        >
          <Plus className="w-5 h-5 inline mr-2" />
          Add MCQ
        </button>
        <button
          onClick={() => addQuestion('truefalse')}
          className="flex-1 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
        >
          <Plus className="w-5 h-5 inline mr-2" />
          Add True/False
        </button>
        <button
          onClick={() => addQuestion('text')}
          className="flex-1 px-4 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition"
        >
          <Plus className="w-5 h-5 inline mr-2" />
          Add Text
        </button>
      </div>

      <button
        onClick={onSave}
        disabled={loading}
        className="w-full px-6 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
      >
        <Save className="w-5 h-5 inline mr-2" />
        {loading ? 'Saving...' : 'Save Quiz'}
      </button>
    </div>
  );
};
