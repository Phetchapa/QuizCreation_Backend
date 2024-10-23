// routes/quizRoutes.js
const express = require('express');
const quizController = require('../controllers/quizController');
const geminiController = require('../controllers/geminiController');
const dataController = require('../controllers/dataController');
const router = express.Router();

router.post('/quiz', quizController.createQuiz);
router.get('/quiz', quizController.getQuizzes);
router.get('/quiz/:quizId', quizController.getQuizById);
router.delete('/quiz/:quizId', quizController.deleteQuiz);

// Route สำหรับสร้างคำถามจาก Gemini API
router.post("/generate-quiz", geminiController.generateQuizQuestions);

//test data
router.get('/languages', dataController.getLanguages);
router.get('/responses', dataController.getResponses);

module.exports = router;
