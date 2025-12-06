export const ResultsPage = ({ score, onNavigate }) => {
  const percentage = Math.round((score.correct / score.total) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-indigo-600 mb-4">
            {percentage}%
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
          <p className="text-xl text-gray-600">
            You got {score.correct} out of {score.total} questions correct
          </p>
        </div>

        <div className="mb-8">
          {percentage >= 80 && (
            <p className="text-2xl text-green-600 font-semibold">Excellent work! 🎉</p>
          )}
          {percentage >= 60 && percentage < 80 && (
            <p className="text-2xl text-blue-600 font-semibold">Good job! 👍</p>
          )}
          {percentage < 60 && (
            <p className="text-2xl text-orange-600 font-semibold">Keep practicing! 💪</p>
          )}
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition text-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};
