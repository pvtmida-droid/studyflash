import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("❌ Supabase environment variables missing!");
  process.exit(1);
}

const supabase = createClient(url, key);

function parseCSV(text) {
  const lines = text.split(/\r?\n/);
  const result = [];
  for (let line of lines) {
    if (!line.trim()) continue;
    const row = [];
    let inQuotes = false;
    let currentVal = "";
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          currentVal += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(currentVal);
        currentVal = "";
      } else {
        currentVal += char;
      }
    }
    row.push(currentVal);
    result.push(row);
  }
  return result;
}

async function run() {
  const csvPath = "d:/vikash/website/all india mock test.csv";
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV File not found at ${csvPath}`);
    process.exit(1);
  }

  const rawText = fs.readFileSync(csvPath, "utf-8");
  const parsedData = parseCSV(rawText);

  if (parsedData.length < 2) {
    console.error("❌ Invalid CSV: No data rows found.");
    process.exit(1);
  }

  const headers = parsedData[0].map(h => h.trim().replace(/^\uFEFF/, '')); // strip BOM
  const dataRows = parsedData.slice(1);

  console.log(`📋 Found ${dataRows.length} question rows in CSV.`);

  // Map header columns
  // Header expected: ID,Subject,Topic,Question (EN),Question (HI),Option A (EN),Option B (EN),Option C (EN),Option D (EN),Option A (HI),Option B (HI),Option C (HI),Option D (HI),Correct Answer,Explanation (EN),Explanation (HI),Exam Tags
  const formattedQuestions = [];
  const updatedCsvRows = [headers.join(",")];

  dataRows.forEach((row, idx) => {
    const qNum = String(idx + 1).padStart(3, '0');
    const uniqueId = `live2026-${qNum}`;

    const subject = row[1]?.trim() || "Static GK";
    const topic = row[2]?.trim() || "UP GK & All India GK";
    const questionEn = row[3]?.trim() || "";
    const questionHi = row[4]?.trim() || questionEn;
    const optionAEn = row[5]?.trim() || "";
    const optionBEn = row[6]?.trim() || "";
    const optionCEn = row[7]?.trim() || "";
    const optionDEn = row[8]?.trim() || "";
    const optionAHi = row[9]?.trim() || optionAEn;
    const optionBHi = row[10]?.trim() || optionBEn;
    const optionCHi = row[11]?.trim() || optionCEn;
    const optionDHi = row[12]?.trim() || optionDEn;
    
    let rawAns = row[13]?.trim().toUpperCase() || "A";
    let correctAnswer = "A";
    if (["A", "B", "C", "D"].includes(rawAns)) correctAnswer = rawAns;
    else if (rawAns === "1") correctAnswer = "A";
    else if (rawAns === "2") correctAnswer = "B";
    else if (rawAns === "3") correctAnswer = "C";
    else if (rawAns === "4") correctAnswer = "D";

    const explanationEn = row[14]?.trim() || "";
    const explanationHi = row[15]?.trim() || explanationEn;
    const rawTag = row[16]?.trim() || "up-police";
    const examTags = Array.from(new Set(["All India Live Test", "All India Mock Test", "live2026", rawTag, "up-police"]));

    if (questionEn || questionHi) {
      formattedQuestions.push({
        id: uniqueId,
        subject: subject,
        topic: topic,
        question_en: questionEn,
        question_hi: questionHi,
        options_en: [optionAEn, optionBEn, optionCEn, optionDEn],
        options_hi: [optionAHi, optionBHi, optionCHi, optionDHi],
        correct_answer: correctAnswer,
        explanation_en: explanationEn,
        explanation_hi: explanationHi,
        exam_tags: examTags
      });

      // Format clean CSV row for output
      const esc = (val) => {
        if (!val) return '""';
        if (val.includes(',') || val.includes('"') || val.includes('\n')) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      };

      updatedCsvRows.push([
        uniqueId,
        esc(subject),
        esc(topic),
        esc(questionEn),
        esc(questionHi),
        esc(optionAEn),
        esc(optionBEn),
        esc(optionCEn),
        esc(optionDEn),
        esc(optionAHi),
        esc(optionBHi),
        esc(optionCHi),
        esc(optionDHi),
        correctAnswer,
        esc(explanationEn),
        esc(explanationHi),
        esc(rawTag)
      ].join(","));
    }
  });

  console.log(`✅ Processed ${formattedQuestions.length} unique questions with IDs (live2026-001 to live2026-${String(formattedQuestions.length).padStart(3, '0')}).`);

  // 1. Rewrite source CSV with unique IDs if file is not locked by Excel
  try {
    fs.writeFileSync(csvPath, updatedCsvRows.join("\n"), "utf-8");
    console.log(`💾 Source CSV rewritten with unique IDs at ${csvPath}`);
  } catch (err) {
    console.warn(`⚠️ Could not rewrite source CSV (file may be open in Excel): ${err.message}`);
    // Save to updated CSV copy
    const copyPath = "d:/vikash/website/all_india_mock_test_updated.csv";
    fs.writeFileSync(copyPath, updatedCsvRows.join("\n"), "utf-8");
    console.log(`💾 Saved updated CSV copy with unique IDs at ${copyPath}`);
  }

  // 2. Upsert into Supabase `questions` table in batches of 50
  const BATCH_SIZE = 50;
  for (let i = 0; i < formattedQuestions.length; i += BATCH_SIZE) {
    const batch = formattedQuestions.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from("questions")
      .upsert(batch, { onConflict: "id" });

    if (error) {
      console.error(`❌ Batch ${i/BATCH_SIZE + 1} upsert error:`, error.message);
    } else {
      console.log(`🚀 Upserted batch ${i/BATCH_SIZE + 1} (${batch.length} questions) to Supabase questions table.`);
    }
  }

  // 3. Upsert Mock Test in Supabase `mock_tests` table if present
  const frontendQuestions = formattedQuestions.map(q => ({
    id: q.id,
    subject: q.subject,
    topic: q.topic,
    questionEn: q.question_en,
    questionHi: q.question_hi,
    optionsEn: q.options_en,
    optionsHi: q.options_hi,
    correctAnswer: q.correct_answer,
    explanationEn: q.explanation_en,
    explanationHi: q.explanation_hi,
    examTags: q.exam_tags,
    likes: 100,
    dislikes: 0
  }));

  const mockTestPayload = {
    id: "live_mega_test",
    title_en: "All India Live Test 2026 (160+ Questions)",
    title_hi: "ऑल इंडिया लाइव टेस्ट 2026 (160+ प्रश्न)",
    subject: "All India GK & UP Police",
    exam: "All India Live Test",
    duration: 120,
    total_questions: frontendQuestions.length,
    total_marks: frontendQuestions.length * 2,
    questions: frontendQuestions,
    is_previous_year: false,
    year: "2026"
  };

  const { error: mockErr } = await supabase
    .from("mock_tests")
    .upsert([mockTestPayload], { onConflict: "id" });

  if (mockErr) {
    console.log(`⚠️ Note on mock_tests table: ${mockErr.message}`);
  } else {
    console.log(`🎉 Upserted All India Mega Live Test to Supabase mock_tests table!`);
  }

  // Save a JSON export of questions to src/allIndiaLiveQuestions.json for zero-latency fallback
  const jsonPath = "d:/vikash/website/studyflash---web/src/allIndiaLiveQuestions.json";
  fs.writeFileSync(jsonPath, JSON.stringify(frontendQuestions, null, 2), "utf-8");
  console.log(`📦 Exported JSON of ${frontendQuestions.length} questions to ${jsonPath}`);
}

run();
