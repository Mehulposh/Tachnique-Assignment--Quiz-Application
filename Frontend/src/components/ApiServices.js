const Base_Url = 'http://localhost:5000/api';

const handleResponse = async (response) => {
  const data = await response.json().catch(() => null);

  console.log("Raw response:", response.status, data); // 👈 see what backend sends

  if (!response.ok) {
    throw new Error(data?.message || `HTTP ${response.status}`);
  }

  return data;
};

const apiServices = {
    getQuizzes: async () => {
        const response = await fetch(`${Base_Url}/quizzes`);
        return handleResponse(response);
    },

    getQuizById: async (id) => {
        const response = await fetch(`${Base_Url}/quizzes/${id}`);
        return handleResponse(response);
    },

    submitQuizAttempt: async (attemptData) => {
         console.log("Submitting attempt:", attemptData); 
        const response = await fetch(`${Base_Url}/quizzes/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(attemptData),
        });
        return handleResponse(response);
    },

    createQuiz: async (quizData) => {
        console.log("Submitting quiz creation:", quizData); 
        const response = await fetch(`${Base_Url}/quizzes/admin/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizData),
        });
        return handleResponse(response);
    },

    getQuizWithAnswer: async (id) => {
        const response = await fetch(`${Base_Url}/quizzes/${id}/admin`);
        return handleResponse(response);
    },


};

export default apiServices;
