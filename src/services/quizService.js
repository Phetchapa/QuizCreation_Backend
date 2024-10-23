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
    if (quizzes.length === 0) {
      return { message: 'ยังไม่มีแบบทดสอบหรือแบบฟอร์มที่เคยสร้าง' };
    }
    return quizzes;
  },

  getQuizById: async (quizId) => {
    const quiz = await quizRepository.getQuizById(quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    return quiz;
  },

  deleteQuiz: async (quizId) => {
    // Find the quiz and related data
    const quiz = await quizRepository.getQuizById(quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    // Delete all related data in a cascading manner
    await Promise.all(
      quiz.sections.map(async (section) => {
        await Promise.all(
          section.questions.map(async (question) => {
            // Delete options for each question
            await quizRepository.deleteOptionsByQuestionId(question.id);
          })
        );
        // Delete questions for each section
        await quizRepository.deleteQuestionsBySectionId(section.id);
      })
    );

    // Delete sections for the quiz
    await quizRepository.deleteSectionsByQuizId(quiz.id);

    // Delete the cover page for the quiz
    if (quiz.coverPage) {
      await quizRepository.deleteCoverPageByQuizId(quiz.id);
    }

    // Delete the quiz itself
    await quizRepository.deleteQuizById(quiz.id);
  }
};
