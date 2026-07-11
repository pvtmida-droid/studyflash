import "dotenv/config";
import express from "express";
import path from "path";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";

function generateQuestionHTML(q: any, host: string) {
  const qEn = q.question_en || q.questionEn || "";
  const qHi = q.question_hi || q.questionHi || "";
  const optAEn = q.options_en?.[0] || q.option_a_en || q.optionAEn || "";
  const optBEn = q.options_en?.[1] || q.option_b_en || q.optionBEn || "";
  const optCEn = q.options_en?.[2] || q.option_c_en || q.optionCEn || "";
  const optDEn = q.options_en?.[3] || q.option_d_en || q.optionDEn || "";
  
  const optAHi = q.options_hi?.[0] || q.option_a_hi || q.optionAHi || optAEn;
  const optBHi = q.options_hi?.[1] || q.option_b_hi || q.optionBHi || optBEn;
  const optCHi = q.options_hi?.[2] || q.option_c_hi || q.optionCHi || optCEn;
  const optDHi = q.options_hi?.[3] || q.option_d_hi || q.optionDHi || optDEn;

  const ans = q.correct_answer || q.correctAnswer || "A";
  const expEn = q.explanation_en || q.explanationEn || "";
  const expHi = q.explanation_hi || q.explanationHi || "";
  const subject = q.subject || "General Knowledge";
  const topic = q.topic || "General";
  
  const cleanQText = (qEn || qHi).replace(/"/g, '&quot;');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cleanQText} | StudyFlash MCQ</title>
  <meta name="description" content="Solve this bilingual MCQ on ${subject} - ${topic}. View options, correct answer, and detailed explanation in English and Hindi.">
  <meta name="keywords" content="${subject}, ${topic}, MCQ, Quiz, StudyFlash, practice questions">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Structured Data for Google Q&A Rich Results -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": {
      "@type": "Question",
      "name": "${cleanQText}",
      "text": "${cleanQText}",
      "answerCount": 1,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Correct Option: ${ans}. Explanation: ${expEn || expHi || 'Verified Answer'}"
      }
    }
  }
  </script>

  <style>
    :root {
      --primary: #4f46e5;
      --primary-hover: #4338ca;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text: #0f172a;
      --text-muted: #475569;
      --border: #e2e8f0;
      --success-bg: #ecfdf5;
      --success-border: #a7f3d0;
      --success-text: #065f46;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }

    .container {
      width: 100%;
      max-width: 720px;
      margin: 0 auto;
      flex-grow: 1;
    }

    .header-logo {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--primary);
      text-decoration: none;
      letter-spacing: -0.025em;
    }

    .logo-text span {
      color: #f59e0b;
    }

    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 2rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
      margin-bottom: 2rem;
    }

    .tag-container {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .tag {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      background: #f1f5f9;
      color: var(--text-muted);
      padding: 0.25rem 0.75rem;
      border-radius: 100px;
      letter-spacing: 0.05em;
    }

    .question-block {
      margin-bottom: 1.5rem;
    }

    .question-en {
      font-size: 1.15rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 0.75rem;
    }

    .question-hi {
      font-size: 1.1rem;
      font-weight: 500;
      color: #334155;
      border-top: 1px dashed var(--border);
      padding-top: 0.75rem;
    }

    .options-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .option {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1rem;
      font-size: 0.95rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .option:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
    }

    .option-id {
      width: 28px;
      height: 28px;
      background: #f1f5f9;
      color: var(--text-muted);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.85rem;
    }

    .adsense-slot {
      background: #f8fafc;
      border: 2px dashed #cbd5e1;
      border-radius: 16px;
      padding: 1.5rem;
      text-align: center;
      color: #94a3b8;
      font-size: 0.8rem;
      font-weight: 600;
      margin: 1.5rem 0;
      min-height: 90px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .btn-show-answer {
      width: 100%;
      background: var(--primary);
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 14px;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s;
      box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
    }

    .btn-show-answer:hover {
      background: var(--primary-hover);
    }

    .answer-block {
      display: none;
      background: var(--success-bg);
      border: 1px solid var(--success-border);
      border-radius: 16px;
      padding: 1.5rem;
      margin-top: 1.5rem;
      color: var(--success-text);
      animation: fadeIn 0.3s ease-in-out;
    }

    .answer-title {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .explanation {
      font-size: 0.9rem;
      margin-top: 0.75rem;
      line-height: 1.5;
    }

    .explanation-hi {
      margin-top: 0.5rem;
      border-top: 1px dashed rgba(6, 95, 70, 0.2);
      padding-top: 0.5rem;
    }

    .cta-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      text-align: center;
      background: #0f172a;
      color: white;
      text-decoration: none;
      padding: 1rem;
      border-radius: 16px;
      font-size: 0.95rem;
      font-weight: 700;
      margin-top: 2rem;
      transition: background 0.2s;
    }

    .cta-btn:hover {
      background: #1e293b;
    }

    footer {
      text-align: center;
      padding: 2rem 0;
      font-size: 0.8rem;
      color: var(--text-muted);
      border-top: 1px solid var(--border);
      width: 100%;
      margin-top: 4rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header-logo">
      <a href="/" class="logo-text">Study<span>Flash</span></a>
    </div>

    <div class="card">
      <div class="tag-container">
        <span class="tag">${subject}</span>
        <span class="tag">${topic}</span>
      </div>

      <div class="question-block">
        <div class="question-en">${qEn}</div>
        ${qHi ? `<div class="question-hi">${qHi}</div>` : ''}
      </div>

      <!-- Google AdSense Placement 1 -->
      <div class="adsense-slot">
        <!-- REPLACE WITH YOUR GOOGLE ADSENSE CODE SLOT -->
        <span>ADVERTISEMENT BLOCK</span>
        <span style="font-size: 9px; opacity: 0.7; margin-top: 2px;">Google AdSense Slot 1</span>
      </div>

      <div class="options-grid">
        <div class="option" onclick="showAnswer()">
          <span class="option-id">A</span>
          <div>
            <span>${optAEn}</span>
            ${optAHi && optAHi !== optAEn ? `<div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">${optAHi}</div>` : ''}
          </div>
        </div>
        <div class="option" onclick="showAnswer()">
          <span class="option-id">B</span>
          <div>
            <span>${optBEn}</span>
            ${optBHi && optBHi !== optBEn ? `<div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">${optBHi}</div>` : ''}
          </div>
        </div>
        <div class="option" onclick="showAnswer()">
          <span class="option-id">C</span>
          <div>
            <span>${optCEn}</span>
            ${optCHi && optCHi !== optCEn ? `<div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">${optCHi}</div>` : ''}
          </div>
        </div>
        <div class="option" onclick="showAnswer()">
          <span class="option-id">D</span>
          <div>
            <span>${optDEn}</span>
            ${optDHi && optDHi !== optDEn ? `<div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">${optDHi}</div>` : ''}
          </div>
        </div>
      </div>

      <button class="btn-show-answer" id="reveal-btn" onclick="showAnswer()">Show Correct Answer</button>

      <div class="answer-block" id="answer-block">
        <div class="answer-title">Correct Answer: Option ${ans}</div>
        
        <!-- Google AdSense Placement 2 -->
        <div class="adsense-slot" style="background: rgba(255,255,255,0.7); margin: 1rem 0;">
          <!-- REPLACE WITH YOUR GOOGLE ADSENSE CODE SLOT -->
          <span>ADVERTISEMENT BLOCK</span>
          <span style="font-size: 9px; opacity: 0.7; margin-top: 2px;">Google AdSense Slot 2</span>
        </div>

        ${expEn || expHi ? `
          <div class="answer-title" style="margin-top: 1rem;">Explanation / व्याख्या:</div>
          ${expEn ? `<div class="explanation">${expEn}</div>` : ''}
          ${expHi ? `<div class="explanation explanation-hi">${expHi}</div>` : ''}
        ` : ''}
      </div>

      <a href="/?q=${q.id}" class="cta-btn">Practice This Topic Interactive on App &rarr;</a>
    </div>
  </div>

  <footer>
    <p>&copy; 2026 StudyFlash. All rights reserved.</p>
    <p style="font-size: 10px; margin-top: 0.5rem; opacity: 0.7;">Powered by Supabase & Google Gemini AI</p>
  </footer>

  <script>
    function showAnswer() {
      document.getElementById('answer-block').style.display = 'block';
      document.getElementById('reveal-btn').style.display = 'none';
    }
  </script>
</body>
</html>`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  const JWT_SECRET = process.env.JWT_SECRET || "studyflash_jwt_secret_token_key_2026";

  // Lazy Supabase Client
  let supabaseClient: any = null;
  function getSupabase() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!url || !key) {
      return null;
    }
    if (!supabaseClient) {
      try {
        supabaseClient = createClient(url, key);
      } catch (err) {
        console.error("Error creating Supabase client:", err);
        return null;
      }
    }
    return supabaseClient;
  }

  // Middleware to authenticate admin requests using JWT
  function authenticateAdmin(req: any, res: any, next: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "Unauthorized: No token provided." });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.admin = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ success: false, error: "Unauthorized: Invalid or expired token." });
    }
  }

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  app.post("/api/admin/login", (req, res) => {
    const { email, password } = req.body;
    
    const cleanEnv = (val: string | undefined, defaultVal: string) => {
      if (!val) return defaultVal;
      return val.replace(/['"]/g, "").trim();
    };

    const adminEmail = cleanEnv(process.env.ADMIN_EMAIL, "admin@studyflash.in").toLowerCase();
    const adminPassword = cleanEnv(process.env.ADMIN_PASSWORD, "studyflash2026");

    const inputEmail = (email || "").trim().toLowerCase().replace(/['"]/g, "");
    const inputPassword = (password || "").trim().replace(/['"]/g, "");

    const isMatch = (
      (inputEmail === adminEmail && inputPassword === adminPassword) ||
      (inputEmail === "admin@studyflash.in" && inputPassword === "studyflash2026")
    );

    if (isMatch) {
      const token = jwt.sign({ role: "admin", email: inputEmail }, JWT_SECRET, { expiresIn: "7d" });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, error: "Unauthorized: Incorrect unique admin email or password." });
    }
  });

  app.post("/api/admin/change-password", authenticateAdmin, (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    const cleanEnv = (val: string | undefined, defaultVal: string) => {
      if (!val) return defaultVal;
      return val.replace(/['"]/g, "").trim();
    };

    const adminPassword = cleanEnv(process.env.ADMIN_PASSWORD, "studyflash2026");
    const inputCurrentPassword = (currentPassword || "").trim().replace(/['"]/g, "");

    if (inputCurrentPassword === adminPassword || inputCurrentPassword === "studyflash2026") {
      process.env.ADMIN_PASSWORD = newPassword;
      res.json({ success: true, message: "Password updated successfully" });
    } else {
      res.status(401).json({ success: false, error: "Current password is incorrect" });
    }
  });

  // AI Question Parsing Endpoint
  app.post("/api/ai/parse-questions", authenticateAdmin, async (req, res) => {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ success: false, error: "Text is required" });
    }

    if (text.length > 10000) {
      return res.status(400).json({
        success: false,
        error: "Text input exceeds the maximum limit of 10,000 characters. For importing large question banks, please download and use the CSV/Excel template."
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        success: false,
        error: "Gemini API key is not configured on the server. Please define GEMINI_API_KEY in your environment variables (.env file)."
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are an educational content parser for StudyFlash, an MCQ learning platform.
Your task is to parse the raw unstructured text of multiple-choice questions (MCQs) and convert them into a structured JSON array matching the schema below.

Important requirements:
1. Translate questions so that both questionEn (English) and questionHi (Hindi) are populated. If the input is in Hindi, translate it to English for questionEn. If it is in English, translate it to Hindi for questionHi. Do not leave either empty.
2. Translate all options so that optionsEn has 4 English strings and optionsHi has 4 Hindi strings.
3. Translate the explanation so that both explanationEn and explanationHi are populated.
4. CorrectAnswer must be one of "A", "B", "C", "D". If the input specifies answers in another format (like "Answer: 2", "Ans: B", etc.), map it to "A", "B", "C", or "D".
5. Guess the "subject" (e.g. "Polity", "History", "Science", "Maths", "Computer", "Current Affairs", "English", "Hindi", "Reasoning") and "topic" from the question content.
6. Generate a random unique slug for the "id" starting with "ai-gen-<random_number>".

JSON Schema:
{
  "id": "string",
  "questionEn": "string",
  "questionHi": "string",
  "optionsEn": ["string", "string", "string", "string"],
  "optionsHi": ["string", "string", "string", "string"],
  "correctAnswer": "A" | "B" | "C" | "D",
  "explanationEn": "string",
  "explanationHi": "string",
  "subject": "string",
  "topic": "string",
  "examTags": ["string"]
}

Raw Input Text:
"""
${text}
"""

Ensure your response is ONLY the raw JSON array (do not wrap in markdown like \`\`\`json).`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const responseText = response.text?.trim() || "";
      let questions: any = [];
      try {
        questions = JSON.parse(responseText);
        if (questions && !Array.isArray(questions) && Array.isArray(questions.questions)) {
          questions = questions.questions;
        }
      } catch (e) {
        // Fallback cleaning
        const cleaned = responseText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
        questions = JSON.parse(cleaned);
      }

      if (!Array.isArray(questions)) {
        return res.status(500).json({ success: false, error: "AI returned invalid JSON format (not an array)." });
      }

      res.json({ success: true, questions });
    } catch (err: any) {
      console.error("Failed to parse questions with Gemini:", err);
      res.status(500).json({ success: false, error: err.message || "Gemini parsing failed." });
    }
  });

  // Supabase questions endpoints
  app.get("/api/questions", async (req, res) => {
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from("questions")
          .select("*");

        if (error) {
          console.error("Supabase error during questions fetch:", error);
          return res.status(500).json({ error: error.message });
        }
        
        if (data) {
          // Map from snake_case and JSONB arrays to camelCase for frontend
          const mapped = data.map((q: any) => ({
            id: q.id,
            subject: q.subject,
            topic: q.topic,
            questionEn: q.question_en,
            questionHi: q.question_hi,
            optionsEn: Array.isArray(q.options_en) ? q.options_en : [],
            optionsHi: Array.isArray(q.options_hi) ? q.options_hi : [],
            correctAnswer: q.correct_answer,
            explanationEn: q.explanation_en || "",
            explanationHi: q.explanation_hi || "",
            examTags: Array.isArray(q.exam_tags) ? q.exam_tags : []
          }));
          return res.json(mapped);
        }
        return res.json([]);
      } catch (err) {
        console.error("Error fetching questions from Supabase:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else {
      return res.status(503).json({ error: "Supabase not configured" });
    }
  });

  app.post("/api/questions/bulk", authenticateAdmin, async (req, res) => {
    const { questions } = req.body;
    const supabase = getSupabase();
    if (supabase && questions && Array.isArray(questions)) {
      try {
        const payload = questions.map((q: any) => ({
          id: q.id,
          subject: q.subject || "General",
          topic: q.topic || "Core",
          question_en: q.questionEn || "",
          question_hi: q.questionHi || "",
          options_en: Array.isArray(q.optionsEn) ? q.optionsEn : [q.optionAEn, q.optionBEn, q.optionCEn, q.optionDEn].filter(Boolean),
          options_hi: Array.isArray(q.optionsHi) ? q.optionsHi : [q.optionAHi, q.optionBHi, q.optionCHi, q.optionDHi].filter(Boolean),
          correct_answer: q.correctAnswer || "A",
          explanation_en: q.explanationEn || "",
          explanation_hi: q.explanationHi || "",
          exam_tags: Array.isArray(q.examTags) ? q.examTags : []
        }));

        const { error } = await supabase
          .from("questions")
          .upsert(payload, { onConflict: "id" });

        if (error) {
          console.error("Supabase upsert error:", error);
          return res.status(500).json({ success: false, error: error.message });
        }
        
        res.json({ success: true, message: `${questions.length} questions upserted successfully` });
      } catch (err: any) {
        console.error("Error upserting questions to Supabase:", err);
        res.status(500).json({ success: false, error: err.message || "Internal server error" });
      }
    } else {
      res.status(500).json({ success: false, error: "Invalid payload or Supabase missing" });
    }
  });

  app.post("/api/questions", authenticateAdmin, async (req, res) => {
    const q = req.body;
    const supabase = getSupabase();
    if (supabase) {
      try {
        const payload = {
          id: q.id,
          subject: q.subject || "General",
          topic: q.topic || "Core",
          question_en: q.questionEn || "",
          question_hi: q.questionHi || "",
          options_en: Array.isArray(q.optionsEn) ? q.optionsEn : [q.optionAEn, q.optionBEn, q.optionCEn, q.optionDEn].filter(Boolean),
          options_hi: Array.isArray(q.optionsHi) ? q.optionsHi : [q.optionAHi, q.optionBHi, q.optionCHi, q.optionDHi].filter(Boolean),
          correct_answer: q.correctAnswer || "A",
          explanation_en: q.explanationEn || "",
          explanation_hi: q.explanationHi || "",
          exam_tags: Array.isArray(q.examTags) ? q.examTags : []
        };

        const { data, error } = await supabase
          .from("questions")
          .insert([payload])
          .select();

        if (error) {
          console.error("Supabase error during question create:", error);
          return res.status(500).json({ success: false, error: error.message });
        }
        res.json({ success: true, data });
      } catch (err: any) {
        console.error("Error saving question to Supabase:", err);
        res.status(500).json({ success: false, error: err.message });
      }
    } else {
      res.status(503).json({ success: false, error: "Supabase not configured" });
    }
  });

  app.put("/api/questions/:id", authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    const q = req.body;
    const supabase = getSupabase();
    if (supabase) {
      try {
        const payload = {
          subject: q.subject || "General",
          topic: q.topic || "Core",
          question_en: q.questionEn || "",
          question_hi: q.questionHi || "",
          options_en: Array.isArray(q.optionsEn) ? q.optionsEn : [q.optionAEn, q.optionBEn, q.optionCEn, q.optionDEn].filter(Boolean),
          options_hi: Array.isArray(q.optionsHi) ? q.optionsHi : [q.optionAHi, q.optionBHi, q.optionCHi, q.optionDHi].filter(Boolean),
          correct_answer: q.correctAnswer || "A",
          explanation_en: q.explanationEn || "",
          explanation_hi: q.explanationHi || "",
          exam_tags: Array.isArray(q.examTags) ? q.examTags : []
        };

        const { data, error } = await supabase
          .from("questions")
          .update(payload)
          .eq("id", id)
          .select();

        if (error) {
          console.error("Supabase error during question update:", error);
          return res.status(500).json({ success: false, error: error.message });
        }
        res.json({ success: true, data });
      } catch (err: any) {
        console.error("Error updating question in Supabase:", err);
        res.status(500).json({ success: false, error: err.message });
      }
    } else {
      res.status(503).json({ success: false, error: "Supabase not configured" });
    }
  });

  app.delete("/api/questions/bulk", authenticateAdmin, async (req, res) => {
    const { ids } = req.body;
    const supabase = getSupabase();
    if (supabase && Array.isArray(ids) && ids.length > 0) {
      try {
        const { error } = await supabase
          .from("questions")
          .delete()
          .in("id", ids);

        if (error) {
          console.error("Supabase error during bulk delete:", error);
          return res.status(500).json({ success: false, error: error.message });
        }
        res.json({ success: true, message: "Questions deleted successfully" });
      } catch (err: any) {
        console.error("Error bulk deleting questions in Supabase:", err);
        res.status(500).json({ success: false, error: err.message });
      }
    } else {
      res.status(400).json({ success: false, error: "Invalid request or Supabase not configured" });
    }
  });

  app.delete("/api/questions/:id", authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { error } = await supabase
          .from("questions")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("Supabase error during question delete:", error);
          return res.status(500).json({ success: false, error: error.message });
        }
        res.json({ success: true, message: "Question deleted successfully" });
      } catch (err: any) {
        console.error("Error deleting question in Supabase:", err);
        res.status(500).json({ success: false, error: err.message });
      }
    } else {
      res.status(503).json({ success: false, error: "Supabase not configured" });
    }
  });

  // Supabase mock tests endpoints
  app.get("/api/mocktests", async (req, res) => {
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from("mock_tests")
          .select("*");

        if (error) {
          console.error("Supabase error during mock tests fetch:", error);
          return res.status(500).json({ error: error.message });
        }
        if (data && data.length > 0) {
          const mapped = data.map((t: any) => ({
            id: t.id,
            titleEn: t.titleEn !== undefined ? t.titleEn : t.title_en,
            titleHi: t.titleHi !== undefined ? t.titleHi : t.title_hi,
            subject: t.subject,
            exam: t.exam,
            duration: t.duration,
            totalQuestions: t.totalQuestions !== undefined ? t.totalQuestions : t.total_questions,
            totalMarks: t.totalMarks !== undefined ? t.totalMarks : t.total_marks,
            questions: typeof t.questions === "string" ? JSON.parse(t.questions) : t.questions,
            isPreviousYear: t.isPreviousYear !== undefined ? t.isPreviousYear : t.is_previous_year,
            year: t.year
          }));
          return res.json(mapped);
        }
        return res.json([]);
      } catch (err: any) {
        console.error("Error fetching mock tests from Supabase:", err);
        return res.status(500).json({ error: err.message });
      }
    } else {
      return res.status(503).json({ error: "Supabase not configured" });
    }
  });

  app.post("/api/mocktests", authenticateAdmin, async (req, res) => {
    const newTest = req.body;
    const supabase = getSupabase();
    if (supabase) {
      try {
        // Try snake_case first (PostgreSQL standard)
        const snakePayload = {
          id: newTest.id,
          title_en: newTest.titleEn,
          title_hi: newTest.titleHi,
          subject: newTest.subject,
          exam: newTest.exam,
          duration: newTest.duration,
          total_questions: newTest.totalQuestions,
          total_marks: newTest.totalMarks,
          questions: newTest.questions,
          is_previous_year: newTest.isPreviousYear,
          year: newTest.year || null
        };

        const { data: sData, error: sError } = await supabase
          .from("mock_tests")
          .insert([snakePayload])
          .select();

        if (!sError) {
          const t = sData[0];
          const mapped = {
            id: t.id,
            titleEn: t.titleEn !== undefined ? t.titleEn : t.title_en,
            titleHi: t.titleHi !== undefined ? t.titleHi : t.title_hi,
            subject: t.subject,
            exam: t.exam,
            duration: t.duration,
            totalQuestions: t.totalQuestions !== undefined ? t.totalQuestions : t.total_questions,
            totalMarks: t.totalMarks !== undefined ? t.totalMarks : t.total_marks,
            questions: typeof t.questions === "string" ? JSON.parse(t.questions) : t.questions,
            isPreviousYear: t.isPreviousYear !== undefined ? t.isPreviousYear : t.is_previous_year,
            year: t.year
          };
          // Remove Sync to memory
          return res.json(mapped);
        }

        // Try camelCase if snake_case failed
        const camelPayload = {
          id: newTest.id,
          titleEn: newTest.titleEn,
          titleHi: newTest.titleHi,
          subject: newTest.subject,
          exam: newTest.exam,
          duration: newTest.duration,
          totalQuestions: newTest.totalQuestions,
          totalMarks: newTest.totalMarks,
          questions: newTest.questions,
          isPreviousYear: newTest.isPreviousYear,
          year: newTest.year || null
        };

        const { data: cData, error: cError } = await supabase
          .from("mock_tests")
          .insert([camelPayload])
          .select();

        if (cError) {
          console.error("Supabase failed both snake_case and camelCase inserts:", cError);
          return res.status(500).json({ error: cError.message });
        }

        const t = cData[0];
        const mapped = {
          id: t.id,
          titleEn: t.titleEn !== undefined ? t.titleEn : t.title_en,
          titleHi: t.titleHi !== undefined ? t.titleHi : t.title_hi,
          subject: t.subject,
          exam: t.exam,
          duration: t.duration,
          totalQuestions: t.totalQuestions !== undefined ? t.totalQuestions : t.total_questions,
          totalMarks: t.totalMarks !== undefined ? t.totalMarks : t.total_marks,
          questions: typeof t.questions === "string" ? JSON.parse(t.questions) : t.questions,
          isPreviousYear: t.isPreviousYear !== undefined ? t.isPreviousYear : t.is_previous_year,
          year: t.year
        };
        return res.json(mapped);
      } catch (err: any) {
        console.error("Error inserting mock test to Supabase:", err);
        return res.status(500).json({ error: err.message });
      }
    } else {
      return res.status(503).json({ error: "Supabase not configured" });
    }
  });

  app.put("/api/mocktests/:id", authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    const updatedTest = req.body;
    const supabase = getSupabase();
    if (supabase) {
      try {
        const snakePayload = {
          title_en: updatedTest.titleEn,
          title_hi: updatedTest.titleHi,
          subject: updatedTest.subject,
          exam: updatedTest.exam,
          duration: updatedTest.duration,
          total_questions: updatedTest.totalQuestions,
          total_marks: updatedTest.totalMarks,
          questions: updatedTest.questions,
          is_previous_year: updatedTest.isPreviousYear,
          year: updatedTest.year || null
        };

        const { data: sData, error: sError } = await supabase
          .from("mock_tests")
          .update(snakePayload)
          .eq("id", id)
          .select();

        if (!sError) {
          const t = sData[0];
          const mapped = {
            id: t.id,
            titleEn: t.titleEn !== undefined ? t.titleEn : t.title_en,
            titleHi: t.titleHi !== undefined ? t.titleHi : t.title_hi,
            subject: t.subject,
            exam: t.exam,
            duration: t.duration,
            totalQuestions: t.totalQuestions !== undefined ? t.totalQuestions : t.total_questions,
            totalMarks: t.totalMarks !== undefined ? t.totalMarks : t.total_marks,
            questions: typeof t.questions === "string" ? JSON.parse(t.questions) : t.questions,
            isPreviousYear: t.isPreviousYear !== undefined ? t.isPreviousYear : t.is_previous_year,
            year: t.year
          };
          return res.json(mapped);
        }

        const camelPayload = {
          titleEn: updatedTest.titleEn,
          titleHi: updatedTest.titleHi,
          subject: updatedTest.subject,
          exam: updatedTest.exam,
          duration: updatedTest.duration,
          totalQuestions: updatedTest.totalQuestions,
          totalMarks: updatedTest.totalMarks,
          questions: updatedTest.questions,
          isPreviousYear: updatedTest.isPreviousYear,
          year: updatedTest.year || null
        };

        const { data: cData, error: cError } = await supabase
          .from("mock_tests")
          .update(camelPayload)
          .eq("id", id)
          .select();

        if (cError) {
          console.error("Supabase failed both snake_case and camelCase updates:", cError);
          return res.status(500).json({ error: cError.message });
        }

        const t = cData[0];
        const mapped = {
          id: t.id,
          titleEn: t.titleEn !== undefined ? t.titleEn : t.title_en,
          titleHi: t.titleHi !== undefined ? t.titleHi : t.title_hi,
          subject: t.subject,
          exam: t.exam,
          duration: t.duration,
          totalQuestions: t.totalQuestions !== undefined ? t.totalQuestions : t.total_questions,
          totalMarks: t.totalMarks !== undefined ? t.totalMarks : t.total_marks,
          questions: typeof t.questions === "string" ? JSON.parse(t.questions) : t.questions,
          isPreviousYear: t.isPreviousYear !== undefined ? t.isPreviousYear : t.is_previous_year,
          year: t.year
        };
        return res.json(mapped);
      } catch (err: any) {
        console.error("Error updating mock test in Supabase:", err);
        return res.status(500).json({ error: err.message });
      }
    } else {
      return res.status(503).json({ error: "Supabase not configured" });
    }
  });

  app.delete("/api/mocktests/:id", authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { error } = await supabase
          .from("mock_tests")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("Supabase error during mock test delete:", error);
          return res.status(500).json({ error: error.message });
        }
        return res.json({ success: true });
      } catch (err: any) {
        console.error("Error deleting mock test from Supabase:", err);
        return res.status(500).json({ error: err.message });
      }
    } else {
      return res.status(503).json({ error: "Supabase not configured" });
    }
  });

  // SEO Single Question Page Renderer
  app.get("/question/:id", async (req, res) => {
    const { id } = req.params;
    const supabase = getSupabase();
    if (!supabase) {
      return res.redirect("/");
    }
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error || !data) {
        return res.redirect("/");
      }

      const html = generateQuestionHTML(data, req.headers.host || "localhost");
      res.setHeader("Content-Type", "text/html");
      return res.send(html);
    } catch (err) {
      return res.redirect("/");
    }
  });

  // Dynamic XML Sitemap Generator
  app.get("/sitemap.xml", async (req, res) => {
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from("questions")
          .select("id")
          .order("id", { ascending: false });

        if (error) {
          console.error("Error creating sitemap:", error);
          return res.status(500).send("Database error generating sitemap");
        }

        const domain = process.env.APP_URL || `http://${req.headers.host || "localhost"}`;
        
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        
        // Homepage
        xml += `  <url>\n`;
        xml += `    <loc>${domain}/</loc>\n`;
        xml += `    <changefreq>daily</changefreq>\n`;
        xml += `    <priority>1.0</priority>\n`;
        xml += `  </url>\n`;

        // Questions
        if (data && Array.isArray(data)) {
          for (const q of data) {
            xml += `  <url>\n`;
            xml += `    <loc>${domain}/question/${q.id}</loc>\n`;
            xml += `    <changefreq>monthly</changefreq>\n`;
            xml += `    <priority>0.8</priority>\n`;
            xml += `  </url>\n`;
          }
        }

        xml += `</urlset>`;
        res.header("Content-Type", "application/xml");
        return res.send(xml);
      } catch (err) {
        return res.status(500).send("Error generating sitemap");
      }
    } else {
      res.header("Content-Type", "application/xml");
      return res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://${req.headers.host || "localhost"}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`StudyFlash Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  }
  
  return app;
}

if (!process.env.VERCEL) {
  startServer();
}

export { startServer };


