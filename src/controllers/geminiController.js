const { GoogleGenerativeAI } = require("@google/generative-ai");

// ตั้งค่า Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyCImWU1hYBoqZ-KoErXe9I0YgyxIZxJb5s');

exports.generateQuizQuestions = async (req, res) => {
    try {
        const { topic, numQuestions } = req.body; // รับข้อความและจำนวนคำถามจากผู้ใช้

        // ปรับ prompt เพื่อให้สร้างคำถามหลายข้อในครั้งเดียว
        const prompt = `
          Create ${numQuestions} multiple choice quiz questions about ${topic}, where each question has 4 options, and one of the options is correct.
          The questions and options should be returned in this JSON schema:
          [
            {
              "question": {
                "text": "string",
                "required": "boolean",
                "options": [
                  {
                    "text": "string",
                    "isCorrect": "boolean"
                  }
                ]
              }
            }
          ]
        `;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generation_config: { "response_mime_type": "application/json" }
        });

        const result = await model.generateContent(prompt);
        const candidates = result.response?.candidates;

        if (candidates && candidates.length > 0) {
            let rawContent = candidates[0].content?.parts[0]?.text;
            rawContent = rawContent.replace(/```json|```/g, '').trim();

            const generatedQuestions = JSON.parse(rawContent);

            // ส่งคำถามทั้งหมดกลับไปยังผู้ใช้
            res.json({ generatedQuiz: generatedQuestions });
        } else {
            res.status(500).json({ message: "No content generated from the API." });
        }
    } catch (error) {
        console.error("Error generating quiz questions:", error);
        res.status(500).json({ message: "Failed to generate quiz questions." });
    }
};