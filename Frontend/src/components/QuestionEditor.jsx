export const QuestionEditor = ({ question, index, onUpdate, onDelete }) => {
  const updateField = (field, value) => {
    onUpdate(index, field, value);
  };

  const updateOption = (optIndex, value) => {
    const newOptions = [...question.options];
    newOptions[optIndex] = value;
    onUpdate(index, 'options', newOptions);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-lg text-gray-700">
          Question {index + 1} ({question.type.toUpperCase()})
        </h3>
        <button
          onClick={() => onDelete(index)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <input
        type="text"
        value={question.question}
        onChange={(e) => updateField('question', e.target.value)}
        placeholder="Question text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
      />

      {question.type === 'mcq' && (
        <>
          <div className="space-y-2 mb-4">
            {question.options.map((opt, optIndex) => (
              <input
                key={optIndex}
                type="text"
                value={opt}
                onChange={(e) => updateOption(optIndex, e.target.value)}
                placeholder={`Option ${optIndex + 1}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            ))}
          </div>
          <select
            value={question.correctAnswer}
            onChange={(e) => updateField('correctAnswer', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select correct answer</option>
            {question.options.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </>
      )}

      {question.type === 'truefalse' && (
        <select
          value={question.correctAnswer}
          onChange={(e) => updateField('correctAnswer', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select correct answer</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      )}

      {question.type === 'text' && (
        <input
          type="text"
          value={question.correctAnswer}
          onChange={(e) => updateField('correctAnswer', e.target.value)}
          placeholder="Correct answer"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      )}
    </div>
  );
};
