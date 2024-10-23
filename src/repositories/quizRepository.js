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
  },

  deleteQuizById: async (quizId) => {
    return await prisma.quiz.delete({ where: { id: quizId } });
  },

  deleteCoverPageByQuizId: async (quizId) => {
    return await prisma.coverPage.delete({ where: { quizId } });
  },

  deleteSectionsByQuizId: async (quizId) => {
    return await prisma.section.deleteMany({ where: { quizId } });
  },

  deleteQuestionsBySectionId: async (sectionId) => {
    return await prisma.question.deleteMany({ where: { sectionId } });
  },

  deleteOptionsByQuestionId: async (questionId) => {
    return await prisma.option.deleteMany({ where: { questionId } });
  }
};
