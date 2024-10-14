// app.js
const express = require('express');
const quizRoutes = require('./routes/quizRoutes');

const app = express();

// Middleware สำหรับ parse JSON request body
app.use(express.json());

// Routes
app.use('/', quizRoutes);

// รันเซิร์ฟเวอร์
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
