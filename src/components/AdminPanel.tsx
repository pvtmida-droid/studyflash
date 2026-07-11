import { useState, FormEvent, useEffect, ChangeEvent, useMemo } from "react";
import {
  Plus,
  Database,
  Upload,
  ChevronRight,
  FileText,
  Settings,
  Users,
  Search,
  Check,
  BarChart,
  Layout,
  ExternalLink,
  Edit,
  Trash2,
  Copy,
  Sparkles,
  RefreshCw,
  X,
  Save,
  HelpCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  Shuffle,
  History,
  Activity,
  Globe,
  Key,
} from "lucide-react";
import { Question, LiveTestConfig, MockTest } from "../types";

interface AdminPanelProps {
  questions: Question[];
  isHindi: boolean;
  onAddQuestion: (newQuestion: Question) => void;
  onSetBulkQuestions: (questions: Question[]) => void;
  onDeleteQuestion?: (id: string) => void;
  onUpdateQuestion?: (updated: Question) => void;
  liveTestConfig?: LiveTestConfig;
  onUpdateLiveTestConfig?: (config: LiveTestConfig) => void;
  mockTests?: MockTest[];
  onAddMockTest?: (test: MockTest) => void;
  onDeleteMockTest?: (id: string) => void;
}

import QuestionImportModal from "./QuestionImportModal";

const ADMIN_CARD_CATEGORIES = [
  {
    id: "central-exam",
    nameEn: "Central Exams (SSC & Railway)",
    nameHi: "केंद्रीय परीक्षाएं (SSC & Railway)",
    defaultSubject: "Central Exam",
    subfolders: [
      { id: "SSC CGL", nameEn: "SSC CGL", nameHi: "एसएससी CGL", subject: "SSC CGL", topic: "General Awareness", examTags: ["SSC CGL", "SSC"] },
      { id: "SSC CHSL", nameEn: "SSC CHSL", nameHi: "एसएससी CHSL", subject: "SSC CHSL", topic: "General Awareness", examTags: ["SSC CHSL", "SSC"] },
      { id: "SSC GD", nameEn: "SSC GD", nameHi: "एसएससी GD", subject: "SSC GD", topic: "General Awareness", examTags: ["SSC GD", "SSC"] },
      { id: "SSC MTS", nameEn: "SSC MTS", nameHi: "एसएससी MTS", subject: "SSC MTS", topic: "General Awareness", examTags: ["SSC MTS", "SSC"] },
      { id: "RRB NTPC", nameEn: "RRB NTPC 2025", nameHi: "आरआरबी NTPC 2025", subject: "RRB NTPC", topic: "General Awareness", examTags: ["Railway", "RRB NTPC"] },
      { id: "RRB Group D", nameEn: "RRB Group D", nameHi: "आरआरबी ग्रुप डी", subject: "RRB Group D", topic: "General Awareness", examTags: ["Railway", "RRB Group D"] },
      { id: "RRB ALP", nameEn: "RRB ALP", nameHi: "आरआरबी एएलपी", subject: "RRB ALP", topic: "General Awareness", examTags: ["Railway", "RRB ALP"] },
      { id: "UPSC Prelims", nameEn: "UPSC Prelims", nameHi: "यूपीएससी प्रीलिम्स", subject: "UPSC Prelims", topic: "General Studies", examTags: ["UPSC", "UPSC Prelims"] },
    ]
  },
  {
    id: "state-police",
    nameEn: "State Police",
    nameHi: "राज्य पुलिस",
    defaultSubject: "State Police",
    subfolders: [
      { id: "UP Police", nameEn: "UP Police Constable", nameHi: "यूपी पुलिस कांस्टेबल", subject: "UP Police", topic: "General Studies", examTags: ["Police", "UP Police"] },
      { id: "Bihar Police", nameEn: "Bihar Police", nameHi: "बिहार पुलिस", subject: "Bihar Police", topic: "General Studies", examTags: ["Police", "Bihar Police"] },
      { id: "Delhi Police", nameEn: "Delhi Police", nameHi: "दिल्ली पुलिस", subject: "Delhi Police", topic: "General Studies", examTags: ["Police", "Delhi Police"] },
      { id: "MP Police", nameEn: "MP Police", nameHi: "एमपी पुलिस", subject: "MP Police", topic: "General Studies", examTags: ["Police", "MP Police"] },
      { id: "Rajasthan Police", nameEn: "Rajasthan Police", nameHi: "राजस्थान पुलिस", subject: "Rajasthan Police", topic: "General Studies", examTags: ["Police", "Rajasthan Police"] },
    ]
  },
  {
    id: "ncert",
    nameEn: "NCERT Books",
    nameHi: "एनसीईआरटी पुस्तकें",
    defaultSubject: "NCERT",
    subfolders: [
      { id: "Physics", nameEn: "Class 11/12 Physics", nameHi: "भौतिक विज्ञान (कक्षा 11/12)", subject: "Physics", topic: "NCERT Science", examTags: ["NCERT", "Physics"] },
      { id: "Chemistry", nameEn: "Class 11/12 Chemistry", nameHi: "रसायन विज्ञान (कक्षा 11/12)", subject: "Chemistry", topic: "NCERT Science", examTags: ["NCERT", "Chemistry"] },
      { id: "Biology", nameEn: "Class 11/12 Biology", nameHi: "जीव विज्ञान (कक्षा 11/12)", subject: "Biology", topic: "NCERT Science", examTags: ["NCERT", "Biology"] },
      { id: "History", nameEn: "Class 6-12 History", nameHi: "इतिहास (कक्षा 6-12)", subject: "History", topic: "NCERT Social Science", examTags: ["NCERT", "History"] },
      { id: "Geography", nameEn: "Class 6-12 Geography", nameHi: "भूगोल (कक्षा 6-12)", subject: "Geography", topic: "NCERT Social Science", examTags: ["NCERT", "Geography"] },
      { id: "Polity", nameEn: "Class 6-12 Polity & Civics", nameHi: "राजनीति और नागरिक शास्त्र", subject: "Polity", topic: "NCERT Social Science", examTags: ["NCERT", "Polity"] },
      { id: "Science", nameEn: "Class 9/10 General Science", nameHi: "सामान्य विज्ञान (कक्षा 9/10)", subject: "Science", topic: "NCERT Science", examTags: ["NCERT", "Science"] },
    ]
  },
  {
    id: "computer",
    nameEn: "Computer Knowledge",
    nameHi: "कंप्यूटर ज्ञान",
    defaultSubject: "Computer",
    subfolders: [
      { id: "FUNDAMENTALS_OS", nameEn: "Computer Fundamentals & OS", nameHi: "कंप्यूटर फंडामेंटल्स और OS", subject: "Computer", topic: "Fundamentals & OS", examTags: ["Computer", "Fundamentals", "OS"] },
      { id: "MS_OFFICE", nameEn: "MS Office Suite", nameHi: "एमएस ऑफिस सूट", subject: "Computer", topic: "MS Office", examTags: ["Computer", "MS Office"] },
      { id: "INTERNET_NETWORKING", nameEn: "Internet, Networking & DBMS", nameHi: "इंटरनेट, नेटवर्किंग और DBMS", subject: "Computer", topic: "Networking & DBMS", examTags: ["Computer", "Internet", "Networking", "DBMS"] },
      { id: "EXAM_MIX", nameEn: "Exam Oriented Mix Questions", nameHi: "एग्जाम ओरिएंटेड मिक्स प्रश्न", subject: "Computer", topic: "Exam Mix", examTags: ["Computer", "Exam Mix"] },
    ]
  },
  {
    id: "current-affairs",
    nameEn: "Current Affairs",
    nameHi: "करेंट अफेयर्स",
    defaultSubject: "Current Affairs",
    subfolders: [
      { id: "Weekly Current Affairs", nameEn: "Weekly Roundups", nameHi: "साप्ताहिक समाचार", subject: "Current Affairs", topic: "Weekly CA", examTags: ["CurrentAffairs", "Weekly"] },
      { id: "Monthly Current Affairs", nameEn: "Monthly Roundups", nameHi: "मासिक समाचार", subject: "Current Affairs", topic: "Monthly CA", examTags: ["CurrentAffairs", "Monthly"] },
      { id: "Yearly Current Affairs", nameEn: "Yearly Roundups", nameHi: "वार्षिक समाचार", subject: "Current Affairs", topic: "Yearly CA", examTags: ["CurrentAffairs", "Yearly"] },
    ]
  },
  {
    id: "subjects",
    nameEn: "Core Subjects",
    nameHi: "मुख्य विषय",
    defaultSubject: "General",
    subfolders: [
      { id: "GKGS", nameEn: "General Studies (GK/GS)", nameHi: "सामान्य अध्ययन (GK/GS)", subject: "GKGS", topic: "General Knowledge", examTags: ["GKGS"] },
      { id: "Science", nameEn: "General Science (Physics/Chemistry/Bio)", nameHi: "सामान्य विज्ञान", subject: "Science", topic: "Science GK", examTags: ["Science"] },
      { id: "Maths", nameEn: "Mathematics (Quantitative Aptitude)", nameHi: "गणित", subject: "Maths", topic: "Arithmetic", examTags: ["Maths"] },
      { id: "Reasoning", nameEn: "Reasoning & Mental Ability", nameHi: "तार्किक क्षमता", subject: "Reasoning", topic: "Verbal Reasoning", examTags: ["Reasoning"] },
      { id: "Hindi", nameEn: "General Hindi", nameHi: "सामान्य हिन्दी", subject: "Hindi", topic: "Hindi Grammar", examTags: ["Hindi"] },
      { id: "English", nameEn: "General English", nameHi: "सामान्य अंग्रेजी", subject: "English", topic: "English Grammar", examTags: ["English"] },
    ]
  }
];

export default function AdminPanel({
  questions,
  isHindi,
  onAddQuestion,
  onSetBulkQuestions,
  onDeleteQuestion,
  onUpdateQuestion,
  liveTestConfig,
  onUpdateLiveTestConfig,
  mockTests = [],
  onAddMockTest,
  onDeleteMockTest,
}: AdminPanelProps) {
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  // Session authentication state checks
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return sessionStorage.getItem("admin_session") === "true" || !!localStorage.getItem("studyflash_admin_token");
  });
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "manage" | "bulk" | "seo" | "users" | "adsense" | "live" | "mocktests"
  >("manage");

  // Live Test CSV States
  const [liveCsvRawText, setLiveCsvRawText] = useState("");
  const [liveCsvId, setLiveCsvId] = useState("");
  const [liveCsvSubject, setLiveCsvSubject] = useState("");
  const [liveCsvTopic, setLiveCsvTopic] = useState("");
  const [liveCsvFileName, setLiveCsvFileName] = useState("");

  // Single Question Add Form State
  const [questionEn, setQuestionEn] = useState("");
  const [questionHi, setQuestionHi] = useState("");
  const [optAEn, setOptAEn] = useState("");
  const [optBEn, setOptBEn] = useState("");
  const [optCEn, setOptCEn] = useState("");
  const [optDEn, setOptDEn] = useState("");
  const [optAHi, setOptAHi] = useState("");
  const [optBHi, setOptBHi] = useState("");
  const [optCHi, setOptCHi] = useState("");
  const [optDHi, setOptDHi] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState<"A" | "B" | "C" | "D">(
    "A",
  );
  const [explanationEn, setExplanationEn] = useState("");
  const [explanationHi, setExplanationHi] = useState("");
  const [subject, setSubject] = useState("History");
  const [topic, setTopic] = useState("");
  const [examTagField, setExamTagField] = useState("SSC, Railway");

  // Database MCQ Management & Search Filter state
  const [manageSearch, setManageSearch] = useState("");
  const [manageSubjectFilter, setManageSubjectFilter] = useState("All");
  const [managePage, setManagePage] = useState(1);
  const itemsPerPage = 50;

  // Active Question Editing Modal State
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Generative AI MCQ Creator State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Bulk input state
  const [bulkTextInput, setBulkTextInput] = useState("");

  // Mock Test Builder state
  const [mtTitleEn, setMtTitleEn] = useState("");
  const [mtTitleHi, setMtTitleHi] = useState("");
  const [mtExam, setMtExam] = useState("SSC CGL");
  const [mtSubject, setMtSubject] = useState("All");
  const [mtQuestionsCount, setMtQuestionsCount] = useState(25);
  const [mtIsPYQ, setMtIsPYQ] = useState(false);
  const [showMtCsv, setShowMtCsv] = useState(false);
  const [mtCsvRawText, setMtCsvRawText] = useState("");
  const [mtCsvFileName, setMtCsvFileName] = useState("");

  // CSV Automated Mapping UI States
  const [bulkUploadMode, setBulkUploadMode] = useState<
    "json" | "csv" | "history"
  >("csv");
  const [historyRefresh, setHistoryRefresh] = useState(0);
  const [csvRawText, setCsvRawText] = useState("");
  const [csvFileName, setCsvFileName] = useState("");
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvRows, setCsvRows] = useState<string[][]>([]);
  const [csvFieldsMapping, setCsvFieldsMapping] = useState<
    Record<string, string>
  >({
    questionEn: "",
    questionHi: "",
    optionAEn: "",
    optionBEn: "",
    optionCEn: "",
    optionDEn: "",
    optionAHi: "",
    optionBHi: "",
    optionCHi: "",
    optionDHi: "",
    correctAnswer: "",
    explanationEn: "",
    explanationHi: "",
    subject: "",
    topic: "",
    examTags: "",
  });
  const [csvTargetDest, setCsvTargetDest] = useState<"general" | "live">(
    "general",
  );
  const [csvDefaultValues, setCsvDefaultValues] = useState<
    Record<string, string>
  >({
    subject: "History",
    topic: "General Studies",
    examTags: "SSC",
  });
  const [csvMappedQuestions, setCsvMappedQuestions] = useState<Question[]>([]);
  const [csvParseError, setCsvParseError] = useState<string | null>(null);
  const [showAllCsvPreview, setShowAllCsvPreview] = useState(false);
  const [csvPreviewPage, setCsvPreviewPage] = useState(1);

  // Target card categories & subfolders dropdown selections
  const [selectedAdminCategory, setSelectedAdminCategory] = useState<string>("central-exam");
  const [selectedAdminSubfolder, setSelectedAdminSubfolder] = useState<string>("SSC CGL");
  const [forceDropdownCategories, setForceDropdownCategories] = useState<boolean>(true);

  // Sync category & subfolder dropdown choices with default values dynamically
  useEffect(() => {
    const categoryObj = ADMIN_CARD_CATEGORIES.find(c => c.id === selectedAdminCategory);
    if (categoryObj) {
      const subfolderObj = categoryObj.subfolders.find(s => s.id === selectedAdminSubfolder) || categoryObj.subfolders[0];
      if (subfolderObj) {
        setCsvDefaultValues({
          subject: subfolderObj.subject,
          topic: subfolderObj.topic,
          examTags: subfolderObj.examTags.join(", "),
        });
      }
    }
  }, [selectedAdminCategory, selectedAdminSubfolder]);

  // Parse CSV content handling text quotes & newlines inside cells
  const parseCSV = (text: string): string[][] => {
    const isTSV = text.indexOf("\t") !== -1;
    const delimiter = isTSV ? "\t" : ",";
    
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
      } else if (char === delimiter && !inQuotes) {
        row.push(currentVal.trim());
        currentVal = "";
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        row.push(currentVal.trim());
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
      row.push(currentVal.trim());
      if (row.some(cell => cell.trim() !== "")) {
        result.push(row);
      }
    }
    return result;
  };

  // Auto match CSV header keys with Question properties
  const autoMatchHeaders = (headers: string[]) => {
    const mappings: Record<string, string> = {
      id: "",
      questionEn: "",
      questionHi: "",
      optionAEn: "",
      optionBEn: "",
      optionCEn: "",
      optionDEn: "",
      optionAHi: "",
      optionBHi: "",
      optionCHi: "",
      optionDHi: "",
      correctAnswer: "",
      explanationEn: "",
      explanationHi: "",
      subject: "",
      topic: "",
      examTags: "",
    };

    headers.forEach((h) => {
      const clean = h.toLowerCase().trim();

      // Question english
      if (
        (clean.includes("question") ||
          clean.includes("ques") ||
          clean.startsWith("q")) &&
        (clean.includes("en") ||
          clean.includes("english") ||
          clean.includes("text") ||
          (!clean.includes("hi") &&
            !clean.includes("hindi") &&
            !clean.includes("trans")))
      ) {
        if (!mappings.questionEn) mappings.questionEn = h;
      }
      // Question hindi
      if (
        (clean.includes("question") ||
          clean.includes("ques") ||
          clean.startsWith("q")) &&
        (clean.includes("hi") ||
          clean.includes("hindi") ||
          clean.includes("trans") ||
          clean.includes("अनुवाद"))
      ) {
        if (!mappings.questionHi) mappings.questionHi = h;
      }

      // Option A English
      if (
        (clean.includes("option") ||
          clean.includes("opt") ||
          clean.startsWith("o")) &&
        (clean.includes("a") || clean.includes("1")) &&
        (clean.includes("en") ||
          clean.includes("english") ||
          (!clean.includes("hi") && !clean.includes("hindi")))
      ) {
        if (!mappings.optionAEn) mappings.optionAEn = h;
      } else if (
        clean === "a" ||
        clean === "option_a" ||
        clean === "optiona" ||
        clean === "opt_a" ||
        clean === "opt a"
      ) {
        if (!mappings.optionAEn) mappings.optionAEn = h;
      }

      // Option B English
      if (
        (clean.includes("option") ||
          clean.includes("opt") ||
          clean.startsWith("o")) &&
        (clean.includes("b") || clean.includes("2")) &&
        (clean.includes("en") ||
          clean.includes("english") ||
          (!clean.includes("hi") && !clean.includes("hindi")))
      ) {
        if (!mappings.optionBEn) mappings.optionBEn = h;
      } else if (
        clean === "b" ||
        clean === "option_b" ||
        clean === "optionb" ||
        clean === "opt_b" ||
        clean === "opt b"
      ) {
        if (!mappings.optionBEn) mappings.optionBEn = h;
      }

      // Option C English
      if (
        (clean.includes("option") ||
          clean.includes("opt") ||
          clean.startsWith("o")) &&
        (clean.includes("c") || clean.includes("3")) &&
        (clean.includes("en") ||
          clean.includes("english") ||
          (!clean.includes("hi") && !clean.includes("hindi")))
      ) {
        if (!mappings.optionCEn) mappings.optionCEn = h;
      } else if (
        clean === "c" ||
        clean === "option_c" ||
        clean === "optionc" ||
        clean === "opt_c" ||
        clean === "opt c"
      ) {
        if (!mappings.optionCEn) mappings.optionCEn = h;
      }

      // Option D English
      if (
        (clean.includes("option") ||
          clean.includes("opt") ||
          clean.startsWith("o")) &&
        (clean.includes("d") || clean.includes("4")) &&
        (clean.includes("en") ||
          clean.includes("english") ||
          (!clean.includes("hi") && !clean.includes("hindi")))
      ) {
        if (!mappings.optionDEn) mappings.optionDEn = h;
      } else if (
        clean === "d" ||
        clean === "option_d" ||
        clean === "optiond" ||
        clean === "opt_d" ||
        clean === "opt d"
      ) {
        if (!mappings.optionDEn) mappings.optionDEn = h;
      }

      // Option A Hindi
      if (
        (clean.includes("option") ||
          clean.includes("opt") ||
          clean.startsWith("o")) &&
        (clean.includes("a") || clean.includes("1")) &&
        (clean.includes("hi") ||
          clean.includes("hindi") ||
          clean.includes("अनुवाद"))
      ) {
        if (!mappings.optionAHi) mappings.optionAHi = h;
      } else if (
        clean === "option_a_hi" ||
        clean === "optiona_hi" ||
        clean === "opt_a_hi" ||
        clean === "opt a hi" ||
        clean === "a_hi"
      ) {
        if (!mappings.optionAHi) mappings.optionAHi = h;
      }

      // Option B Hindi
      if (
        (clean.includes("option") ||
          clean.includes("opt") ||
          clean.startsWith("o")) &&
        (clean.includes("b") || clean.includes("2")) &&
        (clean.includes("hi") ||
          clean.includes("hindi") ||
          clean.includes("अनुवाद"))
      ) {
        if (!mappings.optionBHi) mappings.optionBHi = h;
      } else if (
        clean === "option_b_hi" ||
        clean === "optionb_hi" ||
        clean === "opt_b_hi" ||
        clean === "opt b hi" ||
        clean === "b_hi"
      ) {
        if (!mappings.optionBHi) mappings.optionBHi = h;
      }

      // Option C Hindi
      if (
        (clean.includes("option") ||
          clean.includes("opt") ||
          clean.startsWith("o")) &&
        (clean.includes("c") || clean.includes("3")) &&
        (clean.includes("hi") ||
          clean.includes("hindi") ||
          clean.includes("अनुवाद"))
      ) {
        if (!mappings.optionCHi) mappings.optionCHi = h;
      } else if (
        clean === "option_c_hi" ||
        clean === "optionc_hi" ||
        clean === "opt_c_hi" ||
        clean === "opt c hi" ||
        clean === "c_hi"
      ) {
        if (!mappings.optionCHi) mappings.optionCHi = h;
      }

      // Option D Hindi
      if (
        (clean.includes("option") ||
          clean.includes("opt") ||
          clean.startsWith("o")) &&
        (clean.includes("d") || clean.includes("4")) &&
        (clean.includes("hi") ||
          clean.includes("hindi") ||
          clean.includes("अनुवाद"))
      ) {
        if (!mappings.optionDHi) mappings.optionDHi = h;
      } else if (
        clean === "option_d_hi" ||
        clean === "optiond_hi" ||
        clean === "opt_d_hi" ||
        clean === "opt d hi" ||
        clean === "d_hi"
      ) {
        if (!mappings.optionDHi) mappings.optionDHi = h;
      }

      // Correct Option
      if (
        clean.includes("correct") ||
        clean.includes("answer") ||
        clean.includes("ans") ||
        clean.includes("key") ||
        clean === "right_option" ||
        clean === "right_ans"
      ) {
        if (!mappings.correctAnswer) mappings.correctAnswer = h;
      }

      // Explanation English
      if (
        (clean.includes("explain") ||
          clean.includes("explanation") ||
          clean.includes("sol") ||
          clean.includes("solution") ||
          clean.includes("reason")) &&
        (clean.includes("en") ||
          clean.includes("english") ||
          (!clean.includes("hi") && !clean.includes("hindi")))
      ) {
        if (!mappings.explanationEn) mappings.explanationEn = h;
      }

      // Explanation Hindi
      if (
        (clean.includes("explain") ||
          clean.includes("explanation") ||
          clean.includes("sol") ||
          clean.includes("solution") ||
          clean.includes("reason")) &&
        (clean.includes("hi") ||
          clean.includes("hindi") ||
          clean.includes("अनुवाद") ||
          clean.includes("व्याख्या"))
      ) {
        if (!mappings.explanationHi) mappings.explanationHi = h;
      }

      // Subject
      if (
        clean.includes("subject") ||
        clean.includes("sub") ||
        clean.includes("category")
      ) {
        if (!mappings.subject) mappings.subject = h;
      }

      // Topic
      if (
        clean.includes("topic") ||
        clean.includes("top") ||
        clean.includes("chapter") ||
        clean.includes("section")
      ) {
        if (!mappings.topic) mappings.topic = h;
      }

      // Tags
      if (
        clean.includes("tag") ||
        clean.includes("tags") ||
        clean.includes("exam") ||
        clean.includes("exams")
      ) {
        if (!mappings.examTags) mappings.examTags = h;
      }

      // ID
      if (
        clean === "id" ||
        clean.includes("_id") ||
        clean.includes("question id")
      ) {
        if (!mappings.id) mappings.id = h;
      }
    });

    // Fallbacks
    headers.forEach((h) => {
      const clean = h.toLowerCase().trim();
      if (
        !mappings.optionAEn &&
        (clean === "a" ||
          clean === "option a" ||
          clean === "optiona" ||
          clean === "1")
      )
        mappings.optionAEn = h;
      if (
        !mappings.optionBEn &&
        (clean === "b" ||
          clean === "option b" ||
          clean === "optionb" ||
          clean === "2")
      )
        mappings.optionBEn = h;
      if (
        !mappings.optionCEn &&
        (clean === "c" ||
          clean === "option c" ||
          clean === "optionc" ||
          clean === "3")
      )
        mappings.optionCEn = h;
      if (
        !mappings.optionDEn &&
        (clean === "d" ||
          clean === "option d" ||
          clean === "optiond" ||
          clean === "4")
      )
        mappings.optionDEn = h;
    });

    setCsvFieldsMapping(mappings);
    triggerToast(
      isHindi
        ? "कॉलम की ऑटो-मैपिंग पूरी हुई!"
        : "Column auto-matching completed!",
    );
  };

  const mappingsEnComplete = (q: Question) => {
    return !!(
      q.questionEn &&
      q.optionsEn &&
      q.optionsEn[0] &&
      q.optionsEn[1] &&
      q.optionsEn[2] &&
      q.optionsEn[3] &&
      q.correctAnswer
    );
  };

  // Map parsed rows to Question model items
  const generateQuestionsFromCsv = (
    rows: string[][],
    mappings: Record<string, string>,
    defaultValues: Record<string, string>,
    headers: string[],
  ) => {
    if (rows.length === 0) {
      setCsvMappedQuestions([]);
      return;
    }

    const headerIndices: Record<string, number> = {};
    headers.forEach((h, idx) => {
      headerIndices[h] = idx;
    });

    const getVal = (row: string[], fieldKey: string, fallback = ""): string => {
      const headerName = mappings[fieldKey];
      if (!headerName) return fallback;
      const colIdx = headerIndices[headerName];
      if (colIdx === undefined || colIdx >= row.length) return fallback;
      return row[colIdx] || fallback;
    };

    const seenIds = new Set<string>();

    const parsed: Question[] = rows.map((row, rowIdx) => {
      const questionEn =
        getVal(row, "questionEn").trim() ||
        `Row ${rowIdx + 1} Missing Question`;
      const questionHi = getVal(row, "questionHi").trim() || questionEn;

      const optAEn = getVal(row, "optionAEn").trim() || "Option A";
      const optBEn = getVal(row, "optionBEn").trim() || "Option B";
      const optCEn = getVal(row, "optionCEn").trim() || "Option C";
      const optDEn = getVal(row, "optionDEn").trim() || "Option D";

      const optAHi = getVal(row, "optionAHi").trim() || optAEn;
      const optBHi = getVal(row, "optionBHi").trim() || optBEn;
      const optCHi = getVal(row, "optionCHi").trim() || optCEn;
      const optDHi = getVal(row, "optionDHi").trim() || optDEn;

      // Handle correct answer parsing (e.g. might be "A", "B", "C", "D" or "1", "2", "3", "4" or option text)
      let rawAns = getVal(row, "correctAnswer").trim().toUpperCase();
      let correctAnswer: "A" | "B" | "C" | "D" = "A";

      if (
        rawAns === "A" ||
        rawAns === "B" ||
        rawAns === "C" ||
        rawAns === "D"
      ) {
        correctAnswer = rawAns as any;
      } else if (rawAns === "1" || rawAns === "0") {
        correctAnswer = "A";
      } else if (rawAns === "2") {
        correctAnswer = "B";
      } else if (rawAns === "3") {
        correctAnswer = "C";
      } else if (rawAns === "4") {
        correctAnswer = "D";
      } else if (rawAns) {
        // Try exact match with option values
        if (
          rawAns.toLowerCase() === optAEn.toLowerCase() ||
          rawAns.toLowerCase() === optAHi.toLowerCase()
        )
          correctAnswer = "A";
        else if (
          rawAns.toLowerCase() === optBEn.toLowerCase() ||
          rawAns.toLowerCase() === optBHi.toLowerCase()
        )
          correctAnswer = "B";
        else if (
          rawAns.toLowerCase() === optCEn.toLowerCase() ||
          rawAns.toLowerCase() === optCHi.toLowerCase()
        )
          correctAnswer = "C";
        else if (
          rawAns.toLowerCase() === optDEn.toLowerCase() ||
          rawAns.toLowerCase() === optDHi.toLowerCase()
        )
          correctAnswer = "D";
      }

      const explanationEn =
        getVal(row, "explanationEn").trim() ||
        `Detailed study notes for ${getVal(row, "topic") || defaultValues.topic}.`;
      const explanationHi =
        getVal(row, "explanationHi").trim() || explanationEn;

      const subject = forceDropdownCategories
        ? (defaultValues.subject || "Static GK")
        : (getVal(row, "subject").trim() || defaultValues.subject || "Static GK");
      const topic = forceDropdownCategories
        ? (defaultValues.topic || "Core Syllabus")
        : (getVal(row, "topic").trim() || defaultValues.topic || "Core Syllabus");
      const rawTags = forceDropdownCategories
        ? (defaultValues.examTags || "SSC CGL")
        : (getVal(row, "examTags").trim() || defaultValues.examTags || "SSC CGL");
      const examTags = rawTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      let parsedId = getVal(row, "id").trim();
      if (!parsedId) {
        parsedId = `csv-q-${Date.now()}-${rowIdx}-${Math.floor(Math.random() * 1000)}`;
      } else if (seenIds.has(parsedId)) {
        // Prevent complete clobbering if user grouped by a non-unique ID
        parsedId = `${parsedId}-${rowIdx}-${Math.floor(Math.random() * 1000)}`;
      }
      seenIds.add(parsedId);

      return {
        id: parsedId,
        questionEn,
        questionHi,
        optionsEn: [optAEn, optBEn, optCEn, optDEn],
        optionsHi: [optAHi, optBHi, optCHi, optDHi],
        correctAnswer,
        explanationEn,
        explanationHi,
        subject,
        topic,
        examTags,
        likes: Math.floor(Math.random() * 12) + 5,
        dislikes: 0,
      };
    });

    setCsvMappedQuestions(parsed);
  };

  const processRawCsvText = (text: string) => {
    try {
      setCsvParseError(null);
      const parsedData = parseCSV(text);
      if (parsedData.length === 0) {
        setCsvParseError(
          isHindi
            ? "कोई रो (Row) नहीं मिली। कृपया सुनिश्चित करें कि डेटा सही है।"
            : "No rows recognized in the CSV string.",
        );
        return;
      }

      const headers = parsedData[0];
      const rows = parsedData.slice(1);

      if (headers.length < 2) {
        setCsvParseError(
          isHindi
            ? "अमान्य कॉलम्स की संख्या (कम से कम 2 होने चाहिए)।"
            : "Headers must have at least 2 columns to be valid.",
        );
        return;
      }

      setCsvHeaders(headers);
      setCsvRows(rows);

      // Auto match
      autoMatchHeaders(headers);
    } catch (err: any) {
      setCsvParseError(
        isHindi
          ? `पार्सिंग समस्या: ${err.message}`
          : `CSV parse error: ${err.message}`,
      );
    }
  };

  const handleCsvFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFileName(file.name);
    setCsvParseError(null);

    // Auto-fill exam tags based on filename to help users route their questions automatically
    const nameWithoutExt = file.name.replace(/\.csv$/i, "");
    setCsvDefaultValues(prev => ({
      ...prev,
      examTags: nameWithoutExt.includes("PYQ") ? nameWithoutExt : `${nameWithoutExt}, ${prev.examTags}`
    }));

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) {
        setCsvParseError("The uploaded CSV file is empty.");
        return;
      }
      setCsvRawText(text);
      processRawCsvText(text);
    };
    reader.onerror = () => {
      setCsvParseError("An error occurred while reading the file.");
    };
    reader.readAsText(file);
  };

  const handleDownloadSimpleCsvTemplate = () => {
    const headers =
      "questionEn,questionHi,optionAEn,optionBEn,optionCEn,optionDEn,optionAHi,optionBHi,optionCHi,optionDHi,correctAnswer,explanationEn,explanationHi\n";
    const sampleRow =
      `"What is the capital of France?","फ्रांस की राजधानी क्या है?","London","Paris","Berlin","Madrid","लंदन","पेरिस","बर्लिन","मैड्रिड","B","Paris is the capital of France.","पेरिस फ्रांस की राजधानी है।"\n`;
    const blob = new Blob(["\uFEFF", headers, sampleRow], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "studyflash_simple_normal_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerToast(
      isHindi ? "सिंपल टेम्पलेट डाउनलोड किया गया" : "Simple CSV Template Downloaded",
    );
  };

  const handleDownloadCsvTemplate = () => {
    const headers =
      "id,subject,topic,questionEn,questionHi,optionAEn,optionBEn,optionCEn,optionDEn,optionAHi,optionBHi,optionCHi,optionDHi,correctAnswer,explanationEn,explanationHi,examTags\n";
    const sampleRow =
      "q-template-1,Geography,Capitals,What is the capital of France?,फ्रांस की राजधानी क्या है?,London,Paris,Berlin,Madrid,लंदन,पेरिस,बर्लिन,मैड्रिड,B,Paris is the capital of France.,पेरिस फ्रांस की राजधानी है।,ssc;upsc\n";
    const blob = new Blob(["\uFEFF", headers, sampleRow], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "studyflash_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerToast(
      isHindi ? "टेम्पलेट डाउनलोड किया गया" : "CSV Template Downloaded",
    );
  };

  const handleDeleteHistoryItem = async (id: string) => {
    try {
      const historyData = JSON.parse(
        localStorage.getItem("studyflash_upload_history") || "[]",
      );
      const itemToDelete = historyData.find((item: any) => item.id === id);
      const newHistory = historyData.filter((item: any) => item.id !== id);
      localStorage.setItem(
        "studyflash_upload_history",
        JSON.stringify(newHistory),
      );
      setHistoryRefresh((prev) => prev + 1);

      if (
        itemToDelete &&
        itemToDelete.importedIds &&
        Array.isArray(itemToDelete.importedIds)
      ) {
        const idsToRemove = new Set(itemToDelete.importedIds);
        
        try {
          const token = localStorage.getItem("studyflash_admin_token");
          await fetch("/api/questions/bulk", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ ids: Array.from(idsToRemove) }),
          });
        } catch (err) {
          console.error("Failed to delete bulk questions from DB:", err);
        }

        const remainingQs = questions.filter((q) => !idsToRemove.has(q.id));
        onSetBulkQuestions(remainingQs);
        triggerToast(
          isHindi
            ? `${itemToDelete.importedIds.length} प्रश्न हटा दिए गए`
            : `Reverted and deleted ${itemToDelete.importedIds.length} questions.`,
        );
      }
    } catch (e) {}
  };

  const handleImportCsvMappedQuestions = async () => {
    if (csvMappedQuestions.length === 0) {
      triggerToast(
        isHindi
          ? "कोई प्रश्न इम्पोर्ट करने के लिए उपलब्ध नहीं है।"
          : "No mapped questions available for import.",
      );
      return;
    }

    let updatedCount = 0;
    let addedCount = 0;

    if (csvTargetDest === "live") {
      if (!liveTestConfig || !onUpdateLiveTestConfig) return;
      onUpdateLiveTestConfig({
        ...liveTestConfig,
        test: {
          ...liveTestConfig.test,
          questions: [...liveTestConfig.test.questions, ...csvMappedQuestions],
          totalQuestions:
            liveTestConfig.test.questions.length + csvMappedQuestions.length,
          totalMarks:
            (liveTestConfig.test.questions.length + csvMappedQuestions.length) *
            2,
        },
      });
      addedCount = csvMappedQuestions.length;
    } else {
      // API call to Supabase for bulk upsert
      try {
        const token = localStorage.getItem("studyflash_admin_token");
        const res = await fetch("/api/questions/bulk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ questions: csvMappedQuestions }),
        });

        if (!res.ok) {
          throw new Error("Failed to save to database");
        }

        // Upsert logic: if ID matches, update, else append
        const updatedPool = [...questions];
        csvMappedQuestions.forEach((incomingQ) => {
          const existingIdx = updatedPool.findIndex((q) => q.id === incomingQ.id);
          if (existingIdx !== -1) {
            updatedPool[existingIdx] = incomingQ;
            updatedCount++;
          } else {
            updatedPool.unshift(incomingQ);
            addedCount++;
          }
        });
        onSetBulkQuestions(updatedPool);
      } catch (err) {
        console.error("Error saving bulk questions:", err);
        triggerToast("Error saving to database. Changes saved locally.");
        
        // Upsert locally as fallback
        const updatedPool = [...questions];
        csvMappedQuestions.forEach((incomingQ) => {
          const existingIdx = updatedPool.findIndex((q) => q.id === incomingQ.id);
          if (existingIdx !== -1) {
            updatedPool[existingIdx] = incomingQ;
            updatedCount++;
          } else {
            updatedPool.unshift(incomingQ);
            addedCount++;
          }
        });
        onSetBulkQuestions(updatedPool);
      }
    }

    triggerToast(
      isHindi
        ? `${addedCount} जोड़े गए, ${updatedCount} प्रश्न अपडेट किए गए!`
        : `Successfully added ${addedCount} and updated ${updatedCount} CSV questions!`,
    );

    try {
      const existingHist = JSON.parse(
        localStorage.getItem("studyflash_upload_history") || "[]",
      );
      const newHist = [
        {
          id: Date.now().toString(),
          filename: csvFileName || "Pasted CSV Data",
          date: new Date().toLocaleString(),
          count: csvMappedQuestions.length,
          importedIds: csvMappedQuestions.map((q) => q.id),
          target: csvTargetDest,
        },
        ...existingHist,
      ];
      localStorage.setItem(
        "studyflash_upload_history",
        JSON.stringify(newHist),
      );
    } catch (e) {}

    // Clear states
    setCsvRawText("");
    setCsvFileName("");
    setCsvHeaders([]);
    setCsvRows([]);
    setCsvMappedQuestions([]);
    setCsvParseError(null);
  };

  // Re-run CSV schema generation whenever mappings, default values, or rows shift
  const mappingSerialized = JSON.stringify(csvFieldsMapping);
  const defaultValuesSerialized = JSON.stringify(csvDefaultValues);
  const headersSerialized = JSON.stringify(csvHeaders);

  useEffect(() => {
    if (csvRows.length > 0 && csvHeaders.length > 0) {
      generateQuestionsFromCsv(
        csvRows,
        csvFieldsMapping,
        csvDefaultValues,
        csvHeaders,
      );
    } else {
      setCsvMappedQuestions([]);
    }
  }, [
    csvRows.length,
    mappingSerialized,
    defaultValuesSerialized,
    headersSerialized,
    forceDropdownCategories,
  ]);

  // SEO variables
  const [seoTitle, setSeoTitle] = useState(
    "StudyFlash - India's #1 Bilingual GK & MCQ Test Series Platform",
  );
  const [seoDesc, setSeoDesc] = useState(
    "Free daily GK quizzes, study material, previous year solved papers with expert explanation memory tricks for SSC CGL, Bihar Police, Railway NTPC.",
  );

  // Settings - Password variables
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<{type: "success" | "error", msg: string} | null>(null);

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordChangeStatus(null);
    
    if (newPassword !== confirmPassword) {
      setPasswordChangeStatus({ type: "error", msg: isHindi ? "नया पासवर्ड मेल नहीं खाता।" : "New passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordChangeStatus({ type: "error", msg: isHindi ? "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।" : "Password must be at least 6 characters." });
      return;
    }

    try {
      const token = localStorage.getItem("studyflash_admin_token");
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setPasswordChangeStatus({ type: "success", msg: isHindi ? "पासवर्ड सफलतापूर्वक बदल दिया गया।" : "Password updated successfully." });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        triggerToast(isHindi ? "एडमिन पासवर्ड अपडेट हो गया!" : "Admin password updated!");
      } else {
        setPasswordChangeStatus({ type: "error", msg: data.error || (isHindi ? "पासवर्ड बदलने में त्रुटि।" : "Failed to change password.") });
      }
    } catch (err) {
      setPasswordChangeStatus({ type: "error", msg: isHindi ? "सर्वर से कनेक्ट करने में त्रुटि।" : "Error connecting to server." });
    }
  };

  const [robotsTxt, setRobotsTxt] = useState(`User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://studyflash.co/sitemap.xml`);
  const [toast, setToast] = useState<string | null>(null);

  // Authentication validation logic against Express `/api/admin/login`
  const handleAdminLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        sessionStorage.setItem("admin_session", "true");
        if (data.token) {
          localStorage.setItem("studyflash_admin_token", data.token);
        }
        setIsAuthorized(true);
        triggerToast(
          isHindi
            ? "एडमिन लॉगिन सफल!"
            : "Admin supervisor authenticated successfully!",
        );
      } else {
        setLoginError(
          data.error ||
            (isHindi
              ? "गलत एडमिन ईमेल या पासवर्ड।"
              : "Incorrect admin credentials. Please try again."),
        );
      }
    } catch (err) {
      setLoginError(
        isHindi
          ? "सर्वर से कनेक्ट नहीं हो सका।"
          : "Could not reach administrative gateway server.",
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("admin_session");
    localStorage.removeItem("studyflash_admin_token");
    setIsAuthorized(false);
    setAdminEmail("");
    setAdminPassword("");
    triggerToast(
      isHindi
        ? "एडमिन हब से लॉगआउट किया गया"
        : "Successfully logged out of Admin Hub",
    );
  };

  // Trigger Toast helper
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Submit standard single form
  const handleSingleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!questionEn || !optAEn || !topic) {
      triggerToast("Missing required English content or topic.");
      return;
    }

    const newQs: Question = {
      id: "q-" + Date.now(),
      questionEn,
      questionHi: questionHi || questionEn,
      optionsEn: [optAEn, optBEn, optCEn, optDEn],
      optionsHi: [
        optAHi || optAEn,
        optBHi || optBEn,
        optCHi || optCEn,
        optDHi || optDEn,
      ],
      correctAnswer,
      explanationEn: explanationEn || `Explanation for this item on ${topic}.`,
      explanationHi:
        explanationHi ||
        `${topic} के इस प्रश्न के लिए विस्तृत उत्तर स्पष्टीकरण।`,
      subject,
      topic,
      examTags: examTagField
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      likes: 1,
      dislikes: 0,
    };

    onAddQuestion(newQs);
    triggerToast("Question uploaded live to local database!");

    // clear states
    setQuestionEn("");
    setQuestionHi("");
    setOptAEn("");
    setOptBEn("");
    setOptCEn("");
    setOptDEn("");
    setOptAHi("");
    setOptBHi("");
    setOptCHi("");
    setOptDHi("");
    setExplanationEn("");
    setExplanationHi("");
    setTopic("");
  };

  // Submit Bulk JSON
  const handleBulkSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(bulkTextInput);
      if (!Array.isArray(parsed)) {
        triggerToast("JSON must be a flat array of questions.");
        return;
      }

      const verified: Question[] = parsed.map((item, idx) => {
        return {
          id: item.id || `bulk-q-${Date.now()}-${idx}`,
          questionEn: item.questionEn || "Unnamed Question",
          questionHi: item.questionHi || item.questionEn || "",
          optionsEn: item.optionsEn || ["A", "B", "C", "D"],
          optionsHi: item.optionsHi || item.optionsHi || ["A", "B", "C", "D"],
          correctAnswer: item.correctAnswer || "A",
          explanationEn: item.explanationEn || "No English Explanation set.",
          explanationHi: item.explanationHi || "No Hindi Explanation set.",
          subject: item.subject || "General Studies",
          topic: item.topic || "Core Topic",
          examTags: item.examTags || ["SSC", "Railway"],
          likes: item.likes || 10,
          dislikes: item.dislikes || 0,
        };
      });

      onSetBulkQuestions([...verified, ...questions]);
      triggerToast(`Loaded ${verified.length} new questions flawlessly!`);
      setBulkTextInput("");

      try {
        const existingHist = JSON.parse(
          localStorage.getItem("studyflash_upload_history") || "[]",
        );
        const newHist = [
          {
            id: Date.now().toString(),
            filename: "Pasted JSON Data",
            date: new Date().toLocaleString(),
            count: verified.length,
            importedIds: verified.map((q) => q.id),
          },
          ...existingHist,
        ];
        localStorage.setItem(
          "studyflash_upload_history",
          JSON.stringify(newHist),
        );
      } catch (e) {}
    } catch (err: any) {
      triggerToast(`JSON Syntax Error: ${err.message}`);
    }
  };

  // Duplicate a Question
  const handleDuplicateQuestion = (q: Question) => {
    const clone: Question = {
      ...q,
      id: "q-clone-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      questionEn: `${q.questionEn} (Copy)`,
      questionHi: `${q.questionHi} (प्रतिलिपि)`,
    };
    onAddQuestion(clone);
    triggerToast("Question duplicated successfully!");
  };

  // Delete a Question
  const handleDeleteSelected = (id: string) => {
    if (deleteConfirmId !== id) {
      setDeleteConfirmId(id);
      setTimeout(() => {
        setDeleteConfirmId((curr) => (curr === id ? null : curr));
      }, 3000);
      return;
    }

    if (onDeleteQuestion) {
      onDeleteQuestion(id);
      triggerToast(
        isHindi
          ? "प्रश्न को सफलतापूर्वक हटा दिया गया।"
          : "Question deleted from memory pool.",
      );
    } else {
      const remaining = questions.filter((item) => item.id !== id);
      onSetBulkQuestions(remaining);
      triggerToast(
        isHindi
          ? "प्रश्न को सफलतापूर्वक हटा दिया गया।"
          : "Question removed successfully.",
      );
    }
    setDeleteConfirmId(null);
  };

  // Launch editing modal
  const startEditing = (q: Question) => {
    setEditingQuestion({ ...q });
  };

  // Save changes from editing modal
  const saveEditedQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;

    if (onUpdateQuestion) {
      onUpdateQuestion(editingQuestion);
      triggerToast("Question changes saved successfully!");
    } else {
      const updated = questions.map((q) =>
        q.id === editingQuestion.id ? editingQuestion : q,
      );
      onSetBulkQuestions(updated);
      triggerToast("Question database updated.");
    }
    setEditingQuestion(null);
  };

  const dummyUsers = [
    {
      name: "Aman Preet Singh",
      email: "aman.singh@gmail.com",
      xp: "14,520 XP",
      status: "Premium Active",
      dateJoined: "2026-02-14",
    },
    {
      name: "Priya Sharma",
      email: "priya.gk@hotmail.com",
      xp: "13,900 XP",
      status: "Premium Active",
      dateJoined: "2026-03-22",
    },
    {
      name: "Rahul Verma",
      email: "rahulverma@outlook.com",
      xp: "9,600 XP",
      status: "Standard User",
      dateJoined: "2026-04-10",
    },
    {
      name: "Rajiv Ranjan",
      email: "pvtmida@gmail.com",
      xp: "4,150 XP",
      status: "Premium Active",
      dateJoined: "2026-05-18",
    },
    {
      name: "Sumit Yadav",
      email: "sumit.yd@gmail.com",
      xp: "2,400 XP",
      status: "Standard User",
      dateJoined: "2026-06-01",
    },
  ];

  // Filtering DB MCQs
  const filteredQuestions = questions.filter((q) => {
    const term = manageSearch.trim().toLowerCase();

    const matchesSearch =
      !term ||
      q.questionEn.toLowerCase().includes(term) ||
      q.questionHi.toLowerCase().includes(term) ||
      q.topic.toLowerCase().includes(term) ||
      (q.examTags &&
        q.examTags.some((tag) => tag.toLowerCase().includes(term)));

    const matchesSubject =
      manageSubjectFilter === "All" ||
      q.subject.toLowerCase() === manageSubjectFilter.toLowerCase();

    return matchesSearch && matchesSubject;
  });

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const paginatedQuestions = filteredQuestions.slice(
    (managePage - 1) * itemsPerPage,
    managePage * itemsPerPage,
  );

  const dynamicSubjects = useMemo(
    () => [
      "All",
      ...Array.from(new Set(questions.map((q) => q.subject))).filter(
        (s) => s && s !== "All",
      ),
    ],
    [questions],
  );

  // Export questions to CSV
  const handleExportToCsv = () => {
    const itemsToExport =
      filteredQuestions.length > 0 ? filteredQuestions : questions;

    if (itemsToExport.length === 0) {
      triggerToast(
        isHindi
          ? "निर्यात करने के लिए कोई प्रश्न नहीं है।"
          : "No questions to export.",
      );
      return;
    }

    const headers = [
      "ID",
      "Subject",
      "Topic",
      "Question (EN)",
      "Question (HI)",
      "Option A (EN)",
      "Option B (EN)",
      "Option C (EN)",
      "Option D (EN)",
      "Option A (HI)",
      "Option B (HI)",
      "Option C (HI)",
      "Option D (HI)",
      "Correct Answer",
      "Explanation (EN)",
      "Explanation (HI)",
      "Exam Tags",
    ];

    const rows = itemsToExport.map((q) => {
      const escape = (text: string | null | undefined) => {
        if (!text) return "";
        const str = String(text).replace(/"/g, '""');
        if (str.includes(",") || str.includes('"') || str.includes("\n"))
          return `"${str}"`;
        return str;
      };

      return [
        q.id,
        q.subject,
        q.topic,
        escape(q.questionEn),
        escape(q.questionHi),
        escape(q.optionsEn[0]),
        escape(q.optionsEn[1]),
        escape(q.optionsEn[2]),
        escape(q.optionsEn[3]),
        escape(q.optionsHi[0]),
        escape(q.optionsHi[1]),
        escape(q.optionsHi[2]),
        escape(q.optionsHi[3]),
        q.correctAnswer,
        escape(q.explanationEn),
        escape(q.explanationHi),
        escape((q.examTags || []).join("; ")),
      ].join(",");
    });

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `studyflash_questions_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerToast(
      isHindi
        ? "CSV डाउनलोड शुरू हो गया है!"
        : "CSV Export triggered successfully!",
    );
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto space-y-6 py-12" id="admin-login-gate">
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce text-xs font-semibold">
            <span>{toast}</span>
          </div>
        )}

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-6 text-center">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-sky-400">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              {isHindi ? "एडमिन हब लॉगिन" : "Supervisor Hub Gate ID"}
            </h3>
            <p className="text-xs text-slate-500 font-sans">
              {isHindi
                ? "SEO टूल्स और कैंडिडेट मैनेजमेंट एक्सेस करने के लिए क्रेडेंशियल दर्ज करें।"
                : "Authenticate with your unique supervisor credentials to sync core assets."}
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 block uppercase">
                Admin Email
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="administrator@studyflash.co"
                className="w-full text-xs p-3 border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 block uppercase">
                Gate Secure Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full text-xs p-3 border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs rounded-xl border border-red-100 dark:border-red-900/40 text-center font-medium">
                ⚠️ {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-500/10 cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn
                ? isHindi
                  ? "सत्यापित किया जा रहा है..."
                  : "Authenticating Security..."
                : isHindi
                  ? "प्रवेश करें"
                  : "Acknowledge Credentials"}
            </button>
          </form>

          <div className="text-[10px] text-slate-400 dark:text-slate-500">
            <span>
              Logged in as <code>pvtmida@gmail.com</code>? Set credentials
              locally inside environment configuration.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6" id="admin-hub-dashboard">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce text-xs font-semibold">
          <span>{toast}</span>
        </div>
      )}

      {/* Admin Title metadata banner */}
      <div className="bg-gradient-to-tr from-slate-900 to-slate-800 p-6 rounded-3xl text-white flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-lg font-bold font-sans flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-400 animate-pulse" />{" "}
            Administrative Hub & MCQ Studio
          </h2>
          <span className="text-xs text-slate-400">
            Add, revise, filter, or import high-standard bilingual test items
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          <span className="text-[11px] text-emerald-400 font-mono tracking-wide">
            ● {isHindi ? "सक्रिय सुपरवाइजर सत्र" : "Active Supervisor"}
          </span>
          <button
            onClick={handleAdminLogout}
            className="text-[10px] bg-red-650 hover:bg-red-700 hover:scale-[1.01] border border-red-500/20 text-white rounded-xl px-3 py-1.5 font-bold cursor-pointer transition-all uppercase"
          >
            {isHindi ? "लॉगआउट" : "Sign Out"}
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex overflow-x-auto space-x-1 border-b border-slate-200 dark:border-slate-900 pb-px scrollbar-none">
        {[
          {
            id: "manage",
            label: isHindi ? `प्रश्नों का प्रबंधन (${questions.length})` : `Manage Questions (${questions.length})`,
            icon: Database,
          },
          { id: "mocktests", label: isHindi ? "मॉक टेस्ट" : "Mock Tests", icon: FileText },
          { id: "live", label: isHindi ? "लाइव टेस्ट" : "Live Test", icon: Activity },
          { id: "seo", label: isHindi ? "सेटिंग्स और SEO" : "Settings & SEO", icon: Settings },
          { id: "users", label: isHindi ? "उम्मीदवार" : "Candidates", icon: Users },
          { id: "adsense", label: isHindi ? "गूगल एडसेंस" : "AdSense Placeholders", icon: Layout },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-indigo-600 text-indigo-600 dark:text-sky-400"
                  : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        {/* Manage Questions List Grid */}
        {activeTab === "manage" && (
          <div className="space-y-6">
            {/* Filter and Quick Action bar */}
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-900">
              <div className="flex flex-1 w-full flex-col sm:flex-row gap-2">
                {/* Search Text field */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={manageSearch}
                    onChange={(e) => {
                      setManageSearch(e.target.value);
                      setManagePage(1);
                    }}
                    placeholder={
                      isHindi
                        ? "प्रश्न, विषय या एग्जाम टैग खोजें..."
                        : "Search questions, topics, exam tags..."
                    }
                    className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/50 dark:bg-slate-900/50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                  />
                  {manageSearch && (
                    <button
                      onClick={() => setManageSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Subject dropdown filter */}
                <select
                  value={manageSubjectFilter}
                  onChange={(e) => {
                    setManageSubjectFilter(e.target.value);
                    setManagePage(1);
                  }}
                  className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-400"
                >
                  {dynamicSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub === "All" && isHindi ? "सभी विषय (All)" : sub}
                    </option>
                  ))}
                </select>
              </div>

              {/* Counts tracker */}
              <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <span>
                  Showing{" "}
                  <strong className="text-slate-900 dark:text-slate-200">
                    {filteredQuestions.length}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-indigo-600 dark:text-sky-400">
                    {questions.length}
                  </strong>{" "}
                  items
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setManageSearch("");
                    setManageSubjectFilter("All");
                    triggerToast("Database filter reset complete");
                  }}
                  className="p-1 px-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition-all"
                  title="Reset Filter"
                >
                  <RefreshCw className="h-3.5 w-3.5 inline mr-1" />
                  <span className="sr-only">Reset Filters</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportToCsv}
                  className="p-1 px-3 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-sky-400 font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ml-2"
                  title="Export to CSV"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>{isHindi ? "CSV एक्सपोर्ट" : "CSV Export"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsCsvModalOpen(true)}
                  className="p-1 px-3 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/40 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ml-2"
                  title={isHindi ? "प्रश्न इम्पोर्ट" : "Import Questions"}
                >
                  <Upload className="h-3.5 w-3.5" />
                  <span>{isHindi ? "प्रश्न इम्पोर्ट" : "Import Questions"}</span>
                </button>
              </div>
            </div>

            {/* List rendered */}
            {filteredQuestions.length === 0 ? (
              <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
                <AlertCircle className="h-8 w-8 text-slate-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                  {isHindi ? "कोई प्रश्न नहीं मिला" : "No matching MCQs found"}
                </h4>
                <p className="text-xs text-slate-400">
                  {isHindi
                    ? "कृपया अपना सर्च शब्द बदलें या नया प्रश्न बनाएं"
                    : "Try clearing your filters or add new custom bilingual mock questions."}
                </p>
                <div className="pt-2 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setManageSearch("");
                      setManageSubjectFilter("All");
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-805 text-[10.5px] font-bold rounded-xl transition cursor-pointer"
                  >
                    {isHindi ? "फ़िल्टर साफ़ करें" : "Clear Filters"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {paginatedQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 border border-slate-150 dark:border-slate-800 bg-slate-50/30 hover:bg-slate-50/75 dark:bg-slate-900/30 dark:hover:bg-slate-900/80 rounded-2xl space-y-3 transition group"
                  >
                    {/* Header info bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-sky-305 font-extrabold px-2 py-0.5 rounded-full ring-1 ring-indigo-100/30 dark:ring-slate-700/50">
                          {q.subject}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800">
                          {q.topic}
                        </span>

                        {q.examTags &&
                          q.examTags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[9px] font-semibold text-slate-400 dark:text-slate-500"
                            >
                              #{tag}
                            </span>
                          ))}
                      </div>

                      {/* Immediate Core action bar */}
                      <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-all">
                        {/* Edit Button */}
                        <button
                          onClick={() => startEditing(q)}
                          className="p-1.5 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 text-slate-600 hover:text-indigo-605 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-800 rounded-lg transition-all cursor-pointer shadow-sm"
                          title={isHindi ? "संपादित करें / Edit" : "Edit MCQ"}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>

                        {/* Duplicate Button */}
                        <button
                          onClick={() => handleDuplicateQuestion(q)}
                          className="p-1.5 bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-slate-800 text-slate-600 hover:text-emerald-605 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-800 rounded-lg transition-all cursor-pointer shadow-sm"
                          title={
                            isHindi ? "कॉपी बनाएं / Duplicate" : "Duplicate MCQ"
                          }
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteSelected(q.id)}
                          className={`p-1.5 border rounded-lg transition-all cursor-pointer shadow-sm ${
                            deleteConfirmId === q.id
                              ? "bg-red-500 text-white border-red-600 hover:bg-red-600 px-3 flex items-center gap-1 font-bold text-xs"
                              : "bg-white dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-slate-800 text-slate-600 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 border-slate-200 dark:border-slate-800"
                          }`}
                          title={isHindi ? "हटाएं / Delete" : "Delete MCQ"}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {deleteConfirmId === q.id && (
                            <span>{isHindi ? "पुष्टि करें?" : "Sure?"}</span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Question Content */}
                    <div className="space-y-1 font-sans">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-start gap-1">
                        <span className="text-indigo-500">Q.</span>
                        <span>{q.questionEn}</span>
                      </h4>
                      {q.questionHi && q.questionHi !== q.questionEn && (
                        <p className="text-[11.5px] text-slate-550 dark:text-slate-400 pr-4 italic leading-relaxed">
                          अनुवाद: {q.questionHi}
                        </p>
                      )}
                    </div>

                    {/* Styled Options Row list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10.5px] pt-1">
                      {q.optionsEn.map((opt, oIdx) => {
                        const letter = ["A", "B", "C", "D"][oIdx];
                        const isCorrect = letter === q.correctAnswer;
                        const optHi = q.optionsHi?.[oIdx];
                        return (
                          <div
                            key={oIdx}
                            className={`p-2 rounded-xl flex flex-col justify-center border font-sans ${
                              isCorrect
                                ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/40 text-slate-800 dark:text-emerald-305 font-bold"
                                : "bg-transparent border-slate-100 dark:border-slate-800 text-slate-500"
                            }`}
                          >
                            <div className="flex gap-1 items-start">
                              <span
                                className={`px-1.5 py-0.1 select-none text-[9px] font-extrabold rounded ${isCorrect ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"}`}
                              >
                                {letter}
                              </span>
                              <div className="flex-1">
                                <div>{opt}</div>
                                {optHi && optHi !== opt && (
                                  <div className="text-[9px] opacity-75 font-normal italic">
                                    {optHi}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Brief explanations section */}
                    {(q.explanationEn || q.explanationHi) && (
                      <div className="pt-2 text-[9px] text-slate-500 flex items-start gap-1 border-t border-slate-100 dark:border-slate-900/50">
                        <span className="font-bold text-indigo-500 shrink-0">
                          Explanation:
                        </span>
                        <p className="line-clamp-2 md:line-clamp-none leading-relaxed">
                          {q.explanationEn || q.explanationHi}
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between pt-4 pb-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setManagePage((p) => Math.max(1, p - 1))}
                      disabled={managePage === 1}
                      className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-lg disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      {isHindi ? "पिछला" : "Previous"}
                    </button>
                    <span className="text-[11px] font-bold text-slate-500">
                      Page {managePage} of {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setManagePage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={managePage === totalPages}
                      className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-lg disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      {isHindi ? "अगला" : "Next"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Live Test Configuration */}
        {activeTab === "live" && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-bold block pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" />
              {isHindi
                ? "ऑल इंडिया लाइव टेस्ट कॉन्फ़िगरेशन"
                : "All India Live Test Configuration"}
            </h3>

            <div className="space-y-6 max-w-xl bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">
                  Public Result Date
                </label>
                <input
                  type="date"
                  value={liveTestConfig?.resultDate.split("T")[0] || ""}
                  onChange={(e) =>
                    onUpdateLiveTestConfig &&
                    liveTestConfig &&
                    onUpdateLiveTestConfig({
                      ...liveTestConfig,
                      resultDate: e.target.value + "T00:00:00",
                    })
                  }
                  className="w-full text-xs p-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  This date will be publicly visible on the main portal's
                  countdown timer.
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center justify-between">
                  <span>Current Mega Test Roster</span>
                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full text-[10px]">
                    {liveTestConfig?.test.questions.length} assigned
                  </span>
                </label>
                <p className="text-xs text-slate-500">
                  Update the live test question bank dynamically. This reflects
                  immediately on the public portal for users who attempt the
                  "All India Mega Test".
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (liveTestConfig && onUpdateLiveTestConfig) {
                        onUpdateLiveTestConfig({
                          ...liveTestConfig,
                          test: {
                            ...liveTestConfig.test,
                            questions: [],
                            totalQuestions: 0,
                            totalMarks: 0,
                          },
                        });
                        setLiveCsvRawText("");
                        setLiveCsvFileName("");
                        alert("Live Test question bank cleared.");
                      }
                    }}
                    className="w-full py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-xl border border-red-100 dark:border-red-900/30 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" /> Purge Reset Live Test Questions
                  </button>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-700 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-500">
                    Import CSV File to Live Test
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Default Subject"
                      value={liveCsvSubject}
                      onChange={(e) => setLiveCsvSubject(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Default Topic"
                      value={liveCsvTopic}
                      onChange={(e) => setLiveCsvTopic(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Prefix ID (e.g. live2026)"
                      value={liveCsvId}
                      onChange={(e) => setLiveCsvId(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:border-emerald-500 transition-colors">
                    <input
                      type="file"
                      id="live-csv-file-upload"
                      accept=".csv"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const text = event.target?.result as string;
                          setLiveCsvRawText(text);
                          setLiveCsvFileName(file.name);
                        };
                        reader.readAsText(file);
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="live-csv-file-upload"
                      className="cursor-pointer space-y-2 block"
                    >
                      <Upload className="h-8 w-8 text-slate-400 mx-auto" />
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        {isHindi
                          ? "क्लिक करें या CSV फाइल यहां ड्रैग करें"
                          : "Click to select or drag CSV file here"}
                      </p>
                      {liveCsvFileName ? (
                        <p className="text-[10px] text-emerald-600 font-bold">
                          📎 {liveCsvFileName}
                        </p>
                      ) : (
                        <p className="text-[10px] text-slate-400">
                          Supports standard .csv format
                        </p>
                      )}
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!liveTestConfig || !onUpdateLiveTestConfig) return;
                      if (!liveCsvRawText.trim())
                        return alert("Please paste CSV data.");

                      try {
                        const rawLines = liveCsvRawText
                          .split(/\r?\n/)
                          .filter((line) => line.trim() !== "");
                        if (rawLines.length < 1) return alert("No data found.");

                        const isTSV = liveCsvRawText.indexOf("\t") !== -1;
                        const delimiter = isTSV ? "\t" : ",";

                        const rows: string[][] = [];
                        for (const line of rawLines) {
                          const row: string[] = [];
                          let inQuotes = false;
                          let currentVal = "";
                          for (let j = 0; j < line.length; j++) {
                            const char = line[j];
                            if (char === '"') {
                              if (inQuotes && line[j + 1] === '"') {
                                currentVal += '"';
                                j++;
                              } else inQuotes = !inQuotes;
                            } else if (char === delimiter && !inQuotes) {
                              row.push(currentVal.trim());
                              currentVal = "";
                            } else {
                              currentVal += char;
                            }
                          }
                          row.push(currentVal.trim());
                          rows.push(row);
                        }

                        const hasHeader =
                          rows[0] &&
                          rows[0].some(
                            (c) =>
                              c.toLowerCase().includes("question") ||
                              c.toLowerCase().includes("subject") ||
                              c.toLowerCase().includes("id") ||
                              c.toLowerCase() === "q",
                          );
                        const dataRows = hasHeader ? rows.slice(1) : rows;

                        const validRows = dataRows.filter(
                          (r) => r.join("").replace(/,/g, "").trim() !== "",
                        );
                        const parsedQs = validRows.map((r, i) => {
                          // Standard form: ID[0], Subject[1], Topic[2], QEn[3], QHi[4], AEn[5], BEn[6], CEn[7], DEn[8]
                          // AHi[9], BHi[10], CHi[11], DHi[12], Ans[13], ExpEn[14], ExpHi[15], Tags[16]
                          const prefix =
                            liveCsvId.trim() || `live_q_${Date.now()}`;
                          const generatedId = r[0]
                            ? r[0].trim()
                            : `${prefix}_${i}`;
                          const parsedTags = r[16]
                            ? r[16]
                                .split(/[;,]/)
                                .map((t) => t.trim())
                                .filter(Boolean)
                            : ["LiveTest"];

                          return {
                            id: generatedId,
                            subject:
                              (r[1] ? r[1].trim() : liveCsvSubject.trim()) ||
                              "Live Subject",
                            topic:
                              (r[2] ? r[2].trim() : liveCsvTopic.trim()) ||
                              "Live Topic",
                            questionEn: r[3] || "",
                            questionHi: r[4] || "",
                            optionsEn: [r[5], r[6], r[7], r[8]].filter(Boolean),
                            optionsHi: [r[9], r[10], r[11], r[12]].filter(
                              Boolean,
                            ),
                            correctAnswer: (r[13] || "A")
                              .trim()
                              .toUpperCase()
                              .charAt(0) as "A" | "B" | "C" | "D",
                            explanationEn: r[14] || "",
                            explanationHi: r[15] || "",
                            examTags: parsedTags,
                            likes: 0,
                            dislikes: 0,
                          };
                        }) as Question[];

                        if (parsedQs.length === 0)
                          return alert(
                            `Failed to parse. Valid rows found: ${validRows.length}. Top row columns: ${rows[0]?.length}`,
                          );

                        onUpdateLiveTestConfig({
                          ...liveTestConfig,
                          test: {
                            ...liveTestConfig.test,
                            questions: [
                              ...liveTestConfig.test.questions,
                              ...parsedQs,
                            ],
                            totalQuestions:
                              liveTestConfig.test.questions.length +
                              parsedQs.length,
                            totalMarks:
                              (liveTestConfig.test.questions.length +
                                parsedQs.length) *
                              2,
                          },
                        });

                        setLiveCsvRawText("");
                        setLiveCsvFileName("");
                        alert(
                          `Successfully appended ${parsedQs.length} questions to Live Test!`,
                        );
                      } catch (err) {
                        alert(
                          "Error parsing CSV format. Please ensure all columns map correctly.",
                        );
                      }
                    }}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-xl transition-colors shadow-sm"
                  >
                    Import CSV to Live Roster
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generative AI MCQ Builder (Calling dynamic Gemini endpoint) */}
        {activeTab === "mocktests" && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-bold block pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Layout className="h-4 w-4 text-indigo-500" />
              {isHindi
                ? "मॉक टेस्ट बनाएं और प्रबंधित करें"
                : "Build & Manage Mock Tests"}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Block */}
              <div className="lg:col-span-1 space-y-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 self-start sticky top-6">
                <h4 className="text-xs font-bold uppercase text-slate-500">
                  Create New Test
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block">
                      Title (English)
                    </label>
                    <input
                      type="text"
                      value={mtTitleEn}
                      onChange={(e) => setMtTitleEn(e.target.value)}
                      placeholder="e.g. SSC CGL Master Test"
                      className="w-full text-xs p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block">
                      Title (Hindi)
                    </label>
                    <input
                      type="text"
                      value={mtTitleHi}
                      onChange={(e) => setMtTitleHi(e.target.value)}
                      placeholder="e.g. एसएससी मास्टर टेस्ट"
                      className="w-full text-xs p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block">
                        Exam Category
                      </label>
                      {mtIsPYQ ? (
                        <select
                          value={mtExam}
                          onChange={(e) => setMtExam(e.target.value)}
                          className="w-full text-xs p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="SSC CGL PYQ">SSC CGL PYQ</option>
                          <option value="SSC CHSL PYQ">SSC CHSL PYQ</option>
                          <option value="SSC GD PYQ">SSC GD PYQ</option>
                          <option value="SSC MTS PYQ">SSC MTS PYQ</option>
                          <option value="IBPS PO PYQ">IBPS PO PYQ</option>
                          <option value="SBI Clerk PYQ">SBI Clerk PYQ</option>
                          <option value="RRB NTPC PYQ">RRB NTPC PYQ</option>
                          <option value="RRB Group D PYQ">RRB Group D PYQ</option>
                          <option value="RRB ALP PYQ">RRB ALP PYQ</option>
                          <option value="UPSC Prelims PYQ">UPSC Prelims PYQ</option>
                          <option value="CDS NDA PYQ">CDS / NDA PYQ</option>
                          <option value="UP Police PYQ">UP Police PYQ</option>
                          <option value="Bihar Police PYQ">Bihar Police PYQ</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={mtExam}
                          onChange={(e) => setMtExam(e.target.value)}
                          className="w-full text-xs p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      )}
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={mtSubject}
                        onChange={(e) => setMtSubject(e.target.value)}
                        className="w-full text-xs p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block">
                        Qs (#)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={mtQuestionsCount}
                        onChange={(e) =>
                          setMtQuestionsCount(parseInt(e.target.value) || 25)
                        }
                        className="w-full text-xs p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block">
                        Duration (min) (60s/Q)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={mtQuestionsCount}
                        disabled
                        className="w-full text-xs p-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-lg focus:outline-none cursor-not-allowed opacity-75"
                      />
                    </div>
                  <div className="grid grid-cols-2 gap-2 mt-2 items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mtIsPYQ}
                        onChange={(e) => {
                          setMtIsPYQ(e.target.checked);
                          if (e.target.checked && !mtExam.endsWith("PYQ")) {
                            setMtExam("SSC CGL PYQ");
                          }
                        }}
                        className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                      />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Is Previous Year Paper?
                      </span>
                    </label>
                    {mtIsPYQ && (
                      <p className="text-[10px] text-slate-500">
                        Note: Exam Category must exactly match a PYQ Folder ID (e.g., "SSC CGL PYQ").
                      </p>
                    )}
                  </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (!mtTitleEn) return alert("Title required");
                        if (onAddMockTest) {
                          let sourceQs = [...questions];
                          if (mtSubject && mtSubject.toLowerCase() !== "all" && mtSubject.trim() !== "") {
                            sourceQs = sourceQs.filter(
                              q => q.subject.toLowerCase() === mtSubject.toLowerCase()
                            );
                          }
                          if (sourceQs.length === 0) {
                            return alert(
                              isHindi
                                ? `डेटाबेस में Subject: "${mtSubject}" के लिए कोई प्रश्न नहीं मिला।`
                                : `No questions found for Subject: "${mtSubject}" in the database.`
                            );
                          }
                          const qs = [...sourceQs]
                            .sort(() => 0.5 - Math.random())
                            .slice(0, mtQuestionsCount);
                          const newTest: MockTest = {
                            id: `mock_${Date.now()}`,
                            titleEn: mtTitleEn,
                            titleHi: mtTitleHi || mtTitleEn,
                            exam: mtExam,
                            subject: mtSubject,
                            duration: qs.length, // 1 minute per question
                            totalQuestions: qs.length,
                            totalMarks: qs.length * 2,
                            questions: qs,
                            isPreviousYear: mtIsPYQ,
                          };
                          onAddMockTest(newTest);
                          setMtTitleEn("");
                          setMtTitleHi("");
                          alert("Mock test generated with random questions!");
                        }
                      }}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Shuffle className="w-4 h-4" /> Auto-Generate Test (Random
                      Qs)
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowMtCsv(!showMtCsv)}
                      className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" /> Import Custom CSV Bundle
                    </button>

                    {showMtCsv && (
                      <div className="space-y-2 mt-2 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                        <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center hover:border-indigo-500 transition-colors">
                          <input
                            type="file"
                            id="mock-csv-file-upload"
                            accept=".csv"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const text = event.target?.result as string;
                                setMtCsvRawText(text);
                                setMtCsvFileName(file.name);
                              };
                              reader.readAsText(file);
                            }}
                            className="hidden"
                          />
                          <label
                            htmlFor="mock-csv-file-upload"
                            className="cursor-pointer space-y-1 block"
                          >
                            <Upload className="h-6 w-6 text-slate-400 mx-auto animate-bounce" />
                            <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">
                              {isHindi
                                ? "क्लिक करें या CSV फ़ाइल यहाँ ड्रैग करें"
                                : "Click to select or drag CSV file here"}
                            </p>
                            {mtCsvFileName ? (
                              <p className="text-[9px] text-emerald-605 font-bold">
                                📎 {mtCsvFileName}
                              </p>
                            ) : (
                              <p className="text-[8px] text-slate-400">
                                Supports standard question format .csv
                              </p>
                            )}
                          </label>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (!mtTitleEn) return alert("Title required");
                            if (!mtCsvRawText.trim()) return alert(isHindi ? "कृपया पहले एक CSV फ़ाइल अपलोड करें।" : "Please upload a CSV file first.");
                            const rows = parseCSV(mtCsvRawText);
                            if (rows.length < 1)
                              return alert(
                                "No valid CSV data found.",
                              );

                            try {
                              // Filter out obvious header rows
                              const hasHeader = rows[0].some(cell => cell.toLowerCase().includes("id") || cell.toLowerCase().includes("question"));
                              const dataRows = hasHeader ? rows.slice(1) : rows;
                              
                              const parsedQs = dataRows
                                .filter((r) => r.length >= 4) // Ensure enough columns
                                .map((r, i) => {
                                  // User format: ID, Subject, Topic, Q(En), Q(Hi), OptA(En), OptB(En), OptC(En), OptD(En), OptA(Hi), OptB(Hi), OptC(Hi), OptD(Hi), CorrectAns, Exp(En), Exp(Hi), ExamTags
                                  return {
                                    id: r[0] ? `${r[0].trim().replace(/\s+/g, '_')}_${Date.now()}_${i}` : `mock_csv_q_${Date.now()}_${i}`,
                                    subject: r[1] || mtSubject,
                                    topic: r[2] || "Mock Test Topic",
                                    questionEn: r[3] || "",
                                    questionHi: r[4] || "",
                                    optionsEn: [r[5], r[6], r[7], r[8]].filter(Boolean),
                                    optionsHi: [r[9], r[10], r[11], r[12]].filter(Boolean),
                                    correctAnswer: (r[13]?.toUpperCase().trim() || "A") as any,
                                    explanationEn: r[14] || "",
                                    explanationHi: r[15] || "",
                                    examTags: r[16] ? r[16].split(",").map(t => t.trim()) : [mtExam],
                                    likes: 0,
                                    dislikes: 0,
                                  };
                                }) as Question[];

                              if (parsedQs.length === 0)
                                return alert("Failed to parse any valid questions. Ensure your CSV has data.");

                              if (onAddMockTest) {
                                const newTest: MockTest = {
                                  id: `mock_${Date.now()}`,
                                  titleEn: mtTitleEn,
                                  titleHi: mtTitleHi || mtTitleEn,
                                  exam: mtExam,
                                  subject: mtSubject,
                                  duration: parsedQs.length, // 1 min per question
                                  totalQuestions: parsedQs.length,
                                  totalMarks: parsedQs.length * 2,
                                  questions: parsedQs,
                                  isPreviousYear: mtIsPYQ,
                                };
                                onAddMockTest(newTest);
                                setMtTitleEn("");
                                setMtTitleHi("");
                                setMtCsvRawText("");
                                setMtCsvFileName("");
                                setShowMtCsv(false);
                                alert(
                                  `Successfully imported ${parsedQs.length} questions from CSV to Mock Test!`,
                                );
                              }
                            } catch (err) {
                              alert(
                                "Error parsing CSV format. Please ensure all columns map correctly.",
                              );
                            }
                          }}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded transition-colors"
                        >
                          Confirm Bundle Import
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* List Block */}
              <div className="lg:col-span-2 space-y-3">
                {mockTests.map((test) => (
                  <div
                    key={test.id}
                    className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900/50 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                        {test.titleEn}
                        {test.isPreviousYear && (
                          <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[9px] px-1.5 py-0.5 rounded font-bold">
                            PYQ
                          </span>
                        )}
                      </h4>
                      <div className="text-xs text-slate-500 mt-1 flex gap-3">
                        <span>Q: {test.totalQuestions}</span>
                        <span>Marks: {test.totalMarks}</span>
                        <span>{test.duration}m</span>
                        <span>{test.exam}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (onDeleteMockTest) {
                          onDeleteMockTest(test.id);
                        }
                      }}
                      className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {mockTests.length === 0 && (
                  <div className="text-center py-8 text-slate-500 text-sm">
                    No mock tests created yet. Generate one to see it here!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Single Add Form */}
        {activeTab === "add" && (
          <form onSubmit={handleSingleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 font-sans">
                <label className="text-xs font-bold text-slate-550 block">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 text-xs rounded-xl text-slate-800 dark:text-white"
                >
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Polity">Polity</option>
                  <option value="Economics">Economics</option>
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Reasoning">Reasoning</option>
                  <option value="Computer">Computer GK</option>
                  <option value="Static GK">Static GK</option>
                  <option value="Hindi">General Hindi</option>
                  <option value="English">General English</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-550 block">
                  Topic / Class Subsection
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Fundamental Rights (मौलिक अधिकार)"
                  className="w-full border border-slate-200 dark:border-slate-700 p-2 text-xs rounded-xl bg-transparent text-slate-900 dark:text-white font-sans"
                  required
                />
              </div>
            </div>

            {/* Bilingual questions texts input fields */}
            <div className="space-y-3 font-sans">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-555">
                  Question (English)
                </label>
                <textarea
                  value={questionEn}
                  onChange={(e) => setQuestionEn(e.target.value)}
                  placeholder="Type official question text or copy from exam source"
                  className="w-full border border-slate-200 dark:border-slate-700 p-3 text-xs bg-transparent text-slate-800 dark:text-white rounded-xl font-sans"
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-555">
                  Question (Hindi Translation / अनुवाद)
                </label>
                <textarea
                  value={questionHi}
                  onChange={(e) => setQuestionHi(e.target.value)}
                  placeholder="हिंदी भाषा में प्रश्न का सटीक अनुवाद टाइप करें"
                  className="w-full border border-slate-200 dark:border-slate-700 p-3 text-xs bg-transparent text-slate-800 dark:text-white rounded-xl font-sans"
                  rows={2}
                />
              </div>
            </div>

            {/* 4 Options Grid */}
            <div className="border-t border-slate-100 dark:border-slate-900 pt-4 space-y-4">
              <span className="text-xs font-extrabold text-slate-400 block uppercase font-sans">
                Option Assignments
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold block text-slate-400">
                    ENGLISH OPTIONS
                  </span>
                  <input
                    type="text"
                    value={optAEn}
                    onChange={(e) => setOptAEn(e.target.value)}
                    placeholder="Option A (English)"
                    className="w-full border border-slate-200 dark:border-slate-700 bg-transparent text-xs p-2.5 rounded-xl dark:text-white"
                    required
                  />
                  <input
                    type="text"
                    value={optBEn}
                    onChange={(e) => setOptBEn(e.target.value)}
                    placeholder="Option B (English)"
                    className="w-full border border-slate-200 dark:border-slate-700 bg-transparent text-xs p-2.5 rounded-xl dark:text-white"
                    required
                  />
                  <input
                    type="text"
                    value={optCEn}
                    onChange={(e) => setOptCEn(e.target.value)}
                    placeholder="Option C (English)"
                    className="w-full border border-slate-200 dark:border-slate-700 bg-transparent text-xs p-2.5 rounded-xl dark:text-white"
                    required
                  />
                  <input
                    type="text"
                    value={optDEn}
                    onChange={(e) => setOptDEn(e.target.value)}
                    placeholder="Option D (English)"
                    className="w-full border border-slate-200 dark:border-slate-700 bg-transparent text-xs p-2.5 rounded-xl dark:text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold block text-slate-400">
                    HINDI TRANSLATIONS (OPTIONAL)
                  </span>
                  <input
                    type="text"
                    value={optAHi}
                    onChange={(e) => setOptAHi(e.target.value)}
                    placeholder="Option A (हिंदी)"
                    className="w-full border border-slate-200 dark:border-slate-700 bg-transparent text-xs p-2.5 rounded-xl dark:text-white"
                  />
                  <input
                    type="text"
                    value={optBHi}
                    onChange={(e) => setOptBHi(e.target.value)}
                    placeholder="Option B (हिंदी)"
                    className="w-full border border-slate-200 dark:border-slate-700 bg-transparent text-xs p-2.5 rounded-xl dark:text-white"
                  />
                  <input
                    type="text"
                    value={optCHi}
                    onChange={(e) => setOptCHi(e.target.value)}
                    placeholder="Option C (हिंदी)"
                    className="w-full border border-slate-200 dark:border-slate-700 bg-transparent text-xs p-2.5 rounded-xl dark:text-white"
                  />
                  <input
                    type="text"
                    value={optDHi}
                    onChange={(e) => setOptDHi(e.target.value)}
                    placeholder="Option D (हिंदी)"
                    className="w-full border border-slate-200 dark:border-slate-700 bg-transparent text-xs p-2.5 rounded-xl dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-sans">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-550 block">
                  Correct Option
                </label>
                <select
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value as any)}
                  className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs rounded-xl dark:text-white font-sans"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-550 block">
                  Exam Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  value={examTagField}
                  onChange={(e) => setExamTagField(e.target.value)}
                  className="w-full border border-slate-200 dark:border-slate-700 p-2.5 text-xs rounded-xl bg-transparent dark:text-white font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-555">
                  Detailed Study Explanation (English)
                </label>
                <textarea
                  value={explanationEn}
                  onChange={(e) => setExplanationEn(e.target.value)}
                  placeholder="Provide structured reasoning of correct choice..."
                  className="w-full border border-slate-200 dark:border-slate-700 p-3 text-xs bg-transparent text-slate-805 dark:text-white rounded-xl"
                  rows={2}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-555">
                  Detailed Study Explanation (Hindi)
                </label>
                <textarea
                  value={explanationHi}
                  onChange={(e) => setExplanationHi(e.target.value)}
                  placeholder="हिंदी समाधान और स्मृति शॉर्टकट यहाँ टाइप करें..."
                  className="w-full border border-slate-200 dark:border-slate-700 p-3 text-xs bg-transparent text-slate-805 dark:text-white rounded-xl"
                  rows={2}
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
            >
              🚀 Publish Question Online
            </button>
          </form>
        )}

        {/* Bulk Upload panel - Visual CSV Column Mapper vs JSON Direct Import */}
        {activeTab === "bulk" && (
          <div className="space-y-6 font-sans animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 justify-between items-start sm:items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Upload className="h-4.5 w-4.5 text-indigo-500" />
                  <span>
                    {isHindi
                      ? "थोक प्रश्न अपलोड एवं मैपर"
                      : "Bilingual Bulk Ingestion"}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {isHindi
                    ? "CSV स्प्रेडशीट सिंक करें या संरचित JSON स्कीमा एरे सबमिट करें।"
                    : "Sync spreadsheets via automated column mapper or import direct structured raw JSON tables."}
                </p>
              </div>

              {/* Mode Toggle Pills */}
              <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setBulkUploadMode("csv")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                    bulkUploadMode === "csv"
                      ? "bg-white dark:bg-slate-800 text-indigo-650 dark:text-sky-305 shadow-sm"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>{isHindi ? "CSV कॉलम मैपर" : "CSV Column Mapper"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBulkUploadMode("json")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                    bulkUploadMode === "json"
                      ? "bg-white dark:bg-slate-800 text-indigo-650 dark:text-sky-305 shadow-sm"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <Database className="h-3.5 w-3.5" />
                  <span>{isHindi ? "JSON डायरेक्ट" : "JSON Direct Mode"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBulkUploadMode("history")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                    bulkUploadMode === "history"
                      ? "bg-white dark:bg-slate-800 text-indigo-650 dark:text-sky-305 shadow-sm"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <History className="h-3.5 w-3.5" />
                  <span>{isHindi ? "इतिहास" : "Upload History"}</span>
                </button>
              </div>
            </div>

            {bulkUploadMode !== "history" && (
              <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Globe className="h-5 w-5 text-indigo-500" />
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                      {isHindi
                        ? "लक्ष्य गंतव्य (TARGET DESTINATION):"
                        : "Target Destination:"}
                    </label>
                    <select
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm rounded-xl p-2.5 font-bold cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-80 shadow-sm"
                      value={csvTargetDest}
                      onChange={(e) =>
                        setCsvTargetDest(e.target.value as "general" | "live")
                      }
                    >
                      <option value="general">
                        📚 General Question Bank (Manage Tab)
                      </option>
                      <option value="live">
                        🏆 All India Live Test (Mega Test)
                      </option>
                    </select>
                  </div>
                </div>
                <div className="text-xs text-indigo-600 dark:text-sky-305 font-medium px-2 hidden sm:block max-w-[200px] text-right">
                  {csvTargetDest === "live"
                    ? isHindi
                      ? "प्रश्न सीधे लाइव टेस्ट में जुड़ेंगे।"
                      : "Questions will map directly into the Live Test."
                    : isHindi
                      ? "प्रश्न सामान्य प्रश्न बैंक में जुड़ेंगे।"
                      : "Questions will be added to the general bank."}
                </div>
              </div>
            )}

            {bulkUploadMode === "history" ? (
              <div className="space-y-4">
                <div className="p-3.5 bg-blue-50 dark:bg-slate-800/40 text-blue-800 dark:text-blue-300 text-xs rounded-xl border border-blue-200/40 font-sans">
                  {isHindi
                    ? "आपके द्वारा आयात किए गए सभी CSV और JSON अपलोड का इतिहास।"
                    : "History of all imported CSV/JSON uploads via this browser."}
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  <div className="max-h-[60vh] overflow-auto">
                    <table className="w-full text-[11px] text-left">
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 sticky top-0 text-xs uppercase z-10 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          <th className="px-4 py-3 font-bold">Date & Time</th>
                          <th className="px-4 py-3 font-bold">
                            Source / Filename
                          </th>
                          <th className="px-4 py-3 font-bold">
                            Questions Synced
                          </th>
                          <th className="px-4 py-3 font-bold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {(() => {
                          let historyData: any[] = [];
                          try {
                            historyData = JSON.parse(
                              localStorage.getItem(
                                "studyflash_upload_history",
                              ) || "[]",
                            );
                          } catch (e) {}

                          if (historyData.length === 0) {
                            return (
                              <tr>
                                <td
                                  colSpan={4}
                                  className="px-4 py-8 text-center text-slate-400"
                                >
                                  No import history found in this session.
                                </td>
                              </tr>
                            );
                          }

                          return historyData.map((item: any, i) => (
                            <tr
                              key={item.id || i}
                              className="hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                            >
                              <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                {item.date}
                              </td>
                              <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-200">
                                {item.filename}
                              </td>
                              <td className="px-4 py-3 text-emerald-600 font-bold">
                                +{item.count} Questions
                              </td>
                              <td className="px-4 py-3">
                                <button
                                  onClick={() =>
                                    handleDeleteHistoryItem(item.id)
                                  }
                                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
                                  title="Delete history entry"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ));
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : bulkUploadMode === "json" ? (
              <form onSubmit={handleBulkSubmit} className="space-y-4">
                <div className="p-3.5 bg-yellow-50 dark:bg-slate-800/40 text-yellow-805 dark:text-yellow-300 text-xs rounded-xl border border-yellow-200/40 font-sans">
                  Paste a valid JSON flat array mapping to Question schemas.
                  StudyFlash automatically handles indexing and bilinguality
                  mapping.
                </div>

                <textarea
                  value={bulkTextInput}
                  onChange={(e) => setBulkTextInput(e.target.value)}
                  placeholder={`[
  {
    "questionEn": "What is the capital of India?",
    "questionHi": "भारत की राजधानी क्या है?",
    "optionsEn": ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
    "optionsHi": ["नई दिल्ली", "मुंबई", "कोलकाता", "चेन्नई"],
    "correctAnswer": "A",
    "subject": "Geography",
    "topic": "Capital Cities",
    "examTags": ["SSC", "Railway"]
  }
]`}
                  className="w-full font-mono text-[10.5px] p-4 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  rows={8}
                  required
                />

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow transition cursor-pointer"
                >
                  Parse & Sync {questions.length} Active Items
                </button>
              </form>
            ) : (
              // CSV Visual column automated mapping interface
              <div className="space-y-6">
                {/* Dynamic Category & Subfolder Dropdown Panel */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[24px] p-5 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-sky-400">
                    <Sparkles className="h-5 w-5" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      {isHindi ? "श्रेणी और सबफ़ोल्डर रूटिंग" : "Category & Subfolder Routing"}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {isHindi
                      ? "चुनें कि आपके द्वारा अपलोड किए गए प्रश्न किस होमपेज कार्ड और सबफ़ोल्डर में जाने चाहिए। इससे आपको CSV में इन कॉलम्स को बनाने की आवश्यकता नहीं है!"
                      : "Choose which homepage card category and subfolder your uploaded questions belong to. This eliminates the need to create subject/topic/tags columns in your CSV!"}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Category Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        {isHindi ? "1. मुख्य श्रेणी (Select Card/Category):" : "1. Select Card/Category:"}
                      </label>
                      <select
                        value={selectedAdminCategory}
                        onChange={(e) => {
                          const catId = e.target.value;
                          setSelectedAdminCategory(catId);
                          const cat = ADMIN_CARD_CATEGORIES.find(c => c.id === catId);
                          if (cat && cat.subfolders.length > 0) {
                            setSelectedAdminSubfolder(cat.subfolders[0].id);
                          }
                        }}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold rounded-xl p-3 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer"
                      >
                        {ADMIN_CARD_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {isHindi ? cat.nameHi : cat.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Subfolder Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        {isHindi ? "2. सबफ़ोल्डर / विषय (Select Subfolder):" : "2. Select Subfolder / Topic:"}
                      </label>
                      <select
                        value={selectedAdminSubfolder}
                        onChange={(e) => setSelectedAdminSubfolder(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold rounded-xl p-3 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer"
                      >
                        {(() => {
                          const catObj = ADMIN_CARD_CATEGORIES.find(c => c.id === selectedAdminCategory);
                          const folders = catObj ? catObj.subfolders : [];
                          return folders.map((folder) => (
                            <option key={folder.id} value={folder.id}>
                              {isHindi ? folder.nameHi : folder.nameEn}
                            </option>
                          ));
                        })()}
                      </select>
                    </div>
                  </div>

                  {/* Override Toggle Checkbox */}
                  <div className="flex items-center gap-2.5 pt-1.5">
                    <input
                      id="forceDropdownCategories"
                      type="checkbox"
                      checked={forceDropdownCategories}
                      onChange={(e) => setForceDropdownCategories(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <label htmlFor="forceDropdownCategories" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                      {isHindi
                        ? "ड्रॉपडाउन चयन से CSV के Subject & Topic को ओवरराइड करें (सिफारिश की जाती है - अत्यंत आसान!)"
                        : "Override Subject & Topic using these dropdown selections (Recommended - easiest!)"}
                    </label>
                  </div>

                  {/* Simple template download suggestion */}
                  <div className="pt-3.5 flex flex-col sm:flex-row items-center gap-3 justify-between border-t border-slate-150 dark:border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">
                      {isHindi 
                        ? "सरल फॉर्मेट में केवल प्रश्न, ऑप्शन्स और उत्तर आवश्यक होते हैं।" 
                        : "Simple normal format requires only questions, options, and answer columns."}
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleDownloadSimpleCsvTemplate}
                        className="w-full sm:w-auto text-[10px] bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-400 border border-emerald-200/30 px-3.5 py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer font-bold shadow-sm"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        {isHindi ? "सिंपल CSV टेम्पलेट (सिफारिश)" : "Download Simple Normal CSV"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Drag Drop or Upload Selection card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* File Upload zone */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-500 block">
                        {isHindi
                          ? "CSV फ़ाइल चुनें या खींचें:"
                          : "Select or drag CSV file:"}
                      </label>
                      <button
                        type="button"
                        onClick={handleDownloadCsvTemplate}
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded transition flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="h-3 w-3" />
                        {isHindi
                          ? "टेम्पलेट डाउनलोड करें"
                          : "Download Predefined Template"}
                      </button>
                    </div>
                    <div className="p-5 border-2 border-dashed border-slate-200 dark:border-slate-805 rounded-2xl bg-slate-50/10 hover:bg-slate-50/30 dark:bg-slate-900/10 dark:hover:bg-slate-900/20 transition-all flex flex-col items-center justify-center text-center space-y-3 relative group">
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleCsvFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <div className="p-3 bg-indigo-50 dark:bg-slate-800 rounded-full text-indigo-600 dark:text-sky-305 group-hover:scale-100 transition">
                        <Upload className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
                          {csvFileName
                            ? `Loaded: ${csvFileName}`
                            : isHindi
                              ? "अपलोड करने के लिए क्लिक करें"
                              : "Click to upload"}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          {isHindi
                            ? "यहाँ फ़ाइल खींचें या ब्राउज़ करें (.csv स्वीकृत)"
                            : "Drag & drop csv here or click to browse files"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Copy-Paste RAW spreadsheet string option */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-500 block">
                        {isHindi
                          ? "या सीधे CSV टेक्स्ट कॉपी-पेस्ट करें:"
                          : "Or copy-paste raw CSV text:"}
                      </label>
                    </div>
                    <textarea
                      value={csvRawText}
                      onChange={(e) => {
                        setCsvRawText(e.target.value);
                        setCsvFileName("Pasted String Data.csv");
                      }}
                      placeholder="Question,Option A,Option B,Option C,Option D,Explanation,Answer&#10;What is 5x5?,20,25,30,35,5 times 5,B"
                      className="w-full font-mono text-[10px] p-3 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-indigo-500 min-h-[90px]"
                    />
                    <button
                      type="button"
                      onClick={() => processRawCsvText(csvRawText)}
                      disabled={!csvRawText.trim()}
                      className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg transition disabled:opacity-50"
                    >
                      {isHindi
                        ? "कॉलम पार्स करें (Parse Columns)"
                        : "Parse Copied CSV Columns"}
                    </button>
                  </div>
                </div>

                {csvParseError && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200/40 text-red-600 dark:text-red-400 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{csvParseError}</span>
                  </div>
                )}

                {/* VISUAL COLUMN SCHEMA MAPPER CONTROL PANEL */}
                {csvHeaders.length > 0 && (
                  <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-6 bg-slate-50/10 dark:bg-slate-900/10 animate-fade-in">
                    {/* Header line info and auto trigger */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-150 dark:border-slate-800">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-600 dark:text-sky-400 font-extrabold">
                          Step 1: Visual Schema Alignment
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">
                          {isHindi
                            ? "सिस्टम स्केमा को अपने CSV शीर्षलेखों से जोड़ें:"
                            : "Map question schema properties to CSV columns:"}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={() => autoMatchHeaders(csvHeaders)}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-slate-800 text-indigo-700 dark:text-sky-305 text-[10.5px] font-extrabold rounded-lg transition flex items-center gap-1 cursor-pointer"
                        title="Regex analyzes headers instantly"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>
                          {isHindi
                            ? "ऑटो-मैप डिटेक्ट करें"
                            : "Smart Auto-Detect"}
                        </span>
                      </button>
                    </div>

                    {/* Mapping Dropdowns Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* En Question */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block flex items-center gap-1">
                          <span>Question Text (EN)</span>
                          <span className="text-red-500 font-extrabold">*</span>
                        </label>
                        <select
                          value={csvFieldsMapping.questionEn}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              questionEn: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white font-medium"
                        >
                          <option value="">
                            --{" "}
                            {isHindi ? "चुनें / Option" : "Select CSV Column"}{" "}
                            --
                          </option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Hi Question */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
                          Question (Hindi)
                        </label>
                        <select
                          value={csvFieldsMapping.questionHi}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              questionHi: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white"
                        >
                          <option value="">
                            {isHindi
                              ? "-- उपलब्ध नहीं (unmapped) --"
                              : "-- None (use English) --"}
                          </option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Correct Option Answer */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block flex items-center gap-1">
                          <span>Correct Answer Key</span>
                          <span className="text-red-500 font-extrabold">*</span>
                        </label>
                        <select
                          value={csvFieldsMapping.correctAnswer}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              correctAnswer: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white font-medium"
                        >
                          <option value="">-- Select Answer Column --</option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Subject Name column */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
                          Subject Column
                        </label>
                        <select
                          value={csvFieldsMapping.subject}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              subject: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white"
                        >
                          <option value="">
                            {isHindi
                              ? "-- डिफ़ॉल्ट प्रविष्टि --"
                              : "-- Use fallback text value --"}
                          </option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* English Option A */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block flex items-center gap-1">
                          <span>Option A (English)</span>
                          <span className="text-red-500 font-extrabold">*</span>
                        </label>
                        <select
                          value={csvFieldsMapping.optionAEn}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              optionAEn: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white"
                        >
                          <option value="">-- Choose Option A En --</option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* English Option B */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block flex items-center gap-1">
                          <span>Option B (English)</span>
                          <span className="text-red-500 font-extrabold">*</span>
                        </label>
                        <select
                          value={csvFieldsMapping.optionBEn}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              optionBEn: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white"
                        >
                          <option value="">-- Choose Option B En --</option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* English Option C */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block flex items-center gap-1">
                          <span>Option C (English)</span>
                          <span className="text-red-500 font-extrabold">*</span>
                        </label>
                        <select
                          value={csvFieldsMapping.optionCEn}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              optionCEn: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white"
                        >
                          <option value="">-- Choose Option C En --</option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* English Option D */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block flex items-center gap-1">
                          <span>Option D (English)</span>
                          <span className="text-red-500 font-extrabold">*</span>
                        </label>
                        <select
                          value={csvFieldsMapping.optionDEn}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              optionDEn: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white"
                        >
                          <option value="">-- Choose Option D En --</option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Option A Hindi */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 block">
                          Option A (Hindi)
                        </label>
                        <select
                          value={csvFieldsMapping.optionAHi}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              optionAHi: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white text-slate-500"
                        >
                          <option value="">-- None (use En) --</option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Option B Hindi */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 block">
                          Option B (Hindi)
                        </label>
                        <select
                          value={csvFieldsMapping.optionBHi}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              optionBHi: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white text-slate-500"
                        >
                          <option value="">-- None (use En) --</option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Option C Hindi */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 block">
                          Option C (Hindi)
                        </label>
                        <select
                          value={csvFieldsMapping.optionCHi}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              optionCHi: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white text-slate-500"
                        >
                          <option value="">-- None (use En) --</option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Option D Hindi */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 block">
                          Option D (Hindi)
                        </label>
                        <select
                          value={csvFieldsMapping.optionDHi}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              optionDHi: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white text-slate-500"
                        >
                          <option value="">-- None (use En) --</option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Explanation English */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-605 dark:text-slate-400 block">
                          Explanation (EN)
                        </label>
                        <select
                          value={csvFieldsMapping.explanationEn}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              explanationEn: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white"
                        >
                          <option value="">
                            -- Generate notes fallback --
                          </option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Explanation Hindi */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-605 dark:text-slate-400 block">
                          Explanation (Hindi)
                        </label>
                        <select
                          value={csvFieldsMapping.explanationHi}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              explanationHi: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white"
                        >
                          <option value="">
                            -- None (use English fallback) --
                          </option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Topic name column */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-605 dark:text-slate-400 block">
                          Topic column
                        </label>
                        <select
                          value={csvFieldsMapping.topic}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              topic: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white"
                        >
                          <option value="">
                            -- Use static text fallback --
                          </option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Exam tags comma-separated */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-650 dark:text-slate-400 block">
                          Exam tags column
                        </label>
                        <select
                          value={csvFieldsMapping.examTags}
                          onChange={(e) =>
                            setCsvFieldsMapping({
                              ...csvFieldsMapping,
                              examTags: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white"
                        >
                          <option value="">
                            -- Use static text fallback --
                          </option>
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Step 2: Static Fallback Settings panel */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-2xl space-y-4">
                      <div className="flex items-center gap-1.5">
                        <Database className="h-4 w-4 text-indigo-500 shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-650 dark:text-sky-305 font-bold">
                            Step 2: Static fallback default values
                          </span>
                          <p className="text-[10.5px] text-slate-400">
                            Values used if a CSV column isn't mapped, or a row
                            contains empty cells.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">
                            Default Subject
                          </label>
                          <select
                            value={csvDefaultValues.subject}
                            onChange={(e) =>
                              setCsvDefaultValues({
                                ...csvDefaultValues,
                                subject: e.target.value,
                              })
                            }
                            className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-xl dark:text-white"
                          >
                            <option value="History">History</option>
                            <option value="Geography">Geography</option>
                            <option value="Polity">Polity</option>
                            <option value="Economics">Economics</option>
                            <option value="Science">Science</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Reasoning">Reasoning</option>
                            <option value="Computer">Computer GK</option>
                            <option value="Static GK">Static GK</option>
                            <option value="Hindi">General Hindi</option>
                            <option value="English">General English</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">
                            Default Topic name
                          </label>
                          <input
                            type="text"
                            value={csvDefaultValues.topic}
                            onChange={(e) =>
                              setCsvDefaultValues({
                                ...csvDefaultValues,
                                topic: e.target.value,
                              })
                            }
                            placeholder="e.g. Ancient Civilization"
                            className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-xl dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">
                            Default Exam tags (comma sep)
                          </label>
                          <input
                            type="text"
                            value={csvDefaultValues.examTags}
                            onChange={(e) =>
                              setCsvDefaultValues({
                                ...csvDefaultValues,
                                examTags: e.target.value,
                              })
                            }
                            className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-xl dark:text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Interactive Real-Time Data Preview */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                          <div>
                            <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-600 dark:text-sky-305 font-bold">
                              Step 3: Interactive Preview & integrity
                              verification
                            </span>
                            <p className="text-[10.5px] text-slate-400">
                              Verify schema results of first{" "}
                              {Math.min(3, csvRows.length)} rows before
                              publishing.
                            </p>
                          </div>
                        </div>

                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-500 font-mono">
                          {csvRows.length} total rows parsed
                        </span>
                      </div>

                      {csvMappedQuestions.length > 0 ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold text-slate-500">
                              {showAllCsvPreview
                                ? `Showing Page ${csvPreviewPage} of ${Math.ceil(csvMappedQuestions.length / 12)} (12 per page)`
                                : "Showing Top 3 Preview"}
                            </span>
                            {csvMappedQuestions.length > 3 && (
                              <button
                                type="button"
                                onClick={() => {
                                  setShowAllCsvPreview(!showAllCsvPreview);
                                  setCsvPreviewPage(1);
                                }}
                                className="text-[10px] text-indigo-600 dark:text-sky-400 font-bold hover:underline cursor-pointer"
                              >
                                {showAllCsvPreview
                                  ? isHindi
                                    ? "कम दिखाएं"
                                    : "Show Less"
                                  : isHindi
                                    ? "सभी दिखाएं (पेजिनेशन)"
                                    : "View All Mapped (Paginated)"}
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {(showAllCsvPreview
                              ? csvMappedQuestions.slice(
                                  (csvPreviewPage - 1) * 12,
                                  csvPreviewPage * 12,
                                )
                              : csvMappedQuestions.slice(0, 3)
                            ).map((q, rawIndex) => {
                              const isMissingReq = !mappingsEnComplete(q);
                              const actualIndex = showAllCsvPreview
                                ? (csvPreviewPage - 1) * 12 + rawIndex
                                : rawIndex;
                              return (
                                <div
                                  key={actualIndex}
                                  className={`p-4 border rounded-2xl bg-white dark:bg-slate-900/60 flex flex-col justify-between space-y-3 ${
                                    isMissingReq
                                      ? "border-amber-400/60 shadow-inner"
                                      : "border-slate-150 dark:border-slate-800"
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-1 mb-2">
                                      <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-sky-305">
                                        Row {actualIndex + 1}
                                      </span>
                                      {isMissingReq ? (
                                        <span className="text-[9px] bg-amber-50 text-amber-700 font-extrabold px-1.5 py-0.5 rounded-md animate-pulse">
                                          Missing Option!
                                        </span>
                                      ) : (
                                        <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded-md">
                                          Validated ✔
                                        </span>
                                      )}
                                    </div>

                                    <h5 className="text-xs font-bold text-slate-800 dark:text-white line-clamp-2">
                                      EN: {q.questionEn}
                                    </h5>
                                    {q.questionHi !== q.questionEn && (
                                      <p className="text-[10.5px] text-slate-400 italic line-clamp-1 mt-0.5">
                                        HI: {q.questionHi}
                                      </p>
                                    )}

                                    <div className="mt-3 space-y-1 font-mono text-[9px] text-slate-500">
                                      <div className="flex items-center gap-1.5">
                                        <span
                                          className={`w-3.5 h-3.5 rounded text-center leading-3.5 text-[8px] font-extrabold inline-block ${q.correctAnswer === "A" ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}
                                        >
                                          A
                                        </span>
                                        <span className="truncate max-w-[120px]">
                                          {q.optionsEn[0]}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        <span
                                          className={`w-3.5 h-3.5 rounded text-center leading-3.5 text-[8px] font-extrabold inline-block ${q.correctAnswer === "B" ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}
                                        >
                                          B
                                        </span>
                                        <span className="truncate max-w-[120px]">
                                          {q.optionsEn[1]}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        <span
                                          className={`w-3.5 h-3.5 rounded text-center leading-3.5 text-[8px] font-extrabold inline-block ${q.correctAnswer === "C" ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}
                                        >
                                          C
                                        </span>
                                        <span className="truncate max-w-[120px]">
                                          {q.optionsEn[2]}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        <span
                                          className={`w-3.5 h-3.5 rounded text-center leading-3.5 text-[8px] font-extrabold inline-block ${q.correctAnswer === "D" ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}
                                        >
                                          D
                                        </span>
                                        <span className="truncate max-w-[120px]">
                                          {q.optionsEn[3]}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[9px] text-slate-400 space-y-1">
                                    <div className="flex justify-between">
                                      <span>Subject:</span>
                                      <strong className="text-slate-600 dark:text-slate-300">
                                        {q.subject}
                                      </strong>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Topic:</span>
                                      <strong className="text-slate-600 dark:text-slate-400 truncate max-w-[100px]">
                                        {q.topic}
                                      </strong>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Key Letter:</span>
                                      <strong className="text-emerald-600 font-extrabold">
                                        {q.correctAnswer}
                                      </strong>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Pagination controls */}
                          {showAllCsvPreview &&
                            Math.ceil(csvMappedQuestions.length / 12) > 1 && (
                              <div className="flex items-center justify-between pt-3 pb-1">
                                <button
                                  onClick={() =>
                                    setCsvPreviewPage((p) => Math.max(1, p - 1))
                                  }
                                  disabled={csvPreviewPage === 1}
                                  className="px-3 py-1.5 text-[10px] font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-all"
                                >
                                  {isHindi ? "पिछला" : "Previous"}
                                </button>
                                <span className="text-[10px] font-bold text-slate-500">
                                  Page {csvPreviewPage} of{" "}
                                  {Math.ceil(csvMappedQuestions.length / 12)}
                                </span>
                                <button
                                  onClick={() =>
                                    setCsvPreviewPage((p) =>
                                      Math.min(
                                        Math.ceil(
                                          csvMappedQuestions.length / 12,
                                        ),
                                        p + 1,
                                      ),
                                    )
                                  }
                                  disabled={
                                    csvPreviewPage ===
                                    Math.ceil(csvMappedQuestions.length / 12)
                                  }
                                  className="px-3 py-1.5 text-[10px] font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-all"
                                >
                                  {isHindi ? "अगला" : "Next"}
                                </button>
                              </div>
                            )}
                        </div>
                      ) : (
                        <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                          <p className="text-xs text-slate-400">
                            {isHindi
                              ? "मैपिंग क्षेत्र में कम से कम 1 आवश्यक कॉलम चुनें"
                              : "Select at least 1 required mapping column above to render preview cards."}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Step 4: Import Commit Action */}
                    <div className="pt-4 border-t border-slate-150 dark:border-slate-800 flex flex-col items-start gap-4">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                        <div className="text-xs text-slate-500 font-medium">
                          {isHindi ? (
                            <span>
                              तैयार:{" "}
                              <strong className="text-emerald-600">
                                {csvMappedQuestions.length} प्रश्न
                              </strong>{" "}
                              सिस्टम में जोड़े जाने के लिए अनुकूलित हैं।
                            </span>
                          ) : (
                            <span>
                              Ready:{" "}
                              <strong className="text-indigo-600 dark:text-sky-305 font-bold">
                                {csvMappedQuestions.length} Questions
                              </strong>{" "}
                              successfully aligned with schema.
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={handleImportCsvMappedQuestions}
                          disabled={csvMappedQuestions.length === 0}
                          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-1.5"
                        >
                          <Check className="h-4 w-4" />
                          <span>
                            {isHindi
                              ? `इम्पोर्ट करें & डेटाबेस से सिंक करें (${csvMappedQuestions.length})`
                              : `Approve & Sync Live (${csvMappedQuestions.length})`}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* SEO & Settings panel */}
        {activeTab === "seo" && (
          <div className="space-y-8">
            {/* Change Admin Password */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold flex items-center gap-2 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 text-slate-800 dark:text-white">
                <Key className="h-4 w-4 text-amber-500" />
                {isHindi ? "एडमिन पासवर्ड बदलें" : "Change Admin Password"}
              </h3>
              
              <form onSubmit={handleChangePassword} className="max-w-md space-y-4">
                {passwordChangeStatus && (
                  <div className={`p-3 text-xs rounded-xl font-medium ${passwordChangeStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50' : 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50'}`}>
                    {passwordChangeStatus.msg}
                  </div>
                )}
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                    {isHindi ? "वर्तमान पासवर्ड" : "Current Password"}
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder={isHindi ? "वर्तमान पासवर्ड दर्ज करें..." : "Enter current password..."}
                    className="w-full text-xs p-2.5 border rounded-xl bg-transparent text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                    {isHindi ? "नया पासवर्ड" : "New Password"}
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={isHindi ? "नया पासवर्ड दर्ज करें..." : "Enter new password..."}
                    className="w-full text-xs p-2.5 border rounded-xl bg-transparent text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                    {isHindi ? "नए पासवर्ड की पुष्टि करें" : "Confirm New Password"}
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={isHindi ? "नया पासवर्ड फिर से दर्ज करें..." : "Re-type new password..."}
                    className="w-full text-xs p-2.5 border rounded-xl bg-transparent text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full mt-2 px-4 py-2.5 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
                >
                  {isHindi ? "पासवर्ड अपडेट करें" : "Update Password"}
                </button>
              </form>
            </div>

            {/* SEO Management panel */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold flex items-center gap-2 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 text-slate-800 dark:text-white">
                <Globe className="h-4 w-4 text-indigo-500" />
                Metatags Configuration & Search Engine Schema Visualizer
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">
                    Global Meta Title (70 characters max)
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full text-xs p-2.5 border rounded-xl bg-transparent text-slate-900 dark:text-white border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">
                    Globel Meta Description (160 characters max)
                  </label>
                  <textarea
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                    className="w-full text-xs p-2.5 border rounded-xl bg-transparent text-slate-900 dark:text-white border-slate-200 dark:border-slate-700"
                    rows={3}
                  />
                </div>

                <button
                  onClick={() =>
                    triggerToast(
                      "Dynamic meta-tags pushed to head DOM namespace! Core Web Vitals validated.",
                    )
                  }
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow cursor-pointer"
                >
                  Save SEO Meta Tags
                </button>
              </div>

              {/* Crawl Simulation Sitemap snippet */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-550 block mb-1">
                    Robots.txt Content
                  </label>
                  <textarea
                    value={robotsTxt}
                    onChange={(e) => setRobotsTxt(e.target.value)}
                    className="w-full font-mono text-[10px] p-2 bg-slate-50 dark:bg-slate-900 rounded-xl dark:text-white border-slate-200 dark:border-slate-800 border"
                    rows={4}
                  />
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                  <span className="text-[10px] font-bold text-indigo-600 block mb-2 font-mono">
                    AUTO-GENERATED SITE SPECS (JSON-LD)
                  </span>
                  <pre className="text-[9px] font-mono whitespace-pre-wrap text-slate-500 dark:text-slate-400">
                    {`{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "StudyFlash",
  "url": "https://studyflash.co",
  "description": "${seoDesc.slice(0, 80)}..."
}`}
                  </pre>
                </div>
              </div>
            </div>
            </div>
          </div>
        )}

        {/* Users list management panel */}
        {activeTab === "users" && (
          <div className="space-y-4 font-sans">
            <h3 className="text-xs font-bold text-slate-500 block uppercase">
              Candidate Registrations & Active Status Tracker
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-sans">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-900 text-slate-400 uppercase font-bold text-[10px]">
                    <th className="py-2.5 px-3">Student Candidate Name</th>
                    <th className="py-2.5 px-3">Email Address</th>
                    <th className="py-2.5 px-3">Current EXP Status</th>
                    <th className="py-2.5 px-3">Membership status</th>
                    <th className="py-2.5 px-3">Date Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
                  {dummyUsers.map((user, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-50 dark:hover:bg-slate-900/40"
                    >
                      <td className="py-3 px-3 font-semibold text-slate-800 dark:text-white">
                        {user.name}
                      </td>
                      <td className="py-3 px-3 text-slate-500">{user.email}</td>
                      <td className="py-3 px-3 font-mono font-bold text-blue-600 dark:text-sky-300">
                        {user.xp}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                            user.status.includes("Premium")
                              ? "bg-emerald-55/60 text-emerald-600 border border-emerald-200"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">
                        {user.dateJoined}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AdSense Placement Simulator */}
        {activeTab === "adsense" && (
          <div className="space-y-4 font-sans">
            <h3 className="text-sm font-bold block pb-2 border-b">
              Google AdSense Integration Center
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed leading-relaxed font-sans">
              Inject responsive native banners directly between MCQ cards. Check
              simulated placeholders inside lobby page lists to optimize
              monetization RPC.
            </p>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-[10px] space-y-2">
              <span className="text-amber-600 block font-bold">
                // Paste Google AdSense Script header Tag here:
              </span>
              <code className="block text-slate-500 whitespace-pre-wrap font-mono">
                {`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>`}
              </code>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-amber-950/20 border border-yellow-200/50 rounded-xl">
              <span className="text-xs font-bold text-amber-700 block">
                Ad Revenue Optimization Advice:
              </span>
              <p className="text-[11px] text-slate-650 dark:text-slate-400 mt-1">
                For mobile-first competitive frameworks, place 320x50 Ad anchors
                at the footer or interactive inline 300x250 boards between
                explanations to maintain 98+ Lighthouse scores.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Editing overlay Modal (Flicker-free popup) */}
      {editingQuestion && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans overflow-y-auto animate-fade-in"
          id="edit-mcq-modal"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-2xl shadow-2xl relative my-8 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setEditingQuestion(null)}
              className="absolute right-4 top-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
              <Edit className="h-5 w-5 text-indigo-550 dark:text-sky-400" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {isHindi ? "प्रश्न संशोधित करें" : "Edit MCQ Details"}
                </h3>
                <p className="text-[10px] text-slate-500">
                  ID: <code>{editingQuestion.id}</code>
                </p>
              </div>
            </div>

            <form onSubmit={saveEditedQuestion} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block uppercase">
                    Subject
                  </label>
                  <select
                    value={editingQuestion.subject}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        subject: e.target.value,
                      })
                    }
                    className="w-full border border-slate-200 dark:border-slate-705 p-2 text-xs rounded-xl bg-transparent dark:bg-slate-900 dark:text-white font-sans"
                  >
                    <option value="History">History</option>
                    <option value="Geography">Geography</option>
                    <option value="Polity">Polity</option>
                    <option value="Economics">Economics</option>
                    <option value="Science">Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Reasoning">Reasoning</option>
                    <option value="Computer">Computer GK</option>
                    <option value="Static GK">Static GK</option>
                    <option value="Hindi">General Hindi</option>
                    <option value="English">General English</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block uppercase">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={editingQuestion.topic}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        topic: e.target.value,
                      })
                    }
                    className="w-full border border-slate-200 dark:border-slate-705 p-2 text-xs rounded-xl bg-transparent dark:text-white font-sans"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block uppercase">
                    Question (English)
                  </label>
                  <textarea
                    value={editingQuestion.questionEn}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        questionEn: e.target.value,
                      })
                    }
                    className="w-full border border-slate-200 dark:border-slate-705 p-2.5 text-xs bg-transparent dark:text-white rounded-xl font-sans"
                    rows={2}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block uppercase">
                    Question (Hindi Translation)
                  </label>
                  <textarea
                    value={editingQuestion.questionHi || ""}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        questionHi: e.target.value,
                      })
                    }
                    className="w-full border border-slate-200 dark:border-slate-705 p-2.5 text-xs bg-transparent dark:text-white rounded-xl font-sans"
                    rows={2}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                <span className="text-[10.5px] font-extrabold text-slate-400 block mb-2 uppercase tracking-wide">
                  Options & Translations
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(["A", "B", "C", "D"] as const).map((letter, letterIdx) => (
                    <div
                      key={letter}
                      className="p-3 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-slate-150 dark:border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-indigo-650 dark:text-sky-400">
                          Option {letter}
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono">
                          Index {letterIdx}
                        </span>
                      </div>

                      <div className="space-y-1.5 font-sans">
                        <input
                          type="text"
                          placeholder={`Option ${letter} En`}
                          value={editingQuestion.optionsEn[letterIdx]}
                          onChange={(e) => {
                            const newOptions = [
                              ...editingQuestion.optionsEn,
                            ] as any;
                            newOptions[letterIdx] = e.target.value;
                            setEditingQuestion({
                              ...editingQuestion,
                              optionsEn: newOptions,
                            });
                          }}
                          className="w-full p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs rounded-lg dark:text-white"
                          required
                        />
                        <input
                          type="text"
                          placeholder={`Option ${letter} Hi`}
                          value={editingQuestion.optionsHi?.[letterIdx] || ""}
                          onChange={(e) => {
                            const newOptions = [
                              ...(editingQuestion.optionsHi ||
                                editingQuestion.optionsEn),
                            ] as any;
                            newOptions[letterIdx] = e.target.value;
                            setEditingQuestion({
                              ...editingQuestion,
                              optionsHi: newOptions,
                            });
                          }}
                          className="w-full p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs rounded-lg dark:text-white italic text-slate-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-sans">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block uppercase">
                    Correct Answer
                  </label>
                  <select
                    value={editingQuestion.correctAnswer}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        correctAnswer: e.target.value as any,
                      })
                    }
                    className="w-full border border-slate-200 dark:border-slate-755 p-2 bg-white dark:bg-slate-900 text-xs rounded-xl dark:text-white"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block uppercase">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={
                      editingQuestion.examTags
                        ? editingQuestion.examTags.join(", ")
                        : ""
                    }
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        examTags: e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      })
                    }
                    className="w-full border border-slate-200 dark:border-slate-755 p-2 bg-transparent text-xs rounded-xl dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block uppercase">
                    Explanation (English)
                  </label>
                  <textarea
                    value={editingQuestion.explanationEn || ""}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        explanationEn: e.target.value,
                      })
                    }
                    className="w-full border border-slate-200 dark:border-slate-705 p-2.5 text-xs bg-transparent dark:text-white rounded-xl font-sans"
                    rows={2}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block uppercase">
                    Explanation (Hindi)
                  </label>
                  <textarea
                    value={editingQuestion.explanationHi || ""}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        explanationHi: e.target.value,
                      })
                    }
                    className="w-full border border-slate-200 dark:border-slate-705 p-2.5 text-xs bg-transparent dark:text-white rounded-xl font-sans"
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-800 text-slate-655 dark:text-slate-400 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  {isHindi ? "रद्द करें" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 hover:scale-[1.01] bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1 shadow"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>{isHindi ? "परिवर्तन सहेजें" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Unified Question Import Modal */}
      <QuestionImportModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        isHindi={isHindi}
        onQuestionsImported={async (importedQs) => {
          try {
            const token = localStorage.getItem("studyflash_admin_token");
            const res = await fetch("/api/questions/bulk", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
              body: JSON.stringify({ questions: importedQs }),
            });

            if (!res.ok) {
              console.error("Failed to save imported questions to DB");
            }
          } catch (err) {
            console.error("Error saving bulk questions:", err);
          }
          
          const combined = [...importedQs, ...questions];
          const uniqueMap = new Map(combined.map(q => [q.id, q]));
          const updatedPool = Array.from(uniqueMap.values());
          onSetBulkQuestions(updatedPool);
          // show success message
          if (typeof window !== "undefined") {
            const toastElement = document.createElement("div");
            toastElement.className = "fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce text-xs font-semibold";
            toastElement.textContent = `Successfully imported ${importedQs.length} questions!`;
            document.body.appendChild(toastElement);
            setTimeout(() => {
              toastElement.remove();
            }, 3000);
          }
        }}
      />
    </div>
  );
}
