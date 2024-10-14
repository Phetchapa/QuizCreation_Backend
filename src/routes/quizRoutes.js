// routes/quizRoutes.js
const express = require('express');
const quizController = require('../controllers/quizController');
const router = express.Router();

router.post('/quiz', quizController.createQuiz);
router.get('/quiz', quizController.getQuizzes);
router.get('/quiz/:quizId', quizController.getQuizById);

module.exports = router;
