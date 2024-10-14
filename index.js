const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Middleware สำหรับ parse JSON request body
app.use(express.json());

// POST Method เพื่อสร้าง Quiz
app.post('/quiz', async (req, res) => {
  const { quizId, userId, type, coverPage, sections } = req.body;

  try {
    console.log("Request Body: ", req.body); // ตรวจสอบข้อมูลที่รับเข้ามา
    const newQuiz = await prisma.quiz.create({
      data: {
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
      },
    });

    res.status(201).json(newQuiz);
  } catch (error) {
    console.error("Error details: ", error); // แสดงรายละเอียดข้อผิดพลาด
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET Method เพื่อดึงข้อมูล Quiz ทั้งหมด
app.get('/quiz', async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
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

    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// รันเซิร์ฟเวอร์
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
