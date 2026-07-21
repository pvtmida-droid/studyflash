import { useState, useEffect, FormEvent, useMemo } from "react";
import {
  CheckCircle2,
  XCircle,
  BookMarked,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
  Copy,
  Plus,
  ArrowRight,
  Trash2,
  Clock,
} from "lucide-react";
import { Question, UserStats } from "../types";

interface QuestionPracticeViewProps {
  questions: Question[];
  isHindi: boolean;
  userStats: UserStats;
  onUpdateStats: (newStats: UserStats) => void;
  selectedFontSize: number;
  initialSubject?: string;
  initialSearchQuery?: string;
  autoStart?: boolean;
  onBack?: () => void;
  onDeleteQuestion?: (id: string) => void;
}

export default function QuestionPracticeView({
  questions,
  isHindi,
  userStats,
  onUpdateStats,
  selectedFontSize,
  initialSubject = "",
  initialSearchQuery = "",
  autoStart = false,
  onBack,
  onDeleteQuestion,
}: QuestionPracticeViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<
    "A" | "B" | "C" | "D" | null
  >(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState("translation");
  const [reportComment, setReportComment] = useState("");
  const [showToast, setShowToast] = useState<string | null>(null);
  const [likedQuestions, setLikedQuestions] = useState<
    Record<string, "like" | "dislike" | null>
  >({});
  const [sessionResults, setSessionResults] = useState<Record<string, boolean>>(
    {},
  );
  const [showPracticeSummary, setShowPracticeSummary] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedSubject, setSelectedSubject] = useState<string>(
    initialSubject || "All",
  );
  const [practiceQueue, setPracticeQueue] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState(50);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [hasStarted, setHasStarted] = useState(autoStart);
  const [displayLanguage, setDisplayLanguage] = useState<"en" | "hi">(isHindi ? "hi" : "en");

  useEffect(() => {
    setDisplayLanguage(isHindi ? "hi" : "en");
  }, [isHindi]);
  const [questionCountLimit, setQuestionCountLimit] = useState<number>(20);

  // Timer countdown
  useEffect(() => {
    if (!hasStarted || showPracticeSummary || practiceQueue.length === 0) return;

    let timer: NodeJS.Timeout;
    timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowPracticeSummary(true);
          return 0;
        }
        return prev - 1;
      });
      setTotalTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [showPracticeSummary, practiceQueue.length]);

  // Filter and shuffle questions (Max 50)
  useEffect(() => {
    // 1. Filter
    let matches = questions.filter((q) => {
      const normSubject = (s: string) => {
        const lower = (s || "").toLowerCase().trim();
        if (lower === "mathematics" || lower === "maths") return "maths";
        if (lower === "gkgs" || lower === "general knowledge" || lower === "gk/gs" || lower === "general knowledge (gk/gs)") return "gkgs";
        return lower;
      };

      const matchesSubject =
        selectedSubject === "All" || normSubject(q.subject) === normSubject(selectedSubject);
      const query = searchQuery.toLowerCase();
      
      // If searching for a central exam (doesn't have PYQ), don't match PYQ topics/tags
      const isSearchingForNonPYQExam = !query.includes("pyq") && 
        ["rrb", "ssc", "upsc", "police", "nda", "cds", "afcat", "railway", "ibps", "bank"].some(exam => query.includes(exam));

      const hasPYQTagOrTopic = 
        (q.id && q.id.toLowerCase().includes("pyq")) ||
        q.subject.toLowerCase().includes("pyq") ||
        q.topic.toLowerCase().includes("pyq") || 
        (q.examTags && q.examTags.some(tag => tag.toLowerCase().includes("pyq")));

      if (isSearchingForNonPYQExam && hasPYQTagOrTopic) {
        return false;
      }

      const queryTerms = query.split(/\s+/).filter(t => t.length > 0);
      
      const matchesSearch = queryTerms.length === 0 || queryTerms.every(term => 
        (q.id && q.id.toLowerCase().includes(term)) ||
        q.questionEn.toLowerCase().includes(term) ||
        q.questionHi.toLowerCase().includes(term) ||
        q.subject.toLowerCase().includes(term) ||
        q.topic.toLowerCase().includes(term) ||
        (q.examTags && q.examTags.some((tag) => tag.toLowerCase().includes(term)))
      );
      return matchesSubject && matchesSearch;
    });

    // Pick Random up to limit
    matches = matches
      .sort(() => 0.5 - Math.random())
      .slice(0, questionCountLimit);

    // 3. Shuffle Options for each question
    const letters = ["A", "B", "C", "D"] as const;
    const shuffledMatches = matches.map((q) => {
      const oldCorrectIndex = letters.indexOf(q.correctAnswer);
      const indices = [0, 1, 2, 3];
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      const newCorrectIndex = indices.indexOf(oldCorrectIndex);
      return {
        ...q,
        optionsEn: [
          q.optionsEn[indices[0]],
          q.optionsEn[indices[1]],
          q.optionsEn[indices[2]],
          q.optionsEn[indices[3]],
        ] as [string, string, string, string],
        optionsHi: [
          q.optionsHi[indices[0]],
          q.optionsHi[indices[1]],
          q.optionsHi[indices[2]],
          q.optionsHi[indices[3]],
        ] as [string, string, string, string],
        correctAnswer: letters[newCorrectIndex],
      };
    });

    setPracticeQueue(shuffledMatches);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    // Restart Session Tracking
    setTimeLeft(shuffledMatches.length * 40);
    setTotalTimeSpent(0);
    setSessionResults({});
    // Stop any speech synthesis active
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, [questions, selectedSubject, searchQuery, questionCountLimit]);

  useEffect(() => {
    if (initialSubject) {
      setSelectedSubject(initialSubject);
    }
  }, [initialSubject]);

  useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const dynamicSubjects = useMemo(
    () => [
      "All",
      ...Array.from(new Set(questions.map((q) => q.subject))).filter(
        (s) => s && s !== "All",
      ),
    ],
    [questions],
  );

  const activeQuestion = practiceQueue[currentIndex];

  // Sync state when active question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, [currentIndex]);

  if (!hasStarted) {
    return (
      <div className="max-w-md mx-auto mt-12 p-8 md:p-10 text-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] rounded-[40px] relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-400/20 dark:bg-indigo-600/20 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-rose-400/20 dark:bg-rose-600/20 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Central Icon */}
          <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-100 dark:border-slate-700 flex items-center justify-center text-5xl mb-8 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-500 animate-[spin_8s_linear_infinite] opacity-20 blur-md"></div>
            <span className="relative z-10 drop-shadow-sm">🎯</span>
          </div>
          
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-3 tracking-tight">
            {isHindi ? "क्या आप तैयार हैं?" : "Are You Ready?"}
          </h2>
          
          <p className="text-slate-500 dark:text-slate-400 text-base mb-10 leading-relaxed px-2">
            {isHindi 
              ? "भारत के सबसे कठिन MCQs का सामना करें और अपनी वास्तविक रैंक जानें।" 
              : "Face India's toughest MCQs and discover your real nationwide rank."}
          </p>
          
          <div className="w-full bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-700/50 mb-8">
            <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-3 text-left pl-2">
              {isHindi ? "प्रश्नों की संख्या चुनें" : "Select Target"}
            </label>
            <div className="relative">
              <select 
                className="w-full appearance-none p-4 pl-5 pr-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-bold text-base transition-all cursor-pointer shadow-sm"
                value={questionCountLimit}
                onChange={(e) => setQuestionCountLimit(Number(e.target.value))}
              >
                {[10, 20, 30, 40, 50].map((option) => (
                  <option key={option} value={option}>
                    {option} {isHindi ? "प्रश्न (सुपर फास्ट)" : "Questions (Fast)"}
                  </option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setHasStarted(true)}
            className="group w-full py-4 px-8 text-white font-bold uppercase tracking-widest bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm flex items-center justify-center gap-3 overflow-hidden relative active:scale-95"
          >
            <span className="relative z-10">{isHindi ? "चुनौती स्वीकार करें" : "Start Challenge"}</span>
            <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    );
  }

  if (!activeQuestion) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
        <p className="text-slate-600 dark:text-slate-400">
          No questions available. Add some in Admin Panel!
        </p>
      </div>
    );
  }

  // Handle option selection
  const handleSelectOption = (option: "A" | "B" | "C" | "D") => {
    if (isAnswerRevealed) return;
    setSelectedOption(option);
    setIsAnswerRevealed(true);

    // Track statistics
    const isCorrect = option === activeQuestion.correctAnswer;
    setSessionResults((prev) => ({ ...prev, [activeQuestion.id]: isCorrect }));

    const isFirstTime = !userStats.history.some(
      (h) => h.testId === "practice-" + activeQuestion.id,
    );

    if (isFirstTime) {
      const xpIncrement = isCorrect ? 25 : 5;
      const accuracyMultiplier = isCorrect ? 100 : 0;
      const newAttemptedCount = userStats.attempted + 1;
      const calculatedAccuracy = Math.round(
        (userStats.accuracy * userStats.attempted + accuracyMultiplier) /
          newAttemptedCount,
      );

      const practiceRecord = {
        testId: "practice-" + activeQuestion.id,
        testTitle: `Practice: ${isHindi ? activeQuestion.topic : activeQuestion.topic}`,
        date: new Date().toISOString().split("T")[0],
        score: isCorrect ? 1 : 0,
        totalMarks: 1,
        accuracy: isCorrect ? 100 : 0,
        timeSpent: "Rapid",
      };

      onUpdateStats({
        ...userStats,
        attempted: newAttemptedCount,
        accuracy: calculatedAccuracy,
        xp: userStats.xp + xpIncrement,
        level: Math.floor((userStats.xp + xpIncrement) / 500) + 1,
        history: [practiceRecord, ...userStats.history],
      });

      triggerToast(
        isCorrect
          ? "+25 XP Earned! Keep going."
          : "+5 XP (Incorrect but practice makes perfect)",
      );
    }
  };

  // Toast Helper
  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 3000);
  };

  // Bookmark Toggle
  const handleToggleBookmark = () => {
    const isBookmarked = userStats.bookmarks.includes(activeQuestion.id);
    let updatedBookmarks;
    if (isBookmarked) {
      updatedBookmarks = userStats.bookmarks.filter(
        (id) => id !== activeQuestion.id,
      );
      triggerToast(isHindi ? "बुकमार्क हटाया गया" : "Bookmark Removed");
    } else {
      updatedBookmarks = [...userStats.bookmarks, activeQuestion.id];
      triggerToast(
        isHindi ? "बुकमार्क सुरक्षित किया गया" : "Bookmarked Successfully",
      );
    }
    onUpdateStats({
      ...userStats,
      bookmarks: updatedBookmarks,
    });
  };

  // Likes / Dislikes
  const handleLike = (type: "like" | "dislike") => {
    const currentStatus = likedQuestions[activeQuestion.id];
    if (currentStatus === type) {
      setLikedQuestions({ ...likedQuestions, [activeQuestion.id]: null });
    } else {
      setLikedQuestions({ ...likedQuestions, [activeQuestion.id]: type });
      triggerToast(type === "like" ? "Upvoted question quality!" : "Downvoted");
    }
  };

  // Speech implementation
  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const textToSpeak = isHindi
        ? `${activeQuestion.questionHi}. विकल्प क: ${activeQuestion.optionsHi[0]}. विकल्प ख: ${activeQuestion.optionsHi[1]}. विकल्प ग: ${activeQuestion.optionsHi[2]}. विकल्प घ: ${activeQuestion.optionsHi[3]}`
        : `${activeQuestion.questionEn}. Option A: ${activeQuestion.optionsEn[0]}. Option B: ${activeQuestion.optionsEn[1]}. Option C: ${activeQuestion.optionsEn[2]}. Option D: ${activeQuestion.optionsEn[3]}`;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = isHindi ? "hi-IN" : "en-IN";

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      triggerToast("Voice synthesis not supported in this browser.");
    }
  };

  // Deep Link simulated copying
  const handleShare = () => {
    const deepLink = `${window.location.origin}/question/${activeQuestion.id}`;
    navigator.clipboard
      .writeText(deepLink)
      .then(() => {
        triggerToast(
          isHindi
            ? "शेयर लिंक क्लिपबोर्ड पर कॉपी की गई!"
            : "Bilingual direct link copied to clipboard!",
        );
      })
      .catch(() => {
        triggerToast("Failed to copy link.");
      });
  };

  // Submit mock error report
  const handleSendReport = (e: FormEvent) => {
    e.preventDefault();
    triggerToast(
      isHindi
        ? "त्रुटि रिपोर्ट भेजी गई! धन्यवाद।"
        : "Error reported. Content moderation team is reviewing!",
    );
    setShowReportModal(false);
    setReportComment("");
  };

  // Subjects lists

  if (showPracticeSummary) {
    const totalQuestions = practiceQueue.length;
    const attempted = Object.keys(sessionResults).length;
    const correct = Object.values(sessionResults).filter((v) => v).length;
    const incorrect = attempted - correct;
    const unattempted = totalQuestions - attempted;

    const formatTime = (secs: number) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${m}m ${s}s`;
    };

    return (
      <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          {isHindi ? "अभ्यास परिणाम (Dashboard)" : "Practice Summary Dashboard"}
        </h2>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8 text-center">
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <div className="text-3xl font-black text-slate-800 dark:text-white mb-2">
                {totalQuestions}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {isHindi ? "कुल प्रश्न" : "Total Questions"}
              </div>
            </div>
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 shadow-inner rounded-2xl">
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-2">
                {correct}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-500">
                {isHindi ? "सही" : "Correct"}
              </div>
            </div>
            <div className="p-6 bg-rose-50 dark:bg-rose-900/20 shadow-inner rounded-2xl">
              <div className="text-3xl font-black text-rose-600 dark:text-rose-400 mb-2">
                {incorrect}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-500">
                {isHindi ? "गलत" : "Incorrect"}
              </div>
            </div>
            <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl">
              <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mb-2">
                {unattempted}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500">
                {isHindi ? "छोड़ दिए" : "Unattempted"}
              </div>
            </div>
            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl md:col-span-1 col-span-2">
              <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-2">
                {formatTime(totalTimeSpent)}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-500">
                {isHindi ? "समयावधि" : "Time Spent"}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => onBack && onBack()}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition shadow-lg shadow-blue-600/20 flex items-center gap-2"
            >
              <span>
                {isHindi ? "डैशबोर्ड पर वापस जाएं" : "Return to Dashboard"}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toast Alert */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-semibold">{showToast}</span>
        </div>
      )}

      {/* Header filter widget */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span>📖</span>{" "}
              {isHindi ? "बहिभाषी एमसीक्यू बैंक" : "Bilingual Question Hub"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isHindi
                ? "सभी सरकारी परीक्षाओं (SSC, Railway, Police) के वास्तविक स्तर के प्रश्न"
                : "Pragmatic interactive items with expert micro-learning analytics"}
            </p>
          </div>
          <div className="flex w-full md:w-auto items-center gap-2">
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setCurrentIndex(0);
              }}
              className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold"
              title={isHindi ? "विषय चुनें" : "Select subject"}
            >
              {dynamicSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub === "All" && isHindi ? "सभी विषय (All)" : sub}
                </option>
              ))}
            </select>
            <select
              value={questionCountLimit}
              onChange={(e) => setQuestionCountLimit(Number(e.target.value))}
              className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold"
              title={
                isHindi ? "प्रश्नों की संख्या चुनें" : "Select question count"
              }
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
            <input
              type="text"
              placeholder={
                isHindi ? "प्रश्न, विषय या टैग खोजें..." : "Filter questions..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
            />
          </div>
        </div>
      </div>

      {practiceQueue.length === 0 ? (
        <div className="text-center bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500">
            {isHindi
              ? "कोई प्रश्न नहीं मिला!"
              : "No matches found. Try another subject filter."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Quick Stats sidebar & navigation */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                {isHindi ? "प्रगति" : "INDEX"}
              </span>
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-3xl font-extrabold text-blue-600 dark:text-sky-400">
                  {currentIndex + 1}
                </span>
                <span className="text-slate-400 text-sm">
                  / {practiceQueue.length}
                </span>
              </div>

              {/* Progress Slider bar */}
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-5">
                <div
                  className="h-full bg-blue-600 dark:bg-sky-400"
                  style={{
                    width: `${((currentIndex + 1) / practiceQueue.length) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Exam tags to target */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 block">
                  {isHindi ? "अभिप्रेत परीक्षा" : "Target Competitions"}
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeQuestion.examTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-sky-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {activeQuestion.year && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 uppercase">
                      {activeQuestion.year}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl space-y-2 text-sm font-semibold">
              <button
                onClick={handleToggleBookmark}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <span className="flex items-center gap-2">
                  {userStats.bookmarks.includes(activeQuestion.id) ? (
                    <BookMarked className="h-4.5 w-4.5 text-amber-500 fill-amber-500" />
                  ) : (
                    <Bookmark className="h-4.5 w-4.5" />
                  )}
                  {isHindi ? "बुकमार्क प्रश्न" : "Bookmark Question"}
                </span>
              </button>

              <button
                onClick={handleSpeak}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <span className="flex items-center gap-2-5">
                  {isSpeaking ? (
                    <VolumeX className="h-4.5 w-4.5 text-red-500 animate-pulse" />
                  ) : (
                    <Volume2 className="h-4.5 w-4.5 text-emerald-500" />
                  )}
                  {isSpeaking
                    ? isHindi
                      ? "बोलना बंद करें"
                      : "Stop Voice"
                    : isHindi
                      ? "प्रश्न को सुनें"
                      : "Voice Read Qs"}
                </span>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">
                  TTS
                </span>
              </button>

              <button
                onClick={handleShare}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <span className="flex items-center gap-2">
                  <Share2 className="h-4.5 w-4.5 text-sky-500" />
                  {isHindi ? "शेयर और भेजें" : "Unify Share Link"}
                </span>
              </button>

              <button
                onClick={() => setShowReportModal(true)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
              >
                <span className="flex items-center gap-2">
                  <AlertTriangle className="h-4.5 w-4.5" />
                  {isHindi ? "त्रुटि रिपोर्ट करें" : "Report Mistake"}
                </span>
              </button>

              {onDeleteQuestion && (
                <button
                  onClick={() => {
                    if (confirmDeleteId !== activeQuestion.id) {
                      setConfirmDeleteId(activeQuestion.id);
                      setTimeout(
                        () =>
                          setConfirmDeleteId((curr) =>
                            curr === activeQuestion.id ? null : curr,
                          ),
                        3000,
                      );
                      return;
                    }
                    onDeleteQuestion(activeQuestion.id);
                    // Filter out of current queue to keep practicing
                    const newQueue = practiceQueue.filter(
                      (q) => q.id !== activeQuestion.id,
                    );
                    setPracticeQueue(newQueue);
                    if (
                      currentIndex >= newQueue.length &&
                      newQueue.length > 0
                    ) {
                      setCurrentIndex(newQueue.length - 1);
                    }
                    triggerToast(
                      isHindi ? "प्रश्न हटा दिया गया" : "Question deleted",
                    );
                    setConfirmDeleteId(null);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold transition-all ${
                    confirmDeleteId === activeQuestion.id
                      ? "bg-rose-500 text-white hover:bg-rose-600 shadow-md shadow-rose-500/20"
                      : "hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-600"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Trash2 className="h-4.5 w-4.5" />
                    {confirmDeleteId === activeQuestion.id
                      ? isHindi
                        ? "पुष्टि करें?"
                        : "Are you sure?"
                      : isHindi
                        ? "प्रश्न हटाएं"
                        : "Delete Question"}
                  </span>
                </button>
              )}
            </div>

            {/* Native Ad Placement Simulation */}
            <div className="bg-gradient-to-br from-indigo-100 via-indigo-50 to-pink-100 dark:from-slate-800/80 dark:to-slate-800 border border-indigo-200/40 dark:border-slate-700 p-4 rounded-3xl text-center shadow-inner relative overflow-hidden">
              <span className="absolute top-1 right-2 text-[9px] font-bold text-indigo-500 uppercase tracking-widest opacity-80">
                PROMO
              </span>
              <p className="text-xs font-bold text-indigo-900 dark:text-white">
                {isHindi ? "बिना प्रचार पीडीएफ मॉक" : "Full Offline Prep Kit"}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">
                {isHindi
                  ? "₹९९ में पूरे ५००+ मॉडल पेपर्स"
                  : "Get 12-Month Access for ₹199"}
              </p>
              <button
                onClick={() =>
                  triggerToast(
                    "Launching payment window... Simulated payment details setup initiated.",
                  )
                }
                className="mt-3.5 w-full bg-blue-600 text-white rounded-lg py-1.5 text-xs font-bold shadow hover:bg-blue-700"
              >
                {isHindi ? "अभी सब्सक्राइब करें" : "Upgrade Premium"}
              </button>
            </div>
          </div>

          {/* Main Question Display Column */}
          <div className="md:col-span-3 space-y-4">
            {/* Question Details container */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm transition-all duration-300">
              <div className="flex flex-wrap gap-2 justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {isHindi ? activeQuestion.subject : activeQuestion.subject}
                </span>

                {/* Language Preference Selector */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-full text-[10px] font-bold border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setDisplayLanguage("en")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      displayLanguage === "en"
                        ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-sky-400 shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setDisplayLanguage("hi")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      displayLanguage === "hi"
                        ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-sky-400 shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
                    }`}
                  >
                    हिंदी
                  </button>
                </div>

                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono transition-colors shadow-sm ${
                    timeLeft <= 30
                      ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 animate-pulse"
                      : "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  <span>
                    {Math.floor(timeLeft / 60)
                      .toString()
                      .padStart(2, "0")}
                    :{(timeLeft % 60).toString().padStart(2, "0")}
                  </span>
                </div>

                <span className="text-xs font-mono text-slate-400">
                  Topic: {activeQuestion.topic}
                </span>
              </div>

              {/* Dynamic Adjustable size rendered content */}
              <div
                className="text-slate-800 dark:text-slate-100 leading-relaxed font-sans mb-6"
                style={{ fontSize: `${selectedFontSize}px` }}
              >
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl mb-4 border border-slate-100 dark:border-slate-800">
                  {displayLanguage === "en" || !activeQuestion.questionHi ? (
                    <p className="font-semibold">{activeQuestion.questionEn}</p>
                  ) : (
                    <p className="text-slate-700 dark:text-slate-200 font-semibold">
                      {activeQuestion.questionHi}
                    </p>
                  )}
                </div>
              </div>

              {/* Multiple Choice Options Grid */}
              <div className="space-y-3">
                {["A", "B", "C", "D"].map((optId, idx) => {
                  const optionLabelEn = activeQuestion.optionsEn[idx];
                  const optionLabelHi = activeQuestion.optionsHi[idx];
                  const isCorrect = optId === activeQuestion.correctAnswer;
                  const isSelected = selectedOption === optId;

                  let optionStyle =
                    "border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200";
                  if (isAnswerRevealed) {
                    if (isCorrect) {
                      optionStyle =
                        "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300";
                    } else if (isSelected) {
                      optionStyle =
                        "border-rose-500 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300";
                    } else {
                      optionStyle =
                        "border-slate-100 opacity-60 text-slate-400";
                    }
                  } else if (isSelected) {
                    optionStyle = "border-blue-600 scale-[1.01] bg-blue-50/50";
                  }

                  return (
                    <button
                      key={optId}
                      onClick={() =>
                        handleSelectOption(optId as "A" | "B" | "C" | "D")
                      }
                      className={`w-full text-left p-4 rounded-2xl border flex items-center justify-between gap-3 text-sm font-semibold transition-all duration-200 ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold border transition ${
                            isCorrect && isAnswerRevealed
                              ? "bg-emerald-500 text-white border-transparent"
                              : isSelected && isAnswerRevealed
                                ? "bg-rose-500 text-white border-transparent"
                                : isSelected
                                  ? "bg-blue-600 text-white border-transparent"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                          }`}
                        >
                          {optId}
                        </span>
                        <div>
                          {displayLanguage === "en" || !optionLabelHi ? (
                            <span>{optionLabelEn}</span>
                          ) : (
                            <span>{optionLabelHi}</span>
                          )}
                        </div>
                      </div>

                      {/* Right Indicator Icon */}
                      {isAnswerRevealed && (
                        <div>
                          {isCorrect && (
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                          )}
                          {isSelected && !isCorrect && (
                            <XCircle className="h-5 w-5 text-rose-500 shrink-0" />
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Post Answer Reveal Option */}
              {isAnswerRevealed && (
                <div className="mt-6 p-5 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fade-in">
                  {/* Basic Explanation */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
                      {isHindi
                        ? "उत्तर कुंजी एवं विस्तृत स्पष्टीकरण"
                        : "EXPLANATION & ANALYSIS"}
                    </span>
                    {displayLanguage === "en" || !activeQuestion.explanationHi ? (
                      activeQuestion.explanationEn && (
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                          {activeQuestion.explanationEn}
                        </p>
                      )
                    ) : (
                      activeQuestion.explanationHi && (
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                          {activeQuestion.explanationHi}
                        </p>
                      )
                    )}
                  </div>

                  {/* Feedback on question */}
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                    <span className="text-[10px] uppercase font-mono text-slate-400">
                      Rate question premium scale:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLike("like")}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-xs font-semibold ${
                          likedQuestions[activeQuestion.id] === "like"
                            ? "bg-emerald-50 dark:bg-emerald-900 border-emerald-500 text-emerald-600 dark:text-emerald-300"
                            : "bg-transparent text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>
                          {activeQuestion.likes +
                            (likedQuestions[activeQuestion.id] === "like"
                              ? 1
                              : 0)}
                        </span>
                      </button>
                      <button
                        onClick={() => handleLike("dislike")}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-xs font-semibold ${
                          likedQuestions[activeQuestion.id] === "dislike"
                            ? "bg-rose-50 dark:bg-rose-900 border-rose-500 text-rose-600 dark:text-rose-300"
                            : "bg-transparent text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        <ThumbsDown className="h-3.5 w-3.5" />
                        <span>
                          {activeQuestion.dislikes +
                            (likedQuestions[activeQuestion.id] === "dislike"
                              ? 1
                              : 0)}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Next/Previous Control bar */}
            <div className="flex justify-between items-center gap-4">
              <button
                id="prev-question-btn"
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 select-none shadow-sm transition hover:bg-slate-50"
              >
                <ChevronLeft className="h-4.5 w-4.5" />
                <span>{isHindi ? "पिछला प्रश्न" : "Previous"}</span>
              </button>

              {currentIndex === practiceQueue.length - 1 ? (
                <button
                  id="finish-practice-btn"
                  onClick={() => setShowPracticeSummary(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-500/10 transition"
                >
                  <CheckCircle2 className="h-4.5 w-4.5" />
                  <span>
                    {isHindi ? "अभ्यास पूर्ण करें" : "Finish Practice"}
                  </span>
                </button>
              ) : (
                <button
                  id="next-question-btn"
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      Math.min(practiceQueue.length - 1, prev + 1),
                    )
                  }
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/10 transition"
                >
                  <span>{isHindi ? "अगला प्रश्न" : "Next Question"}</span>
                  <ChevronRight className="h-4.5 w-4.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Moderation/Report issue structure modal */}
      {showReportModal && (
        <div
          id="report-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                {isHindi
                  ? "त्रुटि / विसंगति की रिपोर्ट"
                  : "Report Error / Mistake"}
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSendReport} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">
                  {isHindi
                    ? "त्रुटि का प्रकार चुनें"
                    : "Select Discrepancy Type"}
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900"
                >
                  <option value="translation">
                    {isHindi
                      ? "अनुवाद में गड़बड़ी (HINDI/ENG Translation)"
                      : "Translation/Bilingual inaccuracy"}
                  </option>
                  <option value="answer">
                    {isHindi
                      ? "गलत उत्तर कुंजी (Wrong Answer Key)"
                      : "Wrong Correct Answer assigned"}
                  </option>
                  <option value="explanation">
                    {isHindi
                      ? "विवरण/स्पष्टीकरण में तथ्य त्रुटि"
                      : "Fact error in explanation explanation"}
                  </option>
                  <option value="format">
                    {isHindi
                      ? "गणितीय सूत्र / व्याकरण फॉर्मेट त्रुटि"
                      : "Formatting/Font render issue"}
                  </option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">
                  {isHindi
                    ? "त्रुटि का विवरण लिखें..."
                    : "Explain of detail (Optional)"}
                </label>
                <textarea
                  value={reportComment}
                  onChange={(e) => setReportComment(e.target.value)}
                  placeholder={
                    isHindi
                      ? "सही तथ्य / सुधार यहाँ प्रदान करें ताकि हमारी टीम तुरंत ठीक कर सके..."
                      : "Specify correct reference or typo to resolve fast."
                  }
                  className="w-full text-xs p-3.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-500"
                  rows={4}
                  required
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
                >
                  {isHindi ? "प्रस्तुत करें" : "Submit Discrepancy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
