const express = require('express');
const cors = require('cors'); // เพิ่มการเรียกใช้งาน cors
const quizRoutes = require('./src/routes/quizRoutes');

const app = express();

// กำหนดค่า CORS เพื่ออนุญาตให้ localhost:3000 เข้าถึง API ได้
app.use(cors({
  origin: 'http://localhost:3000' // ระบุโดเมนที่อนุญาต
}));

// Middleware สำหรับ parse JSON request body
app.use(express.json());

// Routes
app.use('/', quizRoutes);

// รันเซิร์ฟเวอร์
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
