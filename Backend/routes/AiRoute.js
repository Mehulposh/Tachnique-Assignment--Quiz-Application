// routes/AIRoutes.js
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/generate-quiz", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "GEMINI_API_KEY is not configured on the server",
      });
    }

    // Call Google Gemini REST API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a quiz about "${prompt}". Return ONLY valid JSON with this exact structure:
{
  "title": "Quiz Title",
  "questions": [
    {
      "id": "q1",
      "type": "MCQ",
      "question": "Question text",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": "Option 1"
    },
    {
      "id": "q2",
      "type": "TrueFalse",
      "question": "Question text",
      "correctAnswer": "true"
    },
    {
      "id": "q3",
      "type": "Text",
      "question": "Question text",
      "correctAnswer": "answer"
    }
  ]
}
Generate EXACTLY 5 questions with a mix of MCQ, True/False, and Text.
Return ONLY pure JSON, no explanation, no markdown.`
                },
              ],
            },
          ],
        }),
      }
    );

    const rawData = await geminiResponse.json();
    console.log("Gemini raw response:", rawData);

    if (!geminiResponse.ok) {
      return res.status(500).json({
        success: false,
        message:
          rawData.error?.message || "Gemini API request failed",
      });
    }

    // Gemini response shape:
    // { candidates: [ { content: { parts: [ { text: '...json...' } ] } } ] }

    const candidate = rawData.candidates?.[0];
    const textPart = candidate?.content?.parts?.[0]?.text;

    if (!textPart) {
      return res.status(500).json({
        success: false,
        message: "Invalid Gemini response format",
      });
    }

    let rawText = textPart.trim();
    rawText = rawText.replace(/```json|```/g, "").trim();

    let quizJson;
    try {
      quizJson = JSON.parse(rawText);
    } catch (err) {
      console.error("JSON parse error from Gemini:", rawText);
      return res.status(500).json({
        success: false,
        message: "Gemini did not return valid JSON",
      });
    }

    return res.json({
      success: true,
      data: quizJson,
    });
  } catch (error) {
    console.error("generate-quiz error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate quiz with AI",
      error: error.message,
    });
  }
});

export default router;
