// repositories/quizRepository.js
const prisma = require('../prisma/client');

module.exports = {
  createQuiz: async (data) => {
    return await prisma.quiz.create({ data });
  },

  getAllQuizzes: async () => {
    return await prisma.quiz.findMany({
      include: {
        coverPage: true,
        sections: {
          include: {
            questions: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });
  },

  getQuizById: async (quizId) => {
    return await prisma.quiz.findUnique({
      where: { quizId: quizId },
      include: {
        coverPage: true,
        sections: {
          include: {
            questions: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });
  }
};
