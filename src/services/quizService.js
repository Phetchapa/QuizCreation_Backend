// services/quizService.js
const quizRepository = require('../repositories/quizRepository');

module.exports = {
  createQuiz: async (quizData) => {
    // คุณสามารถเพิ่ม validation หรือ business logic ที่นี่
    const newQuiz = await quizRepository.createQuiz(quizData);
    return newQuiz;
  },

  getAllQuizzes: async () => {
    const quizzes = await quizRepository.getAllQuizzes();
    return quizzes;
  },

  getQuizById: async (quizId) => {
    const quiz = await quizRepository.getQuizById(quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    return quiz;
  }
};
