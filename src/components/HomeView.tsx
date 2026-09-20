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
  Bell,
  Megaphone,
  Zap,
  ArrowRight,
  Rocket,
  Eye,
  Key,
  FileText,
  BarChart3,
  User,
  Camera,
  Globe,
  Calculator,
  Brain,
  HelpCircle,
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

const LATEST_UPDATES_DATA = [
  {
    id: "update-1",
    titleEn: "Bihar SSC Inter Level (Tier-1) – 2025",
    titleHi: "बिहार SSC इंटर लेवल (Tier-1) – 2025",
    date: "12 Sep 2025",
    questionsCount: "100 Questions",
    iconType: "file",
    targetView: "state-police-selection",
  },
  {
    id: "update-2",
    titleEn: "RRB NTPC & Group D Live Test – 2026",
    titleHi: "आरआरबी NTPC एवं ग्रुप D लाइव टेस्ट – 2026",
    date: "15 Sep 2026",
    questionsCount: "100 Questions",
    iconType: "zap",
    targetView: "central-exam-selection",
  },
  {
    id: "update-3",
    titleEn: "SSC CGL Mega All-India Battle – 2026",
    titleHi: "एसएससी CGL मेगा ऑल-इंडिया बैटल – 2026",
    date: "10 Sep 2026",
    questionsCount: "100 Questions",
    iconType: "trophy",
    targetView: "all-india-tests",
  },
  {
    id: "update-4",
    titleEn: "State Police Recruitment Special – 2026",
    titleHi: "राज्य पुलिस भर्ती विशेष अभ्यास – 2026",
    date: "05 Sep 2026",
    questionsCount: "100 Questions",
    iconType: "swords",
    targetView: "state-police-selection",
  },
  {
    id: "update-5",
    titleEn: "Current Affairs Sep 2026 Special Capsule",
    titleHi: "करेंट अफेयर्स सितंबर 2026 स्पेशल कैप्सूल",
    date: "01 Sep 2026",
    questionsCount: "100 Questions",
    iconType: "flame",
    targetView: "current-affairs-selection",
  },
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
  const [currentUpdateIndex, setCurrentUpdateIndex] = useState(0);
  const [isUpdateHovered, setIsUpdateHovered] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCountingDown, setIsCountingDown] = useState(false);

  useEffect(() => {
    if (isUpdateHovered) return;
    const updateTimer = setInterval(() => {
      setCurrentUpdateIndex((prev) => (prev + 1) % LATEST_UPDATES_DATA.length);
    }, 4000);
    return () => clearInterval(updateTimer);
  }, [isUpdateHovered]);

  useEffect(() => {
    const battleAttempted = localStorage.getItem("studyflash_battle_attempted");
    if (battleAttempted === "true") {
      setHasAttemptedBattle(true);
    }

    const calculateTimeLeft = () => {
      const difference =
        +new Date(liveTestConfig?.resultDate || "2026-12-31T23:59:59") -
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

  const handleAttemptUpdate = (item: typeof LATEST_UPDATES_DATA[0]) => {
    if (item.targetView) {
      setCurrentView(item.targetView);
    } else {
      handleAttemptBattle();
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

      {/* 2. LATEST UPDATE SECTION (AUTO-ROTATING SINGLE ROW CAROUSEL) */}
      <section className="space-y-6 mb-12">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[32px] p-6 md:p-8 pb-8 md:pb-10 shadow-lg relative overflow-hidden transition-all duration-500 hover:shadow-xl space-y-6 group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-3xl rounded-full mix-blend-screen pointer-events-none transition-transform duration-700 group-hover:scale-125 group-hover:bg-emerald-500/20" />

          {/* Header: Megaphone Icon | Latest Update Title | Subtitle | Carousel Dots */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-[#eaf5e6] dark:bg-emerald-950/50 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 shrink-0">
                <Megaphone className="w-6 h-6 animate-pulse" />
              </div>
              <div className="h-10 w-px bg-slate-200 dark:bg-slate-700 shrink-0" />
              <div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  Latest <span className="text-emerald-600 dark:text-emerald-400">Update</span>
                </h2>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Stay updated with the latest mock tests and important links.
                </p>
              </div>
            </div>

            {/* Carousel Indicator Dots */}
            <div className="flex items-center gap-1.5 self-end sm:self-center">
              {LATEST_UPDATES_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentUpdateIndex(idx)}
                  className={`h-2.5 transition-all duration-300 rounded-full ${
                    idx === currentUpdateIndex
                      ? "w-7 bg-emerald-600"
                      : "w-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-emerald-300"
                  }`}
                  title={`Go to update ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* SINGLE ACTIVE COMBINED ROW ITEM WITH AUTO ROTATION */}
          <div 
            className="relative z-10 min-h-[96px]"
            onMouseEnter={() => setIsUpdateHovered(true)}
            onMouseLeave={() => setIsUpdateHovered(false)}
          >
            {(() => {
              const activeItem = LATEST_UPDATES_DATA[currentUpdateIndex];
              return (
                <div
                  key={activeItem.id}
                  className="bg-[#ebf4e7] dark:bg-slate-800/80 border border-emerald-200/60 dark:border-slate-700/80 rounded-2xl p-3.5 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-500 animate-fade-in hover:shadow-md group/row"
                >
                  {/* LEFT SIDE (50% WIDTH): Exam Icon + Title + Meta + Solid Green Attempt Test Button */}
                  <div className="flex-1 w-full md:w-1/2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-0 md:pr-2">
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0 p-2.5 md:p-3 bg-emerald-100/90 dark:bg-emerald-900/50 rounded-2xl text-emerald-800 dark:text-emerald-400">
                        {activeItem.iconType === "zap" ? (
                          <Zap className="w-5 h-5 md:w-6 md:h-6" />
                        ) : activeItem.iconType === "trophy" ? (
                          <Trophy className="w-5 h-5 md:w-6 md:h-6" />
                        ) : activeItem.iconType === "swords" ? (
                          <Swords className="w-5 h-5 md:w-6 md:h-6" />
                        ) : activeItem.iconType === "flame" ? (
                          <Flame className="w-5 h-5 md:w-6 md:h-6" />
                        ) : (
                          <FileText className="w-5 h-5 md:w-6 md:h-6" />
                        )}
                        <span className="absolute -bottom-1 -right-1 bg-emerald-700 text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded-full border-2 border-white dark:border-slate-900 shadow-xs">
                          NEW
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm md:text-base font-black text-slate-900 dark:text-white group-hover/row:text-emerald-800 dark:group-hover/row:text-emerald-300 transition-colors truncate">
                          {isHindi ? activeItem.titleHi : activeItem.titleEn}
                        </h3>
                        <div className="flex items-center gap-2 md:gap-3 text-[11px] md:text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                          <span className="flex items-center gap-1 shrink-0">
                            <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-600" />
                            {activeItem.date}
                          </span>
                          <span>|</span>
                          <span className="flex items-center gap-1 shrink-0">
                            <FileText className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-600" />
                            {activeItem.questionsCount}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Solid Green Attempt Test Button */}
                    <button
                      onClick={() => handleAttemptUpdate(activeItem)}
                      className="px-5 py-2 md:py-2.5 rounded-full bg-[#047857] hover:bg-emerald-800 text-white font-extrabold text-xs md:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 shrink-0 self-end sm:self-center cursor-pointer"
                    >
                      <span>Attempt Test</span>
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                  </div>

                  {/* VERTICAL DIVIDER LINE IN EXACT CENTER */}
                  <div className="hidden md:block w-px bg-slate-300/80 dark:bg-slate-700 h-12 shrink-0 mx-1" />

                  {/* RIGHT SIDE (50% WIDTH): Teacher Avatar + Rakesh Sir Test + Outline Green Open Test Button */}
                  <div className="flex-1 w-full md:w-1/2 flex items-center justify-between gap-3 bg-white/95 dark:bg-slate-900/95 p-2.5 px-4 rounded-full border border-emerald-200/60 dark:border-slate-700 shadow-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src="/teacher_avatar.png"
                        alt="Rakesh Sir Avatar"
                        className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-emerald-500 object-cover shrink-0"
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                        }}
                      />
                      <div className="min-w-0">
                        <div className="font-extrabold text-slate-900 dark:text-white text-xs md:text-sm truncate">
                          Rakesh Sir Test
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium truncate">
                          Fixed test link (Rakesh Sir)
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentView("all-india-tests")}
                      className="px-4 py-2 rounded-full border-2 border-[#047857] text-[#047857] dark:text-emerald-400 hover:bg-[#047857] hover:text-white dark:hover:bg-emerald-600 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-xs shrink-0 active:scale-95"
                    >
                      <span>Open Test</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* BOTTOM FULL-WIDTH BUTTON WITH EXTRA BOTTOM SPACING */}
          <div className="pt-2 pb-2">
            <button
              onClick={() => setCurrentView("all-india-tests")}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#e5f3e1] dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/60 text-[#047857] dark:text-emerald-400 hover:bg-emerald-200/70 dark:hover:bg-emerald-900/70 font-black text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-200 group/btn shadow-xs"
            >
              <span>{isHindi ? "सभी 5 ऑल इंडिया मॉक टेस्ट देखें" : "View All All-India Mock Tests"}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
            </button>
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
