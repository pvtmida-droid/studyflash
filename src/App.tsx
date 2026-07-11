import { useState, useEffect } from "react";
import {
  Flame,
  Search,
  Sparkles,
  BookOpen,
  Compass,
  Scale,
  TrendingUp,
  Atom,
  Calculator,
  Brain,
  Cpu,
  Award,
  Clock,
  CheckCircle,
  ChevronRight,
  Activity,
  Moon,
  Sun,
  AlertCircle,
  HelpCircle,
  Share2,
  Lock,
  Smartphone,
  CheckCircle2,
  Users,
} from "lucide-react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import QuestionPracticeView from "./components/QuestionPracticeView";
import QuizView from "./components/QuizView";
import DashboardView from "./components/DashboardView";
import BattleResultsView from "./components/BattleResultsView";
import HomeView from "./components/HomeView";
import AdminPanel from "./components/AdminPanel";
import NcertSelectionView from "./components/NcertSelectionView";
import ComputerSelectionView from "./components/ComputerSelectionView";
import CurrentAffairsSelectionView from "./components/CurrentAffairsSelectionView";
import CentralExamSelectionView from "./components/CentralExamSelectionView";
import PreviousYearSelectionView from "./components/PreviousYearSelectionView";
import GkgsSelectionView from "./components/GkgsSelectionView";
import ScienceSelectionView from "./components/ScienceSelectionView";
import MathsSelectionView from "./components/MathsSelectionView";
import ReasoningSelectionView from "./components/ReasoningSelectionView";
import HindiSelectionView from "./components/HindiSelectionView";
import EnglishSelectionView from "./components/EnglishSelectionView";
import StatePoliceSelectionView from "./components/StatePoliceSelectionView";

import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "./lib/firebase";

import {
  MOCK_QUESTIONS,
  POPULAR_MOCK_TESTS,
  MOCK_LEADERBOARD,
  MOCK_TESTIMONIALS,
  MOCK_FAQS,
  INITIAL_USER_STATS,
  EXAM_CATEGORIES,
  POPULAR_SUBJECTS,
} from "./mockData";

import { Question, MockTest, UserStats, LiveTestConfig } from "./types";

export default function App() {
  const [isHindi, setIsHindi] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentView, setCurrentView] = useState("home"); // home, questions, quizzes, dashboard, admin, etc.
  const [selectedFontSize, setSelectedFontSize] = useState(15);

  // Db lists states
  const [questions, setQuestions] = useState<Question[]>([]);
  const [mockTests, setMockTests] = useState<MockTest[]>([]);

  // Load mock tests and questions from server
  useEffect(() => {
    const fetchMockTests = async () => {
      try {
        const res = await fetch("/api/mocktests");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setMockTests(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch mock tests:", err);
      }
    };
    fetchMockTests();

    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/questions");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const uniqueQs = Array.from(new Map(data.map(q => [q.id, q])).values());
            setQuestions(uniqueQs);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      }
    };
    fetchQuestions();
  }, []);

  // Redirect / Auto-load question when coming from SEO Q&A pages
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qId = params.get("q");
    if (qId && questions.length > 0) {
      const found = questions.find(q => q.id === qId);
      if (found) {
        handleFilterQuestions(found.subject, found.id, true);
      } else {
        handleFilterQuestions("All", qId, true);
      }
    }
  }, [questions]);

  const handleAddMockTest = async (newTest: MockTest) => {
    try {
      const token = localStorage.getItem("studyflash_admin_token");
      const res = await fetch("/api/mocktests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify(newTest)
      });
      if (res.ok) {
        const saved = await res.json();
        setMockTests((prev) => [saved, ...prev]);
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(errData.error || "Failed to save mock test on server.");
      }
    } catch (err) {
      console.error("Failed to add mock test:", err);
      // Fallback state update
      setMockTests((prev) => [newTest, ...prev]);
    }
  };

  const handleDeleteMockTest = async (id: string) => {
    try {
      const token = localStorage.getItem("studyflash_admin_token");
      const res = await fetch(`/api/mocktests/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": token ? `Bearer ${token}` : ""
        }
      });
      if (res.ok) {
        setMockTests((prev) => prev.filter((t) => t.id !== id));
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(errData.error || "Failed to delete mock test on server.");
      }
    } catch (err) {
      console.error("Failed to delete mock test:", err);
      setMockTests((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const [liveTestConfig, setLiveTestConfig] = useState<LiveTestConfig>(() => {
    const cached = localStorage.getItem("studyflash_livetest_config");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (err) {}
    }
    return {
      resultDate: "2026-06-30T00:00:00",
      test: {
        id: "live_mega_test",
        titleEn: "All India Mega Test 2026",
        titleHi: "ऑल इंडिया मेगा टेस्ट 2026",
        subject: "All Subjects",
        exam: "Mega Battle",
        duration: 60,
        totalQuestions: 0,
        totalMarks: 0,
        questions: [],
        isPreviousYear: false,
      },
    };
  });

  const isAdmin = sessionStorage.getItem("admin_session") === "true";

  const handleUpdateLiveTestConfig = (newConfig: LiveTestConfig) => {
    setLiveTestConfig(newConfig);
    localStorage.setItem(
      "studyflash_livetest_config",
      JSON.stringify(newConfig),
    );
    // Provide to Db if needed
  };

  const [userStats, setUserStats] = useState<UserStats>(INITIAL_USER_STATS);

  // Auth session states
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Search input state
  const [searchQuery, setSearchQuery] = useState("");
  const [initialSubject, setInitialSubject] = useState("");
  const [initialSearchQuery, setInitialSearchQuery] = useState("");
  const [autoStartQuestions, setAutoStartQuestions] = useState(false);
  const [pyqTestId, setPyqTestId] = useState<string | null>(null);

  const [isSynced, setIsSynced] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Helper to filter and navigate to questions
  const handleFilterQuestions = (
    subjectName: string,
    queryText: string = "",
    autoStart: boolean = false
  ) => {
    setInitialSubject(subjectName);
    setInitialSearchQuery(queryText);
    setAutoStartQuestions(autoStart);
    setCurrentView("questions");
  };

  // Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Listen to Firebase Auth state on mount and restore stats
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      setIsAuthLoading(false);
      if (authUser) {
        try {
          const userRef = doc(db, "users", authUser.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data?.stats) {
              const alignedStats = {
                ...data.stats,
                level: 9,
                streak: 8,
              };
              setUserStats(alignedStats);
              localStorage.setItem(
                "studyflash_user_stats",
                JSON.stringify(alignedStats),
              );
            }
          } else {
            // Document does not exist, initialize with current userStats
            const initialStatsWithProfile = {
              ...userStats,
              level: 9,
              streak: 8,
              name: authUser.displayName || "Aspirant",
              email: authUser.email || "",
              photoUrl: authUser.photoURL || "",
            };
            setUserStats(initialStatsWithProfile);
            await setDoc(userRef, {
              uid: authUser.uid,
              email: authUser.email,
              displayName: authUser.displayName,
              photoURL: authUser.photoURL,
              stats: initialStatsWithProfile,
              createdAt: new Date().toISOString(),
            });
          }
        } catch (err) {
          console.error("Failed to load / restore stats from Firestore:", err);
        }

      }
    });
    return () => unsubscribe();
  }, []);

  const handleManualSync = async () => {
    // No-op: Central database is authoritative
  };

  // Manage Local Storage Cache to keep up offline requirements!
  useEffect(() => {
    const cachedStats = localStorage.getItem("studyflash_user_stats");
    if (cachedStats && !user) {
      // Only load from localstorage if not signed in, to let firestore be authoritative
      try {
        const parsed = JSON.parse(cachedStats);
        parsed.level = 9;
        parsed.streak = 8;
        setUserStats(parsed);
      } catch (err) {
        console.error("Local storage stats parse error:", err);
      }
    } else if (!user) {
      setUserStats({
        ...INITIAL_USER_STATS,
        level: 9,
        streak: 8,
      });
    }

  }, [user]);

  const handleUpdateStats = async (newStats: UserStats) => {
    setUserStats(newStats);
    localStorage.setItem("studyflash_user_stats", JSON.stringify(newStats));
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(
          userRef,
          {
            stats: newStats,
            updatedAt: new Date().toISOString(),
          },
          { merge: true },
        );
      } catch (err) {
        console.error("Firestore user stats save error:", err);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error("Google Sign-In Error:", err);
      alert(
        "Google Login Pop-up could not be initialized. Please check permission settings.",
      );
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserStats(INITIAL_USER_STATS);
    } catch (err) {
      console.error("Sign Out Error:", err);
    }
  };

  const handleAddQuestion = async (newQ: Question) => {
    setIsSyncing(true);
    try {
      const token = localStorage.getItem("studyflash_admin_token");
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(newQ)
      });
      if (res.ok) {
        setQuestions((prev) => [newQ, ...prev]);
      } else {
        console.error("POST Error:", await res.text());
      }
    } catch (err) {
      console.error("Failed to add question to DB:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDeleteQuestion = async (qId: string) => {
    setIsSyncing(true);
    try {
      const token = localStorage.getItem("studyflash_admin_token");
      const res = await fetch(`/api/questions/${qId}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      if (res.ok) {
        setQuestions((prev) => prev.filter((q) => q.id !== qId));
      } else {
        console.error("DELETE Error:", await res.text());
      }
    } catch (err) {
      console.error("Failed to delete question from DB:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUpdateQuestion = async (updatedQ: Question) => {
    setIsSyncing(true);
    try {
      const token = localStorage.getItem("studyflash_admin_token");
      const res = await fetch(`/api/questions/${updatedQ.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(updatedQ)
      });
      if (res.ok) {
        setQuestions((prev) => prev.map((q) => (q.id === updatedQ.id ? updatedQ : q)));
      } else {
        console.error("PUT Error:", await res.text());
      }
    } catch (err) {
      console.error("Failed to update question in DB:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSetBulkQuestions = async (allQs: Question[]) => {
    setIsSyncing(true);
    const uniqueQs = Array.from(new Map(allQs.map(q => [q.id, q])).values()) as Question[];
    try {
      const token = localStorage.getItem("studyflash_admin_token");
      const res = await fetch("/api/questions/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ questions: uniqueQs })
      });
      if (res.ok) {
        setQuestions(uniqueQs);
      } else {
        console.error("Bulk POST Error:", await res.text());
      }
    } catch (err) {
      console.error("Failed to bulk update questions to DB:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Switch dark theme class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Handle category cards selection
  const handleSelectCategory = (categoryId: string) => {
    setCurrentView("questions");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      {/* Header component */}
      <Header
        userStats={userStats}
        isHindi={isHindi}
        setIsHindi={setIsHindi}
        isDark={isDark}
        setIsDark={setIsDark}
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedFontSize={selectedFontSize}
        setSelectedFontSize={setSelectedFontSize}
        user={user}
        onGoogleSignIn={handleGoogleSignIn}
        onSignOut={handleSignOut}
        isSyncing={isSyncing}
        isSynced={isSynced}
        onSync={handleManualSync}
      />

      {/* Main Container wrap */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "home" && (
          <HomeView
            isHindi={isHindi}
            setCurrentView={setCurrentView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            userStats={userStats}
            liveTestConfig={liveTestConfig}
            isAdmin={isAdmin}
            onSearchSubmit={(query: string) => {
              handleFilterQuestions("All", query, false);
            }}
          />
        )}

        {/* Dynamic Nav views components mapping */}
        {currentView === "questions" && (
          <QuestionPracticeView
            questions={questions}
            isHindi={isHindi}
            userStats={userStats}
            onUpdateStats={handleUpdateStats}
            selectedFontSize={selectedFontSize}
            initialSubject={initialSubject}
            initialSearchQuery={initialSearchQuery}
            autoStart={autoStartQuestions}
            onBack={() => setCurrentView("home")}
          />
        )}

        {currentView === "quizzes" && (
          <QuizView
            mockTests={mockTests}
            isHindi={isHindi}
            userStats={userStats}
            onUpdateStats={handleUpdateStats}
            selectedFontSize={selectedFontSize}
            onBack={() => setCurrentView("home")}
          />
        )}

        {currentView === "pyq-quiz-auto" && pyqTestId && (
          <QuizView
            mockTests={mockTests}
            isHindi={isHindi}
            userStats={userStats}
            onUpdateStats={handleUpdateStats}
            selectedFontSize={selectedFontSize}
            autoStartTestId={pyqTestId}
            onBack={() => setCurrentView("previous-year-selection")}
          />
        )}

        {currentView === "live-test-auto" && (
          <QuizView
            mockTests={[liveTestConfig.test, ...mockTests]}
            isHindi={isHindi}
            userStats={userStats}
            onUpdateStats={handleUpdateStats}
            selectedFontSize={selectedFontSize}
            autoStartTestId={liveTestConfig.test.id}
            onBack={() => setCurrentView("home")}
          />
        )}

        {currentView === "dashboard" && (
          <DashboardView
            userStats={userStats}
            isHindi={isHindi}
            questions={questions}
            onUpdateStats={handleUpdateStats}
          />
        )}

        {currentView === "battle_results" && (
          <BattleResultsView
            isHindi={isHindi}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "admin" && (
          <AdminPanel
            questions={questions}
            isHindi={isHindi}
            onAddQuestion={handleAddQuestion}
            onSetBulkQuestions={handleSetBulkQuestions}
            onDeleteQuestion={handleDeleteQuestion}
            onUpdateQuestion={handleUpdateQuestion}
            liveTestConfig={liveTestConfig}
            onUpdateLiveTestConfig={handleUpdateLiveTestConfig}
            mockTests={mockTests}
            onAddMockTest={handleAddMockTest}
            onDeleteMockTest={handleDeleteMockTest}
          />
        )}

        {currentView === "ncert-selection" && (
          <NcertSelectionView
            isHindi={isHindi}
            onBack={() => setCurrentView("home")}
            onSelectNcertClass={(classNum, subject) => {
              handleFilterQuestions(subject || "All", `Class ${classNum}`, true);
            }}
          />
        )}

        {currentView === "computer-selection" && (
          <ComputerSelectionView
            isHindi={isHindi}
            onBack={() => setCurrentView("home")}
            onSelectCourse={(courseKey) => {
              if (courseKey === "GENERAL") {
                handleFilterQuestions("Computer", "", true);
              } else {
                handleFilterQuestions("Computer", courseKey, true);
              }
            }}
          />
        )}

        {currentView === "current-affairs-selection" && (
          <CurrentAffairsSelectionView
            isHindi={isHindi}
            onBack={() => setCurrentView("home")}
            onSelectPeriod={(periodLabel) => {
              handleFilterQuestions("Current Affairs", periodLabel, true);
            }}
          />
        )}

        {currentView === "central-exam-selection" && (
          <CentralExamSelectionView
            isHindi={isHindi}
            onBack={() => setCurrentView("home")}
            onSelectFolder={(categoryName, folderId) => {
              // Map folders beautifully to search query and subject logic
              handleFilterQuestions("All", folderId, true);
            }}
          />
        )}

        {currentView === "previous-year-selection" && (
          <PreviousYearSelectionView
            isHindi={isHindi}
            onBack={() => setCurrentView("home")}
            mockTests={mockTests}
            onStartMockTest={(test) => {
              setPyqTestId(test.id);
              setCurrentView("pyq-quiz-auto");
            }}
          />
        )}

        {currentView === "gkgs-selection" && (
          <GkgsSelectionView
            isHindi={isHindi}
            onBack={() => setCurrentView("home")}
            onSelectTopic={(subjectCode, topicFilter) => {
              handleFilterQuestions(subjectCode, topicFilter, false);
            }}
          />
        )}

        {currentView === "science-selection" && (
          <ScienceSelectionView
            isHindi={isHindi}
            onBack={() => setCurrentView("home")}
            onSelectTopic={(subjectCode, topicFilter) => {
              handleFilterQuestions(subjectCode, topicFilter, false);
            }}
          />
        )}

        {currentView === "maths-selection" && (
          <MathsSelectionView
            isHindi={isHindi}
            onBack={() => setCurrentView("home")}
            onSelectTopic={(subjectCode, topicFilter) => {
              handleFilterQuestions(subjectCode, topicFilter, false);
            }}
          />
        )}

        {currentView === "reasoning-selection" && (
          <ReasoningSelectionView
            isHindi={isHindi}
            onBack={() => setCurrentView("home")}
            onSelectTopic={(subjectCode, topicFilter) => {
              handleFilterQuestions(subjectCode, topicFilter, false);
            }}
          />
        )}

        {currentView === "hindi-selection" && (
          <HindiSelectionView
            isHindi={isHindi}
            onBack={() => setCurrentView("home")}
            onSelectTopic={(subjectCode, topicFilter) => {
              handleFilterQuestions(subjectCode, topicFilter, false);
            }}
          />
        )}

        {currentView === "english-selection" && (
          <EnglishSelectionView
            isHindi={isHindi}
            onBack={() => setCurrentView("home")}
            onSelectTopic={(subjectCode, topicFilter) => {
              handleFilterQuestions(subjectCode, topicFilter, false);
            }}
          />
        )}

        {currentView === "state-police-selection" && (
          <StatePoliceSelectionView
            isHindi={isHindi}
            onBack={() => setCurrentView("home")}
            onSelectState={(stateId) => {
              handleFilterQuestions("All", stateId, true);
            }}
          />
        )}
      </main>

      {/* Global integrated footer element */}
      <Footer
        isHindi={isHindi}
        setCurrentView={setCurrentView}
        currentView={currentView}
      />
    </div>
  );
}
