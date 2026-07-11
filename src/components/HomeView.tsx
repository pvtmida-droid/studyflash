import { useState, useEffect } from "react";
import {
  Flame,
  Search,
  Sparkles,
  ChevronRight,
  Lock,
  CheckCircle2,
  Trophy,
  Calendar,
  Swords,
} from "lucide-react";
import { MOCK_LEADERBOARD, MOCK_TESTIMONIALS, MOCK_FAQS } from "../mockData";

const SEARCHABLE_SUGGESTIONS = [
  // Exams
  { nameEn: "SSC CGL", nameHi: "एसएससी CGL", type: "exam", category: "SSC", query: "SSC CGL", icon: "🏆" },
  { nameEn: "SSC CHSL", nameHi: "एसएससी CHSL", type: "exam", category: "SSC", query: "SSC CHSL", icon: "🏆" },
  { nameEn: "SSC GD", nameHi: "एसएससी GD", type: "exam", category: "SSC", query: "SSC GD", icon: "🏆" },
  { nameEn: "SSC MTS", nameHi: "एसएससी MTS", type: "exam", category: "SSC", query: "SSC MTS", icon: "🏆" },
  { nameEn: "RRB NTPC", nameHi: "आरआरबी NTPC 2025", type: "exam", category: "Railway", icon: "🚄" },
  { nameEn: "RRB Group D", nameHi: "आरआरबी ग्रुप डी", type: "exam", category: "Railway", icon: "🚄" },
  { nameEn: "RRB ALP", nameHi: "आरआरबी एएलपी", type: "exam", category: "Railway", icon: "🚄" },
  { nameEn: "UPSC Prelims", nameHi: "यूपीएससी प्रीलिम्स", type: "exam", category: "UPSC", icon: "🏛️" },
  { nameEn: "CDS NDA", nameHi: "सीडीएस / एनडीए", type: "exam", category: "UPSC", icon: "🛡️" },
  { nameEn: "UP Police", nameHi: "यूपी पुलिस कांस्टेबल", type: "exam", category: "Police", icon: "👮" },
  { nameEn: "Bihar Police", nameHi: "बिहार पुलिस", type: "exam", category: "Police", icon: "👮" },

  // Subjects
  { nameEn: "GK / General Studies", nameHi: "सामान्य ज्ञान / अध्ययन", type: "subject", category: "GKGS", icon: "📚" },
  { nameEn: "General Science", nameHi: "सामान्य विज्ञान", type: "subject", category: "Science", icon: "🧬" },
  { nameEn: "Mathematics", nameHi: "गणित", type: "subject", category: "Maths", icon: "📐" },
  { nameEn: "Reasoning", nameHi: "तार्किक क्षमता", type: "subject", category: "Reasoning", icon: "🧠" },
  { nameEn: "General Hindi", nameHi: "सामान्य हिन्दी", type: "subject", category: "Hindi", icon: "✍️" },
  { nameEn: "General English", nameHi: "सामान्य अंग्रेजी", type: "subject", category: "English", icon: "🔤" },
  { nameEn: "Computer Knowledge", nameHi: "कंप्यूटर ज्ञान", type: "subject", category: "Computer", icon: "💻" },
  { nameEn: "Current Affairs", nameHi: "करेंट अफेयर्स", type: "subject", category: "CurrentAffairs", icon: "📰" },
];

export default function HomeView({
  isHindi,
  setCurrentView,
  searchQuery,
  setSearchQuery,
  userStats,
  liveTestConfig,
  isAdmin,
  onSearchSubmit,
}: any) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [hasAttemptedBattle, setHasAttemptedBattle] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCountingDown, setIsCountingDown] = useState(false);

  useEffect(() => {
    const battleAttempted = localStorage.getItem("studyflash_battle_attempted");
    if (battleAttempted === "true") {
      setHasAttemptedBattle(true);
    }

    const calculateTimeLeft = () => {
      const difference =
        +new Date(liveTestConfig?.resultDate || "2026-06-30T00:00:00") -
        +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsCountingDown(true);
      } else {
        setIsCountingDown(false);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAttemptBattle = () => {
    if (new Date() < new Date("2026-06-25T00:00:00") && !isAdmin) {
      alert(
        isHindi
          ? "लाइव टेस्ट 25 जून 2026 को शुरू होगा"
          : "Live Test will start on 25th June 2026",
      );
      return;
    }

    if (liveTestConfig && liveTestConfig.test.questions.length > 0) {
      localStorage.setItem("studyflash_battle_attempted", "true");
      setHasAttemptedBattle(true);
      setCurrentView("live-test-auto");
    } else {
      alert(
        isHindi
          ? "लाइव टेस्ट अभी उपलब्ध नहीं है। कृपया व्यवस्थापक को प्रश्न जोड़ने दें।"
          : "Live Test is not available yet. Please add questions from Admin panel.",
      );
    }
  };

  return (
    <div className="space-y-24 md:space-y-32 animate-fade-in pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-24 pb-8 text-center max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          {isHindi
            ? "सरकारी नौकरी की तैयारी का नया युग"
            : "Master Your Exams with Intelligent Practice."}
        </h1>

        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {isHindi
            ? "एसएससी, रेलवे, यूपीएससी और पुलिस भर्ती के 5000+ प्रश्नों का सबसे आधुनिक और स्मार्ट अभ्यास प्लेटफॉर्म।"
            : "A premium, distraction-free environment for SSC, Railway, UPSC, and State Police aspirants. Practice smarter."}
        </p>

        <div className="max-w-2xl mx-auto relative mt-10">
          <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
          <div className="relative bg-white dark:bg-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] rounded-2xl p-2.5 md:p-3 flex items-center gap-3 border border-slate-200 dark:border-slate-800 transition-all duration-300 focus-within:border-emerald-500 dark:focus-within:border-emerald-500">
            <Search className="h-6 w-6 text-emerald-500 ml-3 shrink-0" />
            <input
              type="text"
              placeholder={
                isHindi
                  ? "किसी भी विषय या परीक्षा को खोजें..."
                  : "Search for any subject, topic, or exam..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                // small delay to let clicks register
                setTimeout(() => setIsFocused(false), 200);
              }}
              className="bg-transparent border-none focus:outline-none w-full text-base md:text-lg text-slate-900 dark:text-white placeholder-slate-400 font-medium"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (onSearchSubmit) onSearchSubmit(searchQuery);
                  else setCurrentView("questions");
                  setIsFocused(false);
                }
              }}
            />
            <button
              onClick={() => {
                if (onSearchSubmit) onSearchSubmit(searchQuery);
                else setCurrentView("questions");
                setIsFocused(false);
              }}
              className="px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-sm md:text-base rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95 duration-200 shrink-0"
            >
              {isHindi ? "शुरू करें" : "Start Learning"}
            </button>
          </div>

          {/* SUGGESTIONS DROPDOWN PANEL */}
          {isFocused && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in text-left max-h-96 overflow-y-auto">
              {searchQuery.trim() === "" ? (
                <div className="p-5">
                  <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                    🔥 {isHindi ? "लोकप्रिय खोजें" : "Popular Searches"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["SSC CGL", "Railway", "Bihar Police", "UP Police", "General Science", "Mathematics", "Reasoning"].map((tag) => (
                      <button
                        key={tag}
                        onMouseDown={() => {
                          setSearchQuery(tag);
                          setIsFocused(false);
                          if (onSearchSubmit) onSearchSubmit(tag);
                        }}
                        className="px-3.5 py-2 bg-slate-50 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors border border-slate-100 dark:border-slate-800/80"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  {/* Grouped suggestions */}
                  {(() => {
                    const q = searchQuery.toLowerCase().trim();
                    const exams = SEARCHABLE_SUGGESTIONS.filter(
                      (item) =>
                        item.type === "exam" &&
                        (item.nameEn.toLowerCase().includes(q) ||
                          item.nameHi.toLowerCase().includes(q) ||
                          item.query.toLowerCase().includes(q))
                    );
                    const subjects = SEARCHABLE_SUGGESTIONS.filter(
                      (item) =>
                        item.type === "subject" &&
                        (item.nameEn.toLowerCase().includes(q) ||
                          item.nameHi.toLowerCase().includes(q) ||
                          item.query.toLowerCase().includes(q))
                    );

                    if (exams.length === 0 && subjects.length === 0) {
                      return (
                        <div className="p-5 text-center text-slate-400 dark:text-slate-500 text-sm font-medium">
                          {isHindi ? "कोई सुझाव नहीं मिला।" : "No suggestions found."}{" "}
                          <span className="text-xs block mt-1 font-bold text-slate-300">
                            {isHindi ? "खोजने के लिए 'एंटर' दबाएं" : "Press Enter to search"}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <>
                        {exams.length > 0 && (
                          <div className="p-3 border-b border-slate-100 dark:border-slate-800/80">
                            <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 py-1">
                              🏆 {isHindi ? "लक्ष्य परीक्षाएं" : "Target Exams"}
                            </div>
                            <div className="space-y-1 mt-1">
                              {exams.map((item) => (
                                <button
                                  key={item.nameEn}
                                  onMouseDown={() => {
                                    setSearchQuery(item.nameEn);
                                    setIsFocused(false);
                                    if (onSearchSubmit) onSearchSubmit(item.nameEn);
                                  }}
                                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-left transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-lg">{item.icon}</span>
                                    <div>
                                      <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                        {isHindi ? item.nameHi : item.nameEn}
                                      </div>
                                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                                        {item.category}
                                      </div>
                                    </div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-400" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {subjects.length > 0 && (
                          <div className="p-3">
                            <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 py-1">
                              📚 {isHindi ? "महत्वपूर्ण विषय" : "Core Subjects"}
                            </div>
                            <div className="space-y-1 mt-1">
                              {subjects.map((item) => (
                                <button
                                  key={item.nameEn}
                                  onMouseDown={() => {
                                    setSearchQuery(item.nameEn);
                                    setIsFocused(false);
                                    if (onSearchSubmit) onSearchSubmit(item.nameEn);
                                  }}
                                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-left transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-lg">{item.icon}</span>
                                    <div>
                                      <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                        {isHindi ? item.nameHi : item.nameEn}
                                      </div>
                                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                                        {isHindi ? "अभ्यास सेट" : "Practice Set"}
                                      </div>
                                    </div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-400" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6 pt-8 md:pt-12">
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-700 dark:text-slate-200 text-sm md:text-base font-bold tracking-wide">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 50,000+ MCQs
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 1,000+ Mock
              Tests
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 500+ Current
              Affairs Sets
            </div>
          </div>
          <div className="text-xs md:text-sm font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase">
            SSC &bull; Railway &bull; Banking &bull; UPSC &bull; Bihar Exams
          </div>
        </div>
      </section>

      {/* 2. LIVE BATTLE */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-bold tracking-wide uppercase border border-red-200 dark:border-red-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Live Battle
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {isHindi ? "ऑल इंडिया लाइव टेस्ट" : "All India Live Test"}
            </h2>
          </div>
        </div>

        <div className="relative z-10 group">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800/50 rounded-[32px] p-8 md:p-12 shadow-xl relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full mix-blend-screen pointer-events-none transition-transform duration-700 group-hover:scale-125 group-hover:bg-indigo-500/20" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="space-y-6 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3 text-slate-500 dark:text-slate-400 font-medium text-sm">
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800 transition-colors duration-300 group-hover:bg-white dark:group-hover:bg-slate-800 group-hover:border-indigo-100 dark:group-hover:border-indigo-900/50 group-hover:shadow-sm">
                    <Calendar className="w-4 h-4 text-indigo-500 transition-transform duration-300 group-hover:scale-110" />
                    <span>
                      {new Date(
                        liveTestConfig?.resultDate || "2026-06-30T00:00:00",
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800 transition-colors duration-300 group-hover:bg-white dark:group-hover:bg-slate-800 group-hover:border-amber-100 dark:group-hover:border-amber-900/30 group-hover:shadow-sm">
                    <Trophy className="w-4 h-4 text-amber-500 transition-transform duration-300 group-hover:scale-110" />
                    {isCountingDown ? (
                      <div className="flex items-center gap-1.5 font-mono text-amber-600 dark:text-amber-500 font-bold text-sm">
                        <span>{String(timeLeft.days).padStart(2, "0")}d</span>
                        <span className="text-amber-300 dark:text-amber-700/50">
                          :
                        </span>
                        <span>{String(timeLeft.hours).padStart(2, "0")}h</span>
                        <span className="text-amber-300 dark:text-amber-700/50">
                          :
                        </span>
                        <span>
                          {String(timeLeft.minutes).padStart(2, "0")}m
                        </span>
                        <span className="text-amber-300 dark:text-amber-700/50">
                          :
                        </span>
                        <span>
                          {String(timeLeft.seconds).padStart(2, "0")}s
                        </span>
                        <span className="ml-1 text-slate-500 font-sans text-xs uppercase tracking-wider">
                          {isHindi ? "शेष" : "left"}
                        </span>
                      </div>
                    ) : (
                      <span>
                        {isHindi ? "परिणाम घोषित" : "Results Declared"}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center md:items-start md:flex-row flex-col gap-3 text-center md:text-left mb-2">
                  <span>🏆 All India Mega Test 2026</span>
                </h3>

                <div className="space-y-2 text-slate-700 dark:text-slate-300 font-medium">
                  <p className="flex items-center gap-2">
                    <span className="text-xl">🎯</span> Know Your Real
                    Preparation Level
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-xl">📈</span> Get Your All India Rank
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-xl">🏆</span> Compete With Thousands
                    of Aspirants Nationwide
                  </p>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed text-center md:text-left">
                  Designed for SSC, Railway, Banking, UP Police, State Exams,
                  and other competitive examinations. Test your skills, track
                  your performance, and see where you stand among India's top
                  aspirants.
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
                <button
                  onClick={handleAttemptBattle}
                  disabled={hasAttemptedBattle && !isAdmin}
                  className={`px-10 py-5 font-bold rounded-2xl transition-all w-full md:w-auto text-lg shadow-lg active:scale-95 duration-200 flex items-center justify-center gap-2 ${
                    hasAttemptedBattle && !isAdmin
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-1"
                  }`}
                >
                  {hasAttemptedBattle && !isAdmin
                    ? isHindi
                      ? "आप टेस्ट दे चुके हैं"
                      : "Already Attempted"
                    : "🚀 Attempt Free Test"}
                </button>
                <button
                  onClick={() => {
                    if (
                      !isCountingDown ||
                      isAdmin
                    ) {
                      setCurrentView("battle_results");
                    } else {
                      alert(
                        isHindi
                          ? `परिणाम ${new Date(liveTestConfig?.resultDate || "2026-06-30T00:00:00").toLocaleDateString("hi-IN")} को घोषित किए जाएंगे`
                          : `Results will be declared on ${new Date(liveTestConfig?.resultDate || "2026-06-30T00:00:00").toLocaleDateString()}`
                      );
                    }
                  }}
                  disabled={isCountingDown && !isAdmin}
                  className={`w-full md:w-auto px-10 py-3.5 font-bold rounded-2xl transition-all text-sm md:text-base border-2 flex items-center justify-center gap-2 ${
                    !isCountingDown || isAdmin
                      ? "border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 active:scale-95 duration-200"
                      : "border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 cursor-not-allowed"
                  }`}
                >
                  {isCountingDown && !isAdmin && (
                    <Lock className="w-4 h-4" />
                  )}
                  {isHindi ? "परिणाम देखें" : "View Results"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXAM CATEGORIES */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {isHindi ? "परीक्षा के अनुसार चुनें" : "Explore by Category"}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
              {isHindi
                ? "विभिन्न परीक्षाओं और संसाधनों के लिए विशिष्ट पोर्टल"
                : "Dedicated portals for specific exams and resources"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: "previous-year-selection",
              titleEn: "Previous Year Paper",
              titleHi: "पिछले वर्ष के प्रश्न पत्र",
              descEn: "SSC, Railways, Banking PYQ",
              descHi: "एसएससी, रेलवे, बैंकिंग पीवाईक्यू",
              icon: "⏳",
              bg: "from-amber-500 to-red-500",
            },
            {
              id: "central-exam-selection",
              titleEn: "Central Exams",
              titleHi: "केंद्रीय परीक्षाएं",
              descEn: "SSC, Railways, UPSC",
              descHi: "एसएससी, रेलवे, यूपीएससी",
              icon: "🏆",
              bg: "from-blue-500 to-indigo-600",
            },
            {
              id: "computer-selection",
              titleEn: "Computer Knowledge",
              titleHi: "कंप्यूटर ज्ञान",
              descEn: "Professional Courses",
              descHi: "व्यावसायिक पाठ्यक्रम (DCA, CCC)",
              icon: "💻",
              bg: "from-indigo-500 to-purple-600",
            },
            {
              id: "current-affairs-selection",
              titleEn: "Current Affairs",
              titleHi: "करेंट अफेयर्स",
              descEn: "Daily events updates",
              descHi: "दैनिक घटनाएं और समाचार",
              icon: "📰",
              bg: "from-amber-400 to-orange-500",
            },
            {
              id: "state-police-selection",
              titleEn: "State Police",
              titleHi: "राज्य पुलिस",
              descEn: "UP, Bihar, Rajasthan",
              descHi: "यूपी, बिहार, राजस्थान पुलिस",
              icon: "🛡️",
              bg: "from-rose-500 to-pink-600",
            },
            {
              id: "ncert-selection",
              titleEn: "NCERT Books",
              titleHi: "एनसीईआरटी पुस्तकें",
              descEn: "Class 5 to 12 materials",
              descHi: "कक्षा 5 से 12 तक",
              icon: "📚",
              bg: "from-emerald-400 to-teal-500",
            },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-[0_8px_20px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-slate-100 dark:border-slate-800 overflow-hidden"
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.bg} opacity-5 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300`}
              />
              <div className="flex flex-col h-full justify-between space-y-12">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.bg} text-white flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-100 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {isHindi ? item.titleHi : item.titleEn}
                  </h3>
                  <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300">
                    {isHindi ? item.descHi : item.descEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MAIN ATTRACTION: SUBJECT PRACTICE */}
      <section className="space-y-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

        <div className="text-center space-y-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {isHindi ? "विषय-वार अभ्यास" : "Core Subject Practice"}
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {isHindi
              ? "उन विषयों में महारत हासिल करें जो परीक्षा में सबसे ज्यादा पूछे जाते हैं।"
              : "Master the subjects that matter most. Dive deep into targeted question banks."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {[
            {
              id: "gkgs-selection",
              titleEn: "GK / General Studies",
              titleHi: "सामान्य ज्ञान / अध्ययन",
              descEn: "History, Polity, Geography, Economy",
              descHi: "इतिहास, राजनीति, अर्थशास्त्र",
              bg: "from-blue-500 to-indigo-600",
              icon: "🏛️",
              stat: "11 Topics",
            },
            {
              id: "science-selection",
              titleEn: "General Science",
              titleHi: "सामान्य विज्ञान",
              descEn: "Physics, Chemistry, Biology",
              descHi: "भौतिकी, रसायन विज्ञान, जीव विज्ञान",
              bg: "from-emerald-400 to-teal-500",
              icon: "🧬",
              stat: "15 Topics",
            },
            {
              id: "maths-selection",
              titleEn: "Mathematics",
              titleHi: "गणित",
              descEn: "Aptitude, Arithmetic, Algebra",
              descHi: "अंकगणित, बीजगणित, परिमिति",
              bg: "from-pink-500 to-rose-600",
              icon: "📐",
              stat: "12 Topics",
            },
            {
              id: "reasoning-selection",
              titleEn: "Reasoning",
              titleHi: "तार्किक क्षमता",
              descEn: "Analogy, Series, Puzzles",
              descHi: "श्रृंखला, रक्त संबंध, पज़ल",
              bg: "from-amber-400 to-orange-500",
              icon: "🧠",
              stat: "13 Topics",
            },
            {
              id: "hindi-selection",
              titleEn: "General Hindi",
              titleHi: "सामान्य हिन्दी",
              descEn: "Grammar, Vocabulary",
              descHi: "व्याकरण, शब्दावली, वर्णमाला",
              bg: "from-violet-500 to-purple-600",
              icon: "✍️",
              stat: "22 Topics",
            },
            {
              id: "english-selection",
              titleEn: "General English",
              titleHi: "सामान्य अंग्रेजी",
              descEn: "Grammar, Comprehension",
              descHi: "व्याकरण, बोधगम्यता",
              bg: "from-sky-400 to-blue-500",
              icon: "🔤",
              stat: "8 Topics",
            },
          ].map((subj) => (
            <div
              key={subj.id}
              onClick={() => setCurrentView(subj.id)}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-[0_8px_20px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-slate-100 dark:border-slate-800 overflow-hidden"
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${subj.bg} opacity-5 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300`}
              />
              <div className="flex flex-col h-full justify-between space-y-12">
                <div className="flex items-start justify-between relative">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subj.bg} text-white flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-100 transition-transform duration-300`}
                  >
                    {subj.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                    {subj.stat}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {isHindi ? subj.titleHi : subj.titleEn}
                  </h3>
                  <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300">
                    {isHindi ? subj.descHi : subj.descEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GAMIFICATION & STATS REMOVED */}
    </div>
  );
}
