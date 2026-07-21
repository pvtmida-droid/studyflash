import { useState, useEffect } from "react";
import {
  Timer,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Award,
  Sparkles,
  RefreshCw,
  Bookmark,
  TrendingUp,
  Search,
  Clock,
  Activity,
  ShieldAlert,
  CheckCircle,
  TrendingDown,
  Info,
} from "lucide-react";
import { MockTest, Question, UserStats } from "../types";
import { db, collection, setDoc, doc } from "../lib/firebase";

interface QuizViewProps {
  mockTests: MockTest[];
  isHindi: boolean;
  userStats: UserStats;
  onUpdateStats: (newStats: UserStats) => void;
  selectedFontSize: number;
  autoStartTestId?: string;
  onBack?: () => void;
}

export default function QuizView({
  mockTests,
  isHindi,
  userStats,
  onUpdateStats,
  selectedFontSize,
  autoStartTestId,
  onBack,
}: QuizViewProps) {
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, "A" | "B" | "C" | "D" | null>
  >({});
  const [markedForReview, setMarkedForReview] = useState<
    Record<string, boolean>
  >({});
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [weakTopics, setWeakTopics] = useState<string[]>([]);
  const [predictedRank, setPredictedRank] = useState<number>(0);
  const [predictedScore, setPredictedScore] = useState<number>(0);
  const [displayLanguage, setDisplayLanguage] = useState<"en" | "hi">(isHindi ? "hi" : "en");

  useEffect(() => {
    setDisplayLanguage(isHindi ? "hi" : "en");
  }, [isHindi]);

  // Setup state
  const [selectedTestForSetup, setSelectedTestForSetup] = useState<MockTest | null>(null);
  const [studentName, setStudentName] = useState(() => localStorage.getItem("sf_studentName") || "");
  const [fatherName, setFatherName] = useState(() => localStorage.getItem("sf_fatherName") || "");
  const [phoneNumber, setPhoneNumber] = useState(() => localStorage.getItem("sf_phoneNumber") || "");
  const [rollNumber, setRollNumber] = useState(() => localStorage.getItem("sf_rollNumber") || "");

  // Stats helper variables
  const activeQuestion = activeTest?.questions[currentQuestionIndex];

  // Start selected Test (Go to Setup first if All India test)
  const handleStartTest = (test: MockTest) => {
    const isAllIndia = test.titleEn.toLowerCase().includes("all india");
    if (isAllIndia) {
      setSelectedTestForSetup(test);
    } else {
      setActiveTest(test);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setMarkedForReview({});
      setSecondsRemaining(test.questions.length * 60);
      setIsCompleted(false);
      setStartTime(Date.now());
    }
  };

  const confirmStartTest = () => {
    if (!studentName.trim() || !fatherName.trim() || !phoneNumber.trim()) {
      alert(isHindi ? "कृपया नाम, पिता का नाम और फोन नंबर दर्ज करें" : "Please enter your Name, Father's Name, and Phone Number");
      return;
    }
    
    let currentRoll = rollNumber;
    if (!currentRoll) {
      currentRoll = `SF${Math.floor(100000 + Math.random() * 900000)}`;
      setRollNumber(currentRoll);
    }
    
    localStorage.setItem("sf_studentName", studentName);
    localStorage.setItem("sf_fatherName", fatherName);
    localStorage.setItem("sf_phoneNumber", phoneNumber);
    localStorage.setItem("sf_rollNumber", currentRoll);

    setActiveTest(selectedTestForSetup);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setMarkedForReview({});
    // 60 seconds (1 minute) per question
    setSecondsRemaining(selectedTestForSetup!.questions.length * 60);
    setIsCompleted(false);
    setStartTime(Date.now());
    setSelectedTestForSetup(null);
  };

  useEffect(() => {
    if (autoStartTestId && !activeTest) {
      const test = mockTests.find((t) => t.id === autoStartTestId);
      if (test) {
        handleStartTest(test);
      }
    }
  }, [autoStartTestId, mockTests, activeTest]);

  // Timer Effect
  useEffect(() => {
    if (!activeTest || isCompleted || secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTest, isCompleted, secondsRemaining]);

  // Submit test
  const handleFinishTest = () => {
    if (!activeTest) return;
    setIsCompleted(true);

    // Calculate score & accuracy
    let correctCount = 0;
    let attemptedCount = 0;
    const errorsMap: Record<string, number> = {};

    activeTest.questions.forEach((q) => {
      const selected = answers[q.id];
      if (selected) {
        attemptedCount++;
        if (selected === q.correctAnswer) {
          correctCount++;
        } else {
          // Track weak topics
          errorsMap[q.topic] = (errorsMap[q.topic] || 0) + 1;
        }
      } else {
        // Unanswered also constitutes weak logic if they wanted to attempt
        errorsMap[q.topic] = (errorsMap[q.topic] || 0) + 0.5;
      }
    });

    // Score weight (Standard 2 Marks per correct in SSC, negative 0.5 for incorrect)
    const marksObtained = Math.max(
      0,
      correctCount * 2 - (attemptedCount - correctCount) * 0.5,
    );
    const finalAccuracy =
      attemptedCount > 0
        ? Math.round((correctCount / attemptedCount) * 100)
        : 0;

    // Detect weak topics (topics with higher error rates/blank submissions)
    const sortedWeak = Object.entries(errorsMap)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0])
      .slice(0, 3);
    setWeakTopics(sortedWeak);

    // Predict score & rank based on accuracy
    const percentCorrect =
      activeTest.questions.length > 0
        ? correctCount / activeTest.questions.length
        : 0;
    const predictedScale = Math.round(percentCorrect * activeTest.totalMarks);
    setPredictedScore(predictedScale);

    // Dynamic rank modeling
    const rankCalc = Math.round(
      150000 - percentCorrect * 149500 + Math.random() * 500,
    );
    setPredictedRank(Math.max(1, rankCalc));

    // Time taken string
    // Total available time is questions.length * 60 seconds
    const timeSpentSec = activeTest.questions.length * 60 - secondsRemaining;
    const minSpent = Math.floor(timeSpentSec / 60);
    const secSpent = timeSpentSec % 60;
    const timeStr = `${minSpent}m ${secSpent}s`;

    // Update user context stats
    const updatedHistoryItem = {
      testId: activeTest.id,
      testTitle: activeTest.titleEn,
      date: new Date().toISOString().split("T")[0],
      score: marksObtained,
      totalMarks: activeTest.totalMarks,
      accuracy: finalAccuracy,
      timeSpent: timeStr,
    };

    // Calculate overall statistics
    const newAttemptedCount = userStats.attempted + attemptedCount;
    // Weighted accuracy average
    const existingWeight = userStats.accuracy * userStats.attempted;
    const newWeight = finalAccuracy * attemptedCount;
    const calculatedAccuracy =
      newAttemptedCount > 0
        ? Math.round((existingWeight + newWeight) / newAttemptedCount)
        : userStats.accuracy;

    const streakBonus = 1; // simulation increment
    const earnedXp = Math.round(marksObtained * 10 + 50); // XP generation

    // Save to Firebase database for "All India Mega Test"
    if (activeTest.titleEn.toLowerCase().includes("all india")) {
      try {
        const submissionRef = doc(collection(db, "testResults"));
        setDoc(submissionRef, {
          id: submissionRef.id,
          testId: activeTest.id,
          testTitle: activeTest.titleEn,
          studentName,
          fatherName,
          phoneNumber,
          rollNumber,
          score: marksObtained,
          totalMarks: activeTest.totalMarks,
          accuracy: finalAccuracy,
          timeSpent: timeStr,
          predictedRank: rankCalc,
          predictedScore: predictedScale,
          timestamp: Date.now(),
        }).catch(console.error);
      } catch (err) {
        console.error("Error saving result", err);
      }
    }

    onUpdateStats({
      ...userStats,
      xp: userStats.xp + earnedXp,
      level: Math.floor((userStats.xp + earnedXp) / 500) + 1,
      attempted: newAttemptedCount,
      accuracy: calculatedAccuracy,
      streak: userStats.streak + (Math.random() > 0.85 ? streakBonus : 0),
      history: [updatedHistoryItem, ...userStats.history],
    });
  };

  // Convert seconds to readable clock string
  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (activeTest && isCompleted) {
    // Show Premium detailed analytics card
    let scoreMsg = "Outstanding! Exceptional grasp of this syllabus.";
    let scoreColor = "text-emerald-500";
    const correctCount = activeTest.questions.filter(
      (q) => answers[q.id] === q.correctAnswer,
    ).length;
    const totalCount = activeTest.questions.length;
    const accuracy =
      totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

    if (accuracy < 50) {
      scoreMsg =
        "Need focus. Dive into topic-wise revision and study explanations thoroughly.";
      scoreColor = "text-red-500";
    } else if (accuracy < 80) {
      scoreMsg =
        "Good effort, you are borderline. Standard revision triggers are crucial.";
      scoreColor = "text-amber-500";
    }

    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Candidate Details Card (Only for All India test) */}
        {activeTest.titleEn.toLowerCase().includes("all india") && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                {isHindi ? "उम्मीदवार का नाम" : "CANDIDATE NAME"}
              </span>
              <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                {studentName || "Anonymous User"}
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                {isHindi ? "पिता का नाम" : "FATHER'S NAME"}
              </span>
              <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                {fatherName || "N/A"}
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                {isHindi ? "रोल नंबर" : "ROLL NUMBER"}
              </span>
              <span className="text-sm font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                {rollNumber || "N/A"}
              </span>
            </div>
          </div>
        )}

        {/* Banner with predicted Rank/Score */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 p-8 rounded-3xl text-white relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest block w-fit mb-3">
                {isHindi
                  ? "मॉक सबमिशन का परिणाम"
                  : "Official Performance Scorecard"}
              </span>
              <h2 className="text-2xl font-bold font-sans">
                {isHindi ? activeTest.titleHi : activeTest.titleEn}
              </h2>
              <p className="text-xs text-blue-150/80 mt-2 font-mono uppercase tracking-widest">
                {isHindi
                  ? "विस्तृत ऑल इंडिया रैंक विश्लेषण"
                  : "Detailed All-India Competitive Insights"}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-[10px] text-blue-200 uppercase font-mono block font-bold">
                  {isHindi ? "अनुमानित रैंक" : "Predicted AIR"}
                </span>
                <span className="text-2xl font-extrabold text-amber-300">
                  #{predictedRank.toLocaleString()}
                </span>
                <span className="text-[9px] text-slate-300 block mt-0.5">
                  {isHindi ? "३.५ लाख छात्रों में" : "Out of 3.8L aspirants"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-blue-200 uppercase font-mono block font-bold">
                  {isHindi ? "प्रत्याशित स्कोर" : "Estimated Score"}
                </span>
                <span className="text-2xl font-extrabold text-emerald-300">
                  {predictedScore}
                </span>
                <span className="text-[9px] text-slate-300 block mt-0.5">
                  / {activeTest.totalMarks} Marks
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Chart Scores */}
          <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-6">
            <h3 className="text-base font-extrabold">
              {isHindi ? "प्रदर्शन मेट्रिक्स" : "Performance Analytics"}
            </h3>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-150/40">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                  {isHindi ? "सही उत्तर" : "Correct / Acc"}
                </span>
                <span className="text-2xl font-extrabold text-emerald-600 block mt-1">
                  {correctCount}
                </span>
                <span className="text-[10px] text-slate-400">Questions</span>
              </div>
              <div className="bg-rose-50 dark:bg-rose-950/20 p-4 rounded-2xl border border-rose-150/40">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400 block">
                  {isHindi ? "गलत उत्तर" : "Incorrect"}
                </span>
                <span className="text-2xl font-extrabold text-rose-600 block mt-1">
                  {totalCount - correctCount}
                </span>
                <span className="text-[10px] text-slate-400">Questions</span>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-2xl border border-blue-150/40">
                <span className="text-xs font-bold text-blue-700 dark:text-sky-400 block">
                  {isHindi ? "कुल सटीकता" : "Accuracy"}
                </span>
                <span className="text-2xl font-extrabold text-blue-600 dark:text-sky-400 block mt-1">
                  {accuracy}%
                </span>
                <span className="text-[10px] text-slate-400">
                  Standard percentage
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {isHindi ? "अकादमिक प्रतिक्रिया" : "TUTOR FEEDBACK"}
              </span>
              <p className={`text-sm font-semibold ${scoreColor}`}>
                {scoreMsg}
              </p>
            </div>

            {/* Simulated weak topics analysis warning */}
            <div className="p-4 rounded-2xl border border-rose-100 dark:border-rose-950 bg-rose-50/40 dark:bg-rose-950/20 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400">
                <ShieldAlert className="h-4 w-4" />
                <span>
                  {isHindi
                    ? "कमजोर विषय चेतावनी (Weak Topic Detection)"
                    : "Weak Topic Alert Detected"}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {isHindi
                  ? "विश्लेषण के अनुसार, निम्नलिखित विषयों में सुधार की अत्यंत आवश्यकता है। संबंधित MCQ हल करने के लिए विस्तृत व्याख्याओं का अध्ययन करें।"
                  : "These core sub-sections are affecting your composite exam percentile. Revise them immediately:"}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {weakTopics.length > 0 ? (
                  weakTopics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 text-xs font-bold bg-rose-100 dark:bg-rose-900 border border-rose-200 dark:border-rose-900 rounded-lg text-rose-700 dark:text-rose-300"
                    >
                      ⚠️ {topic}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic">
                    No weak topics detected. Flawless accuracy!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick recommendations panel */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center space-y-4 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">
              {isHindi ? "अगला कदम" : "RECOMMENDED NEXT STEPS"}
            </span>

            <div className="space-y-3 pt-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-left">
                <span className="text-xs font-extrabold text-blue-600 dark:text-sky-400 block">
                  1. Study Memory Hacks
                </span>
                <span className="text-[11px] text-slate-500">
                  Read bilingually tailored formulas.
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-left">
                <span className="text-xs font-extrabold text-indigo-600 dark:text-sky-500 block">
                  2. Unlock Pro PDFs
                </span>
                <span className="text-[11px] text-slate-500">
                  Read 5,000+ Previous Year solved cards.
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (onBack) {
                  onBack();
                } else {
                  setActiveTest(null);
                }
              }}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-2xl text-xs shadow-md transition"
            >
              🚀 {isHindi ? "अन्य मॉक हल करें" : "Return to Mock Lobby"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active quiz test taker layout
  if (activeTest) {
    if (!activeQuestion) return null;

    const isMarked = markedForReview[activeQuestion.id] || false;
    const currentAnswer = answers[activeQuestion.id] || null;

    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
        {/* Live Status indicator */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl flex flex-wrap justify-between items-center gap-4 shadow-sm transition-colors duration-300">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider font-sans">
              {isHindi ? activeTest.titleHi : activeTest.titleEn}
            </h3>
            <span className="text-[11px] text-slate-500">
              {isHindi ? "चयनित परीक्षा मोड" : "Timed Competition Mode"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Clock Timer */}
            <div className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold">
              <Timer className="h-4 w-4 text-rose-600 animate-pulse" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            <button
              onClick={handleFinishTest}
              className="px-5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
            >
              {isHindi ? "परीक्षा समाप्त" : "Submit Test"}
            </button>
          </div>
        </div>

        {/* Live quiz grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Side Question Palette */}
          <div className="md:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl space-y-4 shadow-sm h-fit">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
              {isHindi ? "प्रश्न पैलेट / नैविगेशन" : "QUESTION PALETTE"}
            </span>

            <div className="grid grid-cols-4 gap-2">
              {activeTest.questions.map((q, idx) => {
                const isAnswered = answers[q.id] != null;
                const isReviewed = markedForReview[q.id];
                const isActive = idx === currentQuestionIndex;

                let btnStyle =
                  "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300";
                if (isActive) {
                  btnStyle = "bg-blue-600 text-white ring-2 ring-blue-500/10";
                } else if (isReviewed) {
                  btnStyle = "bg-amber-500 text-white";
                } else if (isAnswered) {
                  btnStyle = "bg-emerald-500 text-white";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition flex items-center justify-center ${btnStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-[10px] font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                <span>{isHindi ? "उत्तर दिया (Answered)" : "Attempted"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
                <span>
                  {isHindi
                    ? "पुनरीक्षण के लिए चिह्नित (Review)"
                    : "Marked for review"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 dark:bg-slate-800"></span>
                <span>
                  {isHindi ? "अउत्तरित (Not Attempted)" : "Not attempted"}
                </span>
              </div>
            </div>
          </div>

          {/* Active Question Panel */}
          <div className="md:col-span-3 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800 mb-5">
                <span className="text-xs font-bold text-slate-400">
                  {isHindi
                    ? `विषय: ${activeQuestion.subject}`
                    : `Section: ${activeQuestion.subject}`}
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

                <span className="text-xs font-bold text-blue-600 dark:text-sky-400 font-mono">
                  Q. {currentQuestionIndex + 1} / {activeTest.questions.length}
                </span>
              </div>

              {/* Adjustable Font text */}
              <div
                className="text-slate-800 dark:text-slate-100 leading-relaxed font-sans mb-6"
                style={{ fontSize: `${selectedFontSize}px` }}
              >
                <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl mb-4">
                  {displayLanguage === "en" || !activeQuestion.questionHi ? (
                    <p className="font-semibold">{activeQuestion.questionEn}</p>
                  ) : (
                    <p className="text-slate-700 dark:text-slate-300 font-semibold">
                      {activeQuestion.questionHi}
                    </p>
                  )}
                </div>
              </div>

              {/* Quiz Options selection (instant reveal disabled in exam mode) */}
              <div className="space-y-2.5">
                {["A", "B", "C", "D"].map((optId, idx) => {
                  const optionLabelEn = activeQuestion.optionsEn[idx];
                  const optionLabelHi = activeQuestion.optionsHi[idx];
                  const isSelected = currentAnswer === optId;

                  return (
                    <button
                      key={optId}
                      onClick={() =>
                        setAnswers({
                          ...answers,
                          [activeQuestion.id]: optId as "A" | "B" | "C" | "D",
                        })
                      }
                      className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold select-none transition ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/40 dark:bg-slate-800"
                          : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold border ${
                            isSelected
                              ? "bg-blue-600 text-white border-transparent"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
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
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Panel Action Controls: Mark, Clear, Skip, Next */}
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setMarkedForReview({
                      ...markedForReview,
                      [activeQuestion.id]: !isMarked,
                    })
                  }
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                    isMarked
                      ? "bg-amber-500 text-white border-transparent shadow"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {isHindi ? "रिव्यू के लिए मार्क करें" : "Mark for Review"}
                </button>

                <button
                  onClick={() =>
                    setAnswers({ ...answers, [activeQuestion.id]: null })
                  }
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50"
                >
                  {isHindi ? "विकल्प साफ़ करें" : "Clear Option"}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-45"
                >
                  {isHindi ? "पीछे" : "Back"}
                </button>

                <button
                  onClick={() => {
                    if (
                      currentQuestionIndex <
                      activeTest.questions.length - 1
                    ) {
                      setCurrentQuestionIndex((prev) => prev + 1);
                    } else {
                      handleFinishTest();
                    }
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow"
                >
                  {currentQuestionIndex === activeTest.questions.length - 1
                    ? isHindi
                      ? "प्रस्तुत करें (Submit)"
                      : "Submit Test"
                    : isHindi
                      ? "अगला / सहेजें"
                      : "Save & Next"}
                </button>
              </div>
            </div>

            <div className="p-4 bg-blue-50/50 dark:bg-slate-900/50 rounded-2xl flex gap-3 text-xs text-blue-700 dark:text-sky-300">
              <Info className="h-4.5 w-4.5 shrink-0" />
              <span>
                {isHindi
                  ? "समय सीमा समाप्त होने पर टेस्ट अपने-आप जमा हो जाएगा।"
                  : "Review questions by clicking them directly on the side question palette."}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Lobby view lists all popular mock packages
  if (!activeTest && selectedTestForSetup) {
    return (
      <div className="max-w-md mx-auto mt-10 p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-3xl animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
          {isHindi ? "उम्मीदवार विवरण" : "Candidate Details"}
        </h2>
        
        <div className="space-y-4 text-left mb-8">
          <div>
            <label className="text-sm font-bold text-slate-600 dark:text-slate-400 block mb-2">
              {isHindi ? "विद्यार्थी का नाम:" : "Student Name:"}
            </label>
            <input 
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder={isHindi ? "अपना नाम दर्ज करें" : "Enter your name"}
              className="w-full p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-slate-600 dark:text-slate-400 block mb-2">
              {isHindi ? "पिता का नाम:" : "Father's Name:"}
            </label>
            <input 
              type="text"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              placeholder={isHindi ? "पिता का नाम दर्ज करें" : "Enter father's name"}
              className="w-full p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-slate-600 dark:text-slate-400 block mb-2">
              {isHindi ? "फ़ोन नंबर:" : "Phone Number:"}
            </label>
            <input 
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={isHindi ? "अपना फ़ोन नंबर दर्ज करें" : "Enter phone number"}
              className="w-full p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => setSelectedTestForSetup(null)}
            className="w-1/3 py-4 text-slate-600 dark:text-slate-300 font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all text-lg"
          >
            {isHindi ? "रद्द करें" : "Cancel"}
          </button>
          <button 
            onClick={confirmStartTest}
            className="w-2/3 py-4 text-white font-bold bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all text-lg"
          >
            {isHindi ? "टेस्ट शुरू करें" : "Start Test"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Search and filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm transition-colors duration-300">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>📝</span>{" "}
            {isHindi
              ? "अखिल भारतीय मॉक टेस्ट एवं सॉल्व्ड पेपर्स"
              : "National Premium Test Lobby"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isHindi
              ? "वास्तिविक परीक्षा स्तर के प्रश्नपत्र, टाइमर तथा विस्तृत परिणाम कार्ड"
              : "Designed with detailed performance metrics and weak-point analysis prediction"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTests.map((test) => (
          <div
            key={test.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 transition duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start gap-2 mb-3">
                <span
                  className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase ${
                    test.isPreviousYear
                      ? "bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400"
                      : "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-sky-300"
                  }`}
                >
                  {test.isPreviousYear
                    ? isHindi
                      ? `${test.year} हल प्रश्नपत्र`
                      : `PYQ Solved - ${test.year}`
                    : isHindi
                      ? "नवीनतम मॉक"
                      : "Latest Mock Series"}
                </span>

                <span className="text-xs font-extrabold text-blue-600 dark:text-sky-400 uppercase tracking-widest">
                  {test.exam}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 line-clamp-1 leading-snug">
                {isHindi ? test.titleHi : test.titleEn}
              </h3>

              <div className="grid grid-cols-3 gap-2 py-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl text-center">
                  <span className="block text-[10px] font-mono font-medium">
                    {isHindi ? "समय" : "DURATION"}
                  </span>
                  <span className="text-slate-800 dark:text-slate-200">
                    {test.questions.length || test.totalQuestions}{" "}
                    {isHindi ? "मिनट" : "Mins"}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl text-center">
                  <span className="block text-[10px] font-mono font-medium">
                    {isHindi ? "कुल प्रश्न" : "QUESTIONS"}
                  </span>
                  <span className="text-slate-800 dark:text-slate-200">
                    {test.totalQuestions} Qs
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl text-center">
                  <span className="block text-[10px] font-mono font-medium">
                    {isHindi ? "कुल अंक" : "MARKS"}
                  </span>
                  <span className="text-slate-800 dark:text-slate-200">
                    {test.totalMarks} M
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between">
              <span className="text-[10px] text-emerald-600 font-extrabold">
                ✓ Free Access Activated
              </span>

              <button
                onClick={() => handleStartTest(test)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
              >
                {isHindi ? "अभ्यास शुरू करें" : "Attempt Practice"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
