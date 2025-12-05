const Base_Url = 'http://localhost:5000/api';

const apiServices = {
    getQuizzes: async () => {
        const response = await fetch(`${Base_Url}/quizzes`);
        return response.json();
    },

    getQuizById: async (id) => {
        const response = await fetch(`${Base_Url}/quizzes/${id}`);
        return response.json();
    },  
    submitQuizAttempt: async (attemptData) => {
        const response = await fetch(`${Base_Url}/quizzes/submit/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attemptData),
        });
        return response.json();
    },
    createQuiz: async (quizData) => {
        const response = await fetch(`${Base_Url}/quizzes/admin/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quizData),
        });
        return response.json();
    },
    getQuizWithAnswer: async (id) => {
        const response = await fetch(`${Base_Url}/quizzes/${id}/admin`);
        return response.json();
    },};

export { apiServices
}