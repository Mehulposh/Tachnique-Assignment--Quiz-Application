export const QuestionDisplay = ({ question, index, answer, onAnswerChange }) => {
  return (
    <div className="border-b border-gray-200 pb-8 last:border-0">
      <h3 className="font-semibold text-lg mb-4 text-gray-800">
        {index + 1}. {question.question}
      </h3>

      {question.type === 'mcq' && (
        <div className="space-y-3">
          {question.options.map((opt, i) => (
            <label key={i} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value={opt}
                checked={answer === opt}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                className="mr-3"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === 'truefalse' && (
        <div className="space-y-3">
          <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name={question.id}
              value="true"
              checked={answer === 'true'}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              className="mr-3"
            />
            <span>True</span>
          </label>
          <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name={question.id}
              value="false"
              checked={answer === 'false'}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              className="mr-3"
            />
            <span>False</span>
          </label>
        </div>
      )}

      {question.type === 'text' && (
        <input
          type="text"
          value={answer || ''}
          onChange={(e) => onAnswerChange(question.id, e.target.value)}
          placeholder="Your answer"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
      )}
    </div>
  );
};
