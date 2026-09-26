import { createClient } from "@supabase/supabase-js";
import { Question } from "../types";

const SUPABASE_URL = "https://vvaiengnuieelbxzzkdf.supabase.co";
const SUPABASE_KEY = "sb_publishable_FanGD-DVADoczURk9J5eLA_j_RYoGvz";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function fetchSupabaseQuestions(): Promise<Question[]> {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("*");
    
    if (error) {
      console.error("Supabase fetch error:", error);
      return [];
    }

    if (Array.isArray(data) && data.length > 0) {
      return data.map((q: any) => ({
        id: String(q.id || ""),
        subject: q.subject || "General Knowledge",
        topic: q.topic || "General",
        questionEn: q.question_en || q.questionEn || "",
        questionHi: q.question_hi || q.questionHi || "",
        optionsEn: Array.isArray(q.options_en)
          ? q.options_en
          : [q.option_a_en || "", q.option_b_en || "", q.option_c_en || "", q.option_d_en || ""],
        optionsHi: Array.isArray(q.options_hi)
          ? q.options_hi
          : [q.option_a_hi || "", q.option_b_hi || "", q.option_c_hi || "", q.option_d_hi || ""],
        correctAnswer: (q.correct_answer || q.correctAnswer || "A").toUpperCase() as "A" | "B" | "C" | "D",
        explanationEn: q.explanation_en || q.explanationEn || "",
        explanationHi: q.explanation_hi || q.explanationHi || "",
        examTags: Array.isArray(q.exam_tags) ? q.exam_tags : (Array.isArray(q.examTags) ? q.examTags : []),
        likes: q.likes || 0,
        dislikes: q.dislikes || 0
      }));
    }
  } catch (err) {
    console.error("Failed to fetch questions directly from Supabase:", err);
  }
  return [];
}
