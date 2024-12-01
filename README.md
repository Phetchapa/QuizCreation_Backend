# QuizCreation Backend Setup

## ขั้นตอนการรันโปรเจค

1. ติดตั้ง dependencies ทั้งหมดในโปรเจค
   ```bash
   npm install
   ```

2. เข้าไปในโฟลเดอร์ `docker` และสั่งให้ Docker รัน container ของ MongoDB
   ```bash
   cd docker
   docker compose up -d mongo6
   ```

3. กลับมายัง root ของโปรเจค และติดตั้ง Prisma Client
   ```bash
   cd ..
   npm install express @prisma/client
   npx prisma generate
   ```

4. ตรวจสอบให้แน่ใจว่าเวอร์ชันของ `prisma` และ `@prisma/client` ตรงกัน
   ```bash
   npm install prisma@5.22.0 --save-dev
   npm install @prisma/client@5.22.0
   ```

5. รันเซิฟเวอร์ด้วย `nodemon` (หรือสามารถแก้ไขให้มี script `start` ได้ใน package.json)
   ```bash
   nodemon app.js
   ```

## หมายเหตุ
- หากต้องการเพิ่มคำสั่งในการรันให้สามารถใช้ `npm start` ได้ ควรเพิ่ม script ใน `package.json` แบบนี้
  ```json
  "scripts": {
    "start": "node app.js"
  }
  ```

### คำสั่งอื่นๆ
- ตรวจสอบแพคเกจที่ต้องการการสนับสนุน (funding)
  ```bash
  npm fund
  
