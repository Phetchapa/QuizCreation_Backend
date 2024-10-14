// controllers/quizController.js
const quizService = require('../services/quizService');

module.exports = {
  createQuiz: async (req, res) => {
    const { quizId, userId, type, coverPage, sections } = req.body;

    try {
      const newQuiz = await quizService.createQuiz({
        quizId,
        userId,
        type,
        coverPage: coverPage ? {
          create: {
            quizTitle: coverPage.quizTitle,
            description: coverPage.description,
            buttonText: coverPage.buttonText,
            imagePath: coverPage.imagePath,
          },
        } : undefined,
        sections: {
          create: sections.map(section => ({
            sectionId: section.sectionId,
            sectionNumber: section.sectionNumber,
            sectionTitle: section.sectionTitle,
            sectionDescription: section.sectionDescription,
            questions: {
              create: section.questions.map(question => ({
                questionId: question.questionId,
                type: question.type,
                text: question.text,
                imagePath: question.imagePath,
                required: question.required,
                points: question.points,
                options: {
                  create: question.options.map(option => ({
                    optionId: option.optionId,
                    text: option.text,
                    imagePath: option.imagePath,
                    isCorrect: option.isCorrect,
                    weight: option.weight,
                  })),
                },
              })),
            },
          })),
        },
      });

      res.status(201).json(newQuiz);
    } catch (error) {
      console.error("Error details: ", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getQuizzes: async (req, res) => {
    try {
      const quizzes = await quizService.getAllQuizzes();
      res.status(200).json(quizzes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getQuizById: async (req, res) => {
    const { quizId } = req.params;
    try {
      const quiz = await quizService.getQuizById(quizId);
      res.status(200).json(quiz);
    } catch (error) {
      console.error(error.message);
      res.status(404).json({ error: 'Quiz not found' });
    }
  }
};
