import React, { useState, ChangeEvent, DragEvent, useEffect, useCallback } from "react";
import { Upload, X, Check, FileText } from "lucide-react";
import { Question } from "../types";

export interface CsvUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionsImported: (questions: Question[]) => void;
  isHindi: boolean;
}

export default function CsvUploadModal({ isOpen, onClose, onQuestionsImported, isHindi }: CsvUploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [csvRawText, setCsvRawText] = useState("");
  const [csvFileName, setCsvFileName] = useState("");
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvRows, setCsvRows] = useState<string[][]>([]);
  const [csvParseError, setCsvParseError] = useState<string | null>(null);

  const [csvFieldsMapping, setCsvFieldsMapping] = useState<Record<string, string>>({
    questionEn: "", questionHi: "", optionAEn: "", optionBEn: "", optionCEn: "", optionDEn: "",
    optionAHi: "", optionBHi: "", optionCHi: "", optionDHi: "", correctAnswer: "", explanationEn: "", explanationHi: "",
    subject: "", topic: "", examTags: ""
  });

  const [csvDefaultValues, setCsvDefaultValues] = useState<Record<string, string>>({
    subject: "General Studies", topic: "General Topic", examTags: "Exam"
  });

  const [csvMappedQuestions, setCsvMappedQuestions] = useState<Question[]>([]);

  const parseCSV = (text: string): string[][] => {
    const lines = text.split(/\r?\n/);
    const result: string[][] = [];
    for (let line of lines) {
      if (!line.trim()) continue;
      const row: string[] = [];
      let inQuotes = false;
      let currentVal = "";
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') { currentVal += '"'; i++; }
          else { inQuotes = !inQuotes; }
        } else if (char === ',' && !inQuotes) {
          row.push(currentVal);
          currentVal = "";
        } else { currentVal += char; }
      }
      row.push(currentVal);
      result.push(row);
    }
    return result;
  };

  const processRawCsvText = (text: string, filename: string) => {
    try {
      setCsvParseError(null);
      const parsedData = parseCSV(text);
      if (parsedData.length === 0) {
        setCsvParseError(isHindi ? "कोई रो (Row) नहीं मिली।" : "No rows found.");
        return;
      }
      let headerRow = parsedData[0].map((h) => h.trim().replace(/^"|"$/g, ""));
      const isHeaderInvalid = headerRow.some(h => h.length > 100) || headerRow.length < 2;
      let dataRows = parsedData;
      if (isHeaderInvalid) {
        headerRow = Array.from({ length: parsedData[0].length }).map((_, i) => `Column_${i + 1}`);
      } else {
        dataRows = parsedData.slice(1);
      }
      setCsvHeaders(headerRow);
      setCsvRows(dataRows);

      // Auto-map logic
      const mappings: Record<string, string> = { ...csvFieldsMapping };
      headerRow.forEach((h) => {
        const clean = h.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (clean.includes("question") && clean.includes("hi")) mappings.questionHi = h;
        else if (clean.includes("question") && !mappings.questionEn) mappings.questionEn = h;
        else if ((clean === "a" || clean.includes("opta") || clean.includes("optiona")) && clean.includes("hi")) mappings.optionAHi = h;
        else if ((clean === "b" || clean.includes("optb") || clean.includes("optionb")) && clean.includes("hi")) mappings.optionBHi = h;
        else if ((clean === "c" || clean.includes("optc") || clean.includes("optionc")) && clean.includes("hi")) mappings.optionCHi = h;
        else if ((clean === "d" || clean.includes("optd") || clean.includes("optiond")) && clean.includes("hi")) mappings.optionDHi = h;
        else if (clean === "a" || clean.includes("opta") || clean.includes("optiona")) mappings.optionAEn = h;
        else if (clean === "b" || clean.includes("optb") || clean.includes("optionb")) mappings.optionBEn = h;
        else if (clean === "c" || clean.includes("optc") || clean.includes("optionc")) mappings.optionCEn = h;
        else if (clean === "d" || clean.includes("optd") || clean.includes("optiond")) mappings.optionDEn = h;
        else if (clean.includes("correct") || clean === "ans" || clean === "answer") mappings.correctAnswer = h;
        else if (clean.includes("explanation") && clean.includes("hi")) mappings.explanationHi = h;
        else if (clean.includes("explanation") || clean.includes("exp")) mappings.explanationEn = h;
        else if (clean.includes("subject")) mappings.subject = h;
        else if (clean.includes("topic")) mappings.topic = h;
        else if (clean.includes("exam") || clean.includes("tag")) mappings.examTags = h;
      });
      setCsvFieldsMapping(mappings);
    } catch (e: any) {
      setCsvParseError(e.message);
    }
  };

  const generateQuestions = useCallback(() => {
    if (csvRows.length === 0) { setCsvMappedQuestions([]); return; }
    const headerIndices: Record<string, number> = {};
    csvHeaders.forEach((h, idx) => { headerIndices[h] = idx; });

    const getVal = (row: string[], fieldKey: string, fallback = ""): string => {
      const headerName = csvFieldsMapping[fieldKey];
      if (!headerName) return fallback;
      const colIdx = headerIndices[headerName];
      if (colIdx === undefined || colIdx >= row.length) return fallback;
      return row[colIdx] || fallback;
    };

    const parsed: Question[] = csvRows.map((row, rowIdx) => {
      const questionEn = getVal(row, "questionEn").trim() || `Row ${rowIdx + 1}`;
      const questionHi = getVal(row, "questionHi").trim() || questionEn;
      const optAEn = getVal(row, "optionAEn").trim() || "A";
      const optBEn = getVal(row, "optionBEn").trim() || "B";
      const optCEn = getVal(row, "optionCEn").trim() || "C";
      const optDEn = getVal(row, "optionDEn").trim() || "D";
      
      let rawAns = getVal(row, "correctAnswer").trim().toUpperCase();
      let correctAnswer: "A" | "B" | "C" | "D" = "A";
      if (["A", "B", "C", "D"].includes(rawAns)) correctAnswer = rawAns as any;
      else if (rawAns === "1" || rawAns === "0") correctAnswer = "A";
      else if (rawAns === "2") correctAnswer = "B";
      else if (rawAns === "3") correctAnswer = "C";
      else if (rawAns === "4") correctAnswer = "D";
      else {
        if (rawAns === optAEn.toUpperCase()) correctAnswer = "A";
        else if (rawAns === optBEn.toUpperCase()) correctAnswer = "B";
        else if (rawAns === optCEn.toUpperCase()) correctAnswer = "C";
        else if (rawAns === optDEn.toUpperCase()) correctAnswer = "D";
      }
      
      return {
        id: `csv-modal-q-${Date.now()}-${rowIdx}-${Math.floor(Math.random() * 1000)}`,
        questionEn, questionHi,
        optionsEn: [optAEn, optBEn, optCEn, optDEn],
        optionsHi: [getVal(row, "optionAHi").trim() || optAEn, getVal(row, "optionBHi").trim() || optBEn, getVal(row, "optionCHi").trim() || optCEn, getVal(row, "optionDHi").trim() || optDEn],
        correctAnswer,
        explanationEn: getVal(row, "explanationEn").trim(),
        explanationHi: getVal(row, "explanationHi").trim(),
        subject: getVal(row, "subject").trim() || csvDefaultValues.subject,
        topic: getVal(row, "topic").trim() || csvDefaultValues.topic,
        examTags: (getVal(row, "examTags").trim() || csvDefaultValues.examTags).split(",").map(t => t.trim()).filter(Boolean),
      };
    });
    setCsvMappedQuestions(parsed);
  }, [csvRows, csvFieldsMapping, csvDefaultValues, csvHeaders]);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const handleFile = (file: File) => {
    setCsvFileName(file.name);
    const nameExt = file.name.replace(/\.csv$/i, "");
    setCsvDefaultValues(prev => ({ ...prev, examTags: nameExt }));
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvRawText(text);
      processRawCsvText(text, file.name);
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (csvMappedQuestions.length > 0) {
      onQuestionsImported(csvMappedQuestions);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Upload className="h-5 w-5 text-indigo-500" />
            {isHindi ? "CSV अपलोड मोडल" : "CSV Upload Modal"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!csvRawText ? (
            <div 
              onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
              className={`p-10 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-colors cursor-pointer text-center ${dragActive ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
            >
              <input type="file" accept=".csv" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" style={{ display: 'none' }} id="csv-upload-input" />
              <label htmlFor="csv-upload-input" className="cursor-pointer flex flex-col items-center">
                <div className="p-4 bg-indigo-100 dark:bg-indigo-900/40 rounded-full text-indigo-600 mb-4">
                  <Upload className="h-8 w-8" />
                </div>
                <p className="font-bold text-slate-700 dark:text-white mb-2">
                  {isHindi ? "यहाँ फाइल ड्रैग करें या क्लिक करें" : "Drag and drop your CSV here or click to browse"}
                </p>
                <p className="text-xs text-slate-500">Supports .csv files</p>
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-indigo-500" />
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm">{csvFileName}</h3>
                    <p className="text-xs text-slate-500">{csvRows.length} {isHindi ? "प्रश्न पाए गए" : "questions found"}</p>
                  </div>
                </div>
                <button onClick={() => setCsvRawText("")} className="text-xs text-red-500 font-bold hover:underline">
                  {isHindi ? "फाइल हटाएं" : "Remove File"}
                </button>
              </div>

              {csvParseError && (
                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">{csvParseError}</div>
              )}

              <div className="space-y-4">
                <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm">{isHindi ? "कॉलम मैपिंग" : "Column Mapping"}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.keys(csvFieldsMapping).map((field) => (
                    <div key={field} className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                      <select
                        value={csvFieldsMapping[field]}
                        onChange={(e) => setCsvFieldsMapping({ ...csvFieldsMapping, [field]: e.target.value })}
                        className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs dark:text-white"
                      >
                        <option value="">-- Ignore --</option>
                        {csvHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 bg-slate-50 dark:bg-slate-800/50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
            {isHindi ? "रद्द करें" : "Cancel"}
          </button>
          <button 
            onClick={handleImport}
            disabled={csvMappedQuestions.length === 0}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl flex items-center gap-2 disabled:opacity-50 transition-colors"
          >
            <Check className="h-4 w-4" />
            {isHindi ? `इम्पोर्ट करें (${csvMappedQuestions.length})` : `Import Questions (${csvMappedQuestions.length})`}
          </button>
        </div>
      </div>
    </div>
  );
}
