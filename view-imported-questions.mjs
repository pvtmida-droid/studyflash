import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  console.log("Config missing");
  process.exit(1);
}

const supabase = createClient(url, key);

async function run() {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("id, subject, topic, exam_tags, question_en")
      .limit(10);
    
    if (error) {
      console.log("Error reading database:", error.message);
    } else {
      console.log(`=== RECENTLY IMPORTED QUESTIONS (Total: ${data.length} checked) ===`);
      data.forEach((q, idx) => {
        console.log(`[Q ${idx+1}] ID: ${q.id} | Subject: "${q.subject}" | Topic: "${q.topic}" | Tags: ${JSON.stringify(q.exam_tags)}`);
      });
    }
  } catch (err) {
    console.log("Exception:", err);
  }
}

run();
