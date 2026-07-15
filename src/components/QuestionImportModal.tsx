import React, { useState, ChangeEvent, DragEvent, useEffect } from "react";
import { Upload, X, Check, AlertCircle, Download, Trash2, Edit } from "lucide-react";
import { Question } from "../types";

export interface QuestionImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionsImported: (questions: Question[]) => void;
  isHindi: boolean;
}

const COMMON_SUBJECTS = [
  { id: "GKGS", nameEn: "General Knowledge (GK/GS)", nameHi: "सामान्य ज्ञान (GK/GS)" },
  { id: "Maths", nameEn: "Mathematics", nameHi: "गणित" },
  { id: "Reasoning", nameEn: "Reasoning", nameHi: "तर्कशक्ति" },
  { id: "Hindi", nameEn: "Hindi Language", nameHi: "हिन्दी भाषा" },
  { id: "English", nameEn: "English Language", nameHi: "अंग्रेजी भाषा" },
  { id: "Computer Knowledge", nameEn: "Computer Knowledge", nameHi: "कंप्यूटर ज्ञान" },
  { id: "UP Police Exam", nameEn: "UP Police Special", nameHi: "यूपी पुलिस विशेष" },
  { id: "UP GK", nameEn: "Uttar Pradesh GK", nameHi: "उत्तर प्रदेश सामान्य ज्ञान" }
];

export default function QuestionImportModal({ isOpen, onClose, onQuestionsImported, isHindi }: QuestionImportModalProps) {
  // Preview / Editor state
  const [previewQuestions, setPreviewQuestions] = useState<Question[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editQuestionForm, setEditQuestionForm] = useState<Question | null>(null);

  // CSV Template state
  const [dragActive, setDragActive] = useState(false);
  const [csvFileName, setCsvFileName] = useState("");
  const [csvError, setCsvError] = useState<string | null>(null);

  // Global UI Categorization state
  const [globalSubject, setGlobalSubject] = useState("GKGS");
  const [globalTopic, setGlobalTopic] = useState("General");
  const [globalExamTags, setGlobalExamTags] = useState("");

  // Reset modal state on open/close
  useEffect(() => {
    if (!isOpen) {
      setPreviewQuestions([]);
      setCsvFileName("");
      setCsvError(null);
      setEditingIndex(null);
      setEditQuestionForm(null);
      setGlobalSubject("GKGS");
      setGlobalTopic("General");
      setGlobalExamTags("");
    }
  }, [isOpen]);

  // CSV template downloader (always simplified template format)
  const handleDownloadTemplate = () => {
    const headers = "id,questionEn,questionHi,optionAEn,optionBEn,optionCEn,optionDEn,optionAHi,optionBHi,optionCHi,optionDHi,correctAnswer,explanationEn,explanationHi\n";
    const sampleRow = "sample-id-1,\"Which is the capital of India?\",\"भारत की राजधानी क्या है?\",Mumbai,New Delhi,Kolkata,Chennai,मुंबई,नई दिल्ली,कोलकाता,चेन्नई,B,\"New Delhi is the capital of India.\",\"नई दिल्ली भारत की राजधानी है।\"\n";

    const blob = new Blob([headers + sampleRow], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "studyflash_questions_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV File parser (RFC 4180 compliant, handles newlines inside quotes)
  const parseCSV = (text: string): string[][] => {
    const result: string[][] = [];
    let row: string[] = [];
    let currentVal = "";
    let inQuotes = false;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          currentVal += '"';
          i++; // skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(currentVal);
        currentVal = "";
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        row.push(currentVal);
        currentVal = "";
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        if (row.some(cell => cell.trim() !== "")) {
          result.push(row);
        }
        row = [];
      } else {
        currentVal += char;
      }
    }
    
    if (currentVal || row.length > 0) {
      row.push(currentVal);
      if (row.some(cell => cell.trim() !== "")) {
        result.push(row);
      }
    }
    return result;
  };

  const handleCsvFile = (file: File) => {
    setCsvFileName(file.name);
    setCsvError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsedData = parseCSV(text);
        if (parsedData.length <= 1) {
          throw new Error(isHindi ? "फाइल खाली है या इसमें कोई डेटा नहीं है।" : "File is empty or contains no rows.");
        }

        const headers = parsedData[0].map(h => h.trim().replace(/^"|"$/g, ""));
        const rows = parsedData.slice(1);

        const normalize = (s: string) => s.toLowerCase().replace(/[\s_-]/g, "");

        const aliases: Record<string, string[]> = {
          id: ["id"],
          questionEn: ["questionen", "question", "questiontext", "questionenglish"],
          questionHi: ["questionhi", "questionhindi"],
          optionAEn: ["optionaen", "optiona", "option1", "a", "optionaenglish"],
          optionBEn: ["optionben", "optionb", "option2", "b", "optionbenglish"],
          optionCEn: ["optioncen", "optionc", "option3", "c", "optioncenglish"],
          optionDEn: ["optionden", "optiond", "option4", "d", "optiondenglish"],
          optionAHi: ["optionahi", "optiona_hi", "optionahindi"],
          optionBHi: ["optionbhi", "optionb_hi", "optionbhindi"],
          optionCHi: ["optionchi", "optionc_hi", "optionchindi"],
          optionDHi: ["optiondhi", "optiond_hi", "optiondhindi"],
          correctAnswer: ["correctanswer", "correct", "answer", "correctoption", "ans", "correctans"],
          explanationEn: ["explanationen", "explanation", "exp", "explanationtext", "explanationenglish"],
          explanationHi: ["explanationhi", "exphi", "explanationhindi"]
        };

        const headerIndices: Record<string, number> = {};
        Object.keys(aliases).forEach(field => {
          const possible = aliases[field];
          const matchedIdx = headers.findIndex(h => possible.includes(normalize(h)));
          if (matchedIdx !== -1) {
            headerIndices[field] = matchedIdx;
          }
        });

        // Verify only critical headers (question text and at least four options + correct answer)
        const missingCritical: string[] = [];
        if (headerIndices["questionEn"] === undefined && headerIndices["questionHi"] === undefined) {
          missingCritical.push("questionEn/questionHi");
        }
        if (headerIndices["correctAnswer"] === undefined) missingCritical.push("correctAnswer");

        const hasEnHeaders = 
          headerIndices["optionAEn"] !== undefined &&
          headerIndices["optionBEn"] !== undefined &&
          headerIndices["optionCEn"] !== undefined &&
          headerIndices["optionDEn"] !== undefined;

        const hasHiHeaders = 
          headerIndices["optionAHi"] !== undefined &&
          headerIndices["optionBHi"] !== undefined &&
          headerIndices["optionCHi"] !== undefined &&
          headerIndices["optionDHi"] !== undefined;

        if (!hasEnHeaders && !hasHiHeaders) {
          missingCritical.push("optionA/B/C/D (English or Hindi)");
        }

        if (missingCritical.length > 0) {
          throw new Error(isHindi 
            ? `गलत CSV प्रारूप। ये हेडर गायब हैं: ${missingCritical.join(", ")}। कृपया सही हेडर वाले कॉलम का उपयोग करें।`
            : `Invalid CSV columns. Missing required headers: ${missingCritical.join(", ")}. Please ensure headers match the template.`
          );
        }

        const questions: Question[] = rows
          .filter(row => row.some(cell => cell.trim() !== "")) // skip completely empty rows
          .map((row, idx) => {
            const getVal = (field: string, fallback = "") => {
              const colIdx = headerIndices[field];
              return colIdx !== undefined ? (row[colIdx] || fallback).trim().replace(/^"|"$/g, "") : fallback;
            };

            const qEn = getVal("questionEn");
            const qHi = getVal("questionHi") || qEn;

            if (!qEn && !qHi) {
              throw new Error(isHindi
                ? `पंक्ति ${idx + 2}: प्रश्न का टेक्स्ट (English या Hindi) आवश्यक है।`
                : `Row ${idx + 2}: Question text (English or Hindi) is required.`
              );
            }

            const optAEn = getVal("optionAEn");
            const optBEn = getVal("optionBEn");
            const optCEn = getVal("optionCEn");
            const optDEn = getVal("optionDEn");

            const optAHi = getVal("optionAHi");
            const optBHi = getVal("optionBHi");
            const optCHi = getVal("optionCHi");
            const optDHi = getVal("optionDHi");

            const hasAllEn = optAEn && optBEn && optCEn && optDEn;
            const hasAllHi = optAHi && optBHi && optCHi && optDHi;

            if (!hasAllEn && !hasAllHi) {
              throw new Error(isHindi
                ? `पंक्ति ${idx + 2}: चारों विकल्प (English या Hindi में) आवश्यक हैं।`
                : `Row ${idx + 2}: All four options (in English or Hindi) are required.`
              );
            }

            const resolvedOptAEn = optAEn || optAHi;
            const resolvedOptBEn = optBEn || optBHi;
            const resolvedOptCEn = optCEn || optCHi;
            const resolvedOptDEn = optDEn || optDHi;

            const resolvedOptAHi = optAHi || optAEn;
            const resolvedOptBHi = optBHi || optBEn;
            const resolvedOptCHi = optCHi || optCEn;
            const resolvedOptDHi = optDHi || optDEn;

            let ans = (getVal("correctAnswer").toUpperCase() || "A").trim();
            if (!["A", "B", "C", "D"].includes(ans)) {
              ans = "A"; // Auto-fallback
            }

            return {
              id: getVal("id") || `csv-import-q-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`,
              questionEn: qEn,
              questionHi: qHi,
              optionsEn: [resolvedOptAEn, resolvedOptBEn, resolvedOptCEn, resolvedOptDEn] as [string, string, string, string],
              optionsHi: [resolvedOptAHi, resolvedOptBHi, resolvedOptCHi, resolvedOptDHi] as [string, string, string, string],
              correctAnswer: ans as "A" | "B" | "C" | "D",
              explanationEn: getVal("explanationEn"),
              explanationHi: getVal("explanationHi") || getVal("explanationEn"),
              subject: globalSubject,
              topic: globalTopic,
              examTags: globalExamTags ? globalExamTags.split(",").map(t => t.trim()).filter(Boolean) : ["Practice"],
              likes: 0,
              dislikes: 0
            };
          });

        setPreviewQuestions(questions);
      } catch (err: any) {
        setCsvError(err.message || "Failed to parse CSV file");
        setPreviewQuestions([]);
      }
    };
    reader.readAsText(file);
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleCsvFile(e.dataTransfer.files[0]);
  };

  // Inline editing of parsed preview questions
  const startEditing = (idx: number) => {
    setEditingIndex(idx);
    setEditQuestionForm({ ...previewQuestions[idx] });
  };

  const saveEdit = () => {
    if (editingIndex !== null && editQuestionForm) {
      const updated = [...previewQuestions];
      updated[editingIndex] = editQuestionForm;
      setPreviewQuestions(updated);
      setEditingIndex(null);
      setEditQuestionForm(null);
    }
  };

  const removeQuestion = (idx: number) => {
    const updated = previewQuestions.filter((_, i) => i !== idx);
    setPreviewQuestions(updated);
    if (editingIndex === idx) {
      setEditingIndex(null);
      setEditQuestionForm(null);
    }
  };

  const handleFinalImport = () => {
    if (previewQuestions.length > 0) {
      onQuestionsImported(previewQuestions);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100 dark:border-slate-800">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-850 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
          <div>
            <h2 className="text-xl font-bold text-slate-850 dark:text-white flex items-center gap-2">
              <Upload className="h-5 w-5 text-indigo-500" />
              {isHindi ? "प्रश्न इम्पोर्ट केंद्र" : "CSV Import Center"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isHindi 
                ? "मानक एक्सेल/CSV टेम्पलेट के माध्यम से तुरंत प्रश्न जोड़ें"
                : "Add bilingual questions instantly using standard Excel/CSV templates"
              }
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-white">
            <X className="h-5.5 w-5.5" />
          </button>
        </div>

        {/* Categorization Config Panel */}
        {previewQuestions.length === 0 && (
          <div className="bg-slate-50 dark:bg-slate-950/30 p-5 border-b border-slate-100 dark:border-slate-850 space-y-3.5">
            <div>
              <h4 className="text-[11px] font-bold uppercase text-slate-550 dark:text-slate-400">
                📁 {isHindi ? "प्रश्न वर्गीकरण सेट करें" : "Set Question Categorization"}
              </h4>
              <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5">
                {isHindi
                  ? "सभी आयातित प्रश्नों पर नीचे दिए गए विषय, टॉपिक और एग्जाम टैग लागू होंगे।"
                  : "The selected subject, topic, and exam tags will be applied to all imported questions."
                }
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1.5 border-t border-slate-100 dark:border-slate-850/50">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block uppercase">
                  {isHindi ? "विषय (Subject)" : "Subject"}
                </label>
                <select
                  value={globalSubject}
                  onChange={(e) => setGlobalSubject(e.target.value)}
                  className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  {COMMON_SUBJECTS.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {isHindi ? sub.nameHi : sub.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block uppercase">
                  {isHindi ? "अध्याय / टॉपिक (Topic)" : "Topic / Chapter"}
                </label>
                <input
                  type="text"
                  value={globalTopic}
                  onChange={(e) => setGlobalTopic(e.target.value)}
                  placeholder={isHindi ? "जैसे: Percentage, Internet" : "e.g. Percentage, Internet"}
                  className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block uppercase">
                  {isHindi ? "परीक्षा टैग्स (Exam Tags)" : "Exam Tags"}
                </label>
                <input
                  type="text"
                  value={globalExamTags}
                  onChange={(e) => setGlobalExamTags(e.target.value)}
                  placeholder={isHindi ? "जैसे: SSC CGL, UP Police" : "e.g. SSC CGL, UP Police"}
                  className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Modal Body content area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Main Wizard Forms */}
          {previewQuestions.length === 0 ? (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-850">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl text-indigo-600 dark:text-sky-400">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-xs">
                      {isHindi ? "मानक CSV टेम्पलेट डाउनलोड करें" : "Standard CSV Template"}
                    </h4>
                    <p className="text-[10px] text-slate-550 dark:text-slate-400">
                      {isHindi ? "मैपिंग से बचने के लिए हमारे टेम्पलेट के अनुसार कॉलम भरें।" : "Use this pre-formatted CSV template to skip column mapping completely."}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDownloadTemplate}
                  className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>{isHindi ? "टेम्पलेट डाउनलोड" : "Download Template"}</span>
                </button>
              </div>

              <div 
                onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                className={`p-16 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-colors cursor-pointer text-center relative ${dragActive ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10" : "border-slate-350 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850"}`}
              >
                <input type="file" accept=".csv" onChange={(e) => e.target.files?.[0] && handleCsvFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" id="template-csv-input" style={{ display: 'none' }} />
                <label htmlFor="template-csv-input" className="cursor-pointer flex flex-col items-center">
                  <div className="p-4 bg-emerald-100 dark:bg-emerald-950/40 rounded-full text-emerald-600 mb-4">
                    <Upload className="h-8 w-8 animate-bounce" />
                  </div>
                  <p className="font-bold text-slate-700 dark:text-white mb-2 text-xs">
                    {isHindi ? "यहाँ टेम्पलेट फाइल ड्रैग करें या क्लिक करके ब्राउज़ करें" : "Drag and drop your filled template CSV here or browse"}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Supports standard .csv file format only</p>
                </label>
              </div>

              {csvError && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-655 dark:text-red-400 text-xs rounded-2xl flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{csvError}</span>
                </div>
              )}
            </div>
          ) : (
            
            /* Preview / Editing Stage when questions are loaded */
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-950/10 p-4 rounded-2xl border border-indigo-100/60 dark:border-indigo-950/40">
                <div>
                  <h3 className="font-bold text-indigo-900 dark:text-sky-300 text-xs">
                    ✔️ {isHindi ? "फ़ाइल विश्लेषण सफल" : "Verification Stage"}
                  </h3>
                  <p className="text-[10px] text-slate-555 dark:text-slate-400 mt-0.5">
                    {isHindi 
                      ? `कुल ${previewQuestions.length} प्रश्न मिले। कृपया इम्पोर्ट करने से पहले विवरणों की जाँच करें या संपादित करें।`
                      : `Found ${previewQuestions.length} questions. You can review, edit, or delete them before saving.`
                    }
                  </p>
                </div>
                <button
                  onClick={() => {
                    setPreviewQuestions([]);
                    setCsvFileName("");
                  }}
                  className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-[10.5px] font-bold rounded-xl transition"
                >
                  {isHindi ? "फ़ाइल साफ़ करें" : "Clear File"}
                </button>
              </div>

              {/* Inline Edit Form (only shown when editingIndex is active) */}
              {editingIndex !== null && editQuestionForm && (
                <div className="bg-slate-50 dark:bg-slate-950/30 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fade-in">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-indigo-655 dark:text-sky-400 uppercase">
                      ✏️ {isHindi ? "प्रश्न विवरण संपादित करें" : "Edit Question Details"}
                    </h4>
                    <button
                      onClick={() => { setEditingIndex(null); setEditQuestionForm(null); }}
                      className="p-1 text-slate-400 hover:text-slate-655"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 block uppercase">Question (English)</label>
                      <textarea
                        value={editQuestionForm.questionEn}
                        onChange={(e) => setEditQuestionForm({ ...editQuestionForm, questionEn: e.target.value })}
                        className="w-full border border-slate-200 dark:border-slate-700 p-2.5 text-xs bg-white dark:bg-slate-900 text-slate-805 dark:text-white rounded-xl"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 block uppercase">Question (Hindi)</label>
                      <textarea
                        value={editQuestionForm.questionHi}
                        onChange={(e) => setEditQuestionForm({ ...editQuestionForm, questionHi: e.target.value })}
                        className="w-full border border-slate-200 dark:border-slate-700 p-2.5 text-xs bg-white dark:bg-slate-900 text-slate-805 dark:text-white rounded-xl"
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 block uppercase">Option A (English)</label>
                      <input
                        type="text"
                        value={editQuestionForm.optionsEn[0]}
                        onChange={(e) => {
                          const opts = [...editQuestionForm.optionsEn] as [string, string, string, string];
                          opts[0] = e.target.value;
                          setEditQuestionForm({ ...editQuestionForm, optionsEn: opts });
                        }}
                        className="w-full border border-slate-200 dark:border-slate-700 p-2 text-xs bg-white dark:bg-slate-900 text-slate-805 dark:text-white rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 block uppercase">Option A (Hindi)</label>
                      <input
                        type="text"
                        value={editQuestionForm.optionsHi[0]}
                        onChange={(e) => {
                          const opts = [...editQuestionForm.optionsHi] as [string, string, string, string];
                          opts[0] = e.target.value;
                          setEditQuestionForm({ ...editQuestionForm, optionsHi: opts });
                        }}
                        className="w-full border border-slate-200 dark:border-slate-700 p-2 text-xs bg-white dark:bg-slate-900 text-slate-805 dark:text-white rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 block uppercase">Option B (English)</label>
                      <input
                        type="text"
                        value={editQuestionForm.optionsEn[1]}
                        onChange={(e) => {
                          const opts = [...editQuestionForm.optionsEn] as [string, string, string, string];
                          opts[1] = e.target.value;
                          setEditQuestionForm({ ...editQuestionForm, optionsEn: opts });
                        }}
                        className="w-full border border-slate-200 dark:border-slate-700 p-2 text-xs bg-white dark:bg-slate-900 text-slate-805 dark:text-white rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 block uppercase">Option B (Hindi)</label>
                      <input
                        type="text"
                        value={editQuestionForm.optionsHi[1]}
                        onChange={(e) => {
                          const opts = [...editQuestionForm.optionsHi] as [string, string, string, string];
                          opts[1] = e.target.value;
                          setEditQuestionForm({ ...editQuestionForm, optionsHi: opts });
                        }}
                        className="w-full border border-slate-200 dark:border-slate-700 p-2 text-xs bg-white dark:bg-slate-900 text-slate-805 dark:text-white rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 block uppercase">Option C (English)</label>
                      <input
                        type="text"
                        value={editQuestionForm.optionsEn[2]}
                        onChange={(e) => {
                          const opts = [...editQuestionForm.optionsEn] as [string, string, string, string];
                          opts[2] = e.target.value;
                          setEditQuestionForm({ ...editQuestionForm, optionsEn: opts });
                        }}
                        className="w-full border border-slate-200 dark:border-slate-700 p-2 text-xs bg-white dark:bg-slate-900 text-slate-805 dark:text-white rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 block uppercase">Option C (Hindi)</label>
                      <input
                        type="text"
                        value={editQuestionForm.optionsHi[2]}
                        onChange={(e) => {
                          const opts = [...editQuestionForm.optionsHi] as [string, string, string, string];
                          opts[2] = e.target.value;
                          setEditQuestionForm({ ...editQuestionForm, optionsHi: opts });
                        }}
                        className="w-full border border-slate-200 dark:border-slate-700 p-2 text-xs bg-white dark:bg-slate-900 text-slate-805 dark:text-white rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 block uppercase">Option D (English)</label>
                      <input
                        type="text"
                        value={editQuestionForm.optionsEn[3]}
                        onChange={(e) => {
                          const opts = [...editQuestionForm.optionsEn] as [string, string, string, string];
                          opts[3] = e.target.value;
                          setEditQuestionForm({ ...editQuestionForm, optionsEn: opts });
                        }}
                        className="w-full border border-slate-200 dark:border-slate-700 p-2 text-xs bg-white dark:bg-slate-900 text-slate-805 dark:text-white rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 block uppercase">Option D (Hindi)</label>
                      <input
                        type="text"
                        value={editQuestionForm.optionsHi[3]}
                        onChange={(e) => {
                          const opts = [...editQuestionForm.optionsHi] as [string, string, string, string];
                          opts[3] = e.target.value;
                          setEditQuestionForm({ ...editQuestionForm, optionsHi: opts });
                        }}
                        className="w-full border border-slate-200 dark:border-slate-700 p-2 text-xs bg-white dark:bg-slate-900 text-slate-805 dark:text-white rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 block uppercase">Correct Answer</label>
                    <select
                      value={editQuestionForm.correctAnswer}
                      onChange={(e) => setEditQuestionForm({ ...editQuestionForm, correctAnswer: e.target.value as any })}
                      className="w-full border border-slate-200 dark:border-slate-700 p-2 text-xs bg-white dark:bg-slate-900 text-slate-805 dark:text-white rounded-xl"
                    >
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 block uppercase">Explanation (English)</label>
                      <textarea
                        value={editQuestionForm.explanationEn}
                        onChange={(e) => setEditQuestionForm({ ...editQuestionForm, explanationEn: e.target.value })}
                        className="w-full border border-slate-200 dark:border-slate-700 p-2 text-xs bg-white dark:bg-slate-900 text-slate-805 dark:text-white rounded-xl"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 block uppercase">Explanation (Hindi)</label>
                      <textarea
                        value={editQuestionForm.explanationHi}
                        onChange={(e) => setEditQuestionForm({ ...editQuestionForm, explanationHi: e.target.value })}
                        className="w-full border border-slate-200 dark:border-slate-700 p-2 text-xs bg-white dark:bg-slate-900 text-slate-805 dark:text-white rounded-xl"
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => { setEditingIndex(null); setEditQuestionForm(null); }}
                      className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-655 dark:text-slate-400 text-xs font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-850 transition"
                    >
                      {isHindi ? "रद्द करें" : "Cancel"}
                    </button>
                    <button
                      onClick={saveEdit}
                      className="px-5 py-2 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
                    >
                      {isHindi ? "बदलाव सहेजें" : "Save Changes"}
                    </button>
                  </div>
                </div>
              )}

              {/* Preview List Grid */}
              <div className="grid grid-cols-1 gap-4">
                {previewQuestions.map((q, idx) => (
                  <div 
                    key={q.id} 
                    className={`p-4 border rounded-2xl transition-all ${editingIndex === idx ? "border-indigo-400 ring-2 ring-indigo-100 dark:ring-indigo-950/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"}`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1.5 flex-1">
                        <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold px-2 py-0.5 rounded-full uppercase">
                          {q.subject} / {q.topic}
                        </span>
                        
                        {/* Display bilingual questions */}
                        <div className="text-xs font-bold text-slate-850 dark:text-white leading-relaxed">
                          <p>🇬🇧 {q.questionEn}</p>
                          <p className="mt-1 text-slate-700 dark:text-slate-350">🇮🇳 {q.questionHi}</p>
                        </div>

                        {/* Options preview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2 text-[10px] text-slate-500 dark:text-slate-400">
                          <div><span className="font-bold text-slate-700 dark:text-slate-350">A)</span> En: {q.optionsEn[0]} | Hi: {q.optionsHi[0]}</div>
                          <div><span className="font-bold text-slate-700 dark:text-slate-350">B)</span> En: {q.optionsEn[1]} | Hi: {q.optionsHi[1]}</div>
                          <div><span className="font-bold text-slate-700 dark:text-slate-350">C)</span> En: {q.optionsEn[2]} | Hi: {q.optionsHi[2]}</div>
                          <div><span className="font-bold text-slate-700 dark:text-slate-350">D)</span> En: {q.optionsEn[3]} | Hi: {q.optionsHi[3]}</div>
                        </div>

                        {/* Answer and explanation preview */}
                        <div className="text-[10px] pt-1 flex items-center gap-3">
                          <div>
                            <span className="font-bold text-emerald-600">Ans: Option {q.correctAnswer}</span>
                          </div>
                          {q.examTags && q.examTags.length > 0 && (
                            <div className="flex gap-1">
                              {q.examTags.map(t => (
                                <span key={t} className="text-[8px] bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-sky-300 px-1.5 py-0.2 rounded font-semibold">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => startEditing(idx)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-indigo-650 dark:text-sky-400 rounded-xl transition"
                          title="Edit question details"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeQuestion(idx)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl transition"
                          title="Remove question"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-850 flex justify-end gap-3 bg-slate-50 dark:bg-slate-900/60">
          <button onClick={onClose} className="px-4 py-2.5 text-xs font-bold text-slate-655 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white">
            {isHindi ? "रद्द करें" : "Cancel"}
          </button>
          
          {previewQuestions.length > 0 && (
            <button
              onClick={handleFinalImport}
              className="px-6 py-2.5 bg-emerald-650 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl transition shadow-md hover:shadow-emerald-500/20 flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              <span>{isHindi ? `डेटाबेस में सेव करें (${previewQuestions.length})` : `Save ${previewQuestions.length} Questions to DB`}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
