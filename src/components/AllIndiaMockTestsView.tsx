import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  User,
  Camera,
  Globe,
  Calculator,
  Brain,
  Rocket,
  Eye,
  Key,
  FileText,
  BarChart3,
  ChevronRight,
  ArrowRight,
  Trophy,
  Sparkles,
  Search,
  CheckCircle2,
} from "lucide-react";

interface AllIndiaMockTestsViewProps {
  isHindi: boolean;
  onBack: () => void;
  onAttemptTest: (testId?: string) => void;
  onViewResults: () => void;
}

const MOCK_TEST_CARDS = [
  {
    id: "mega-test-1",
    titleEn: "All India Mega Test #1",
    titleHi: "ऑल इंडिया मेगा टेस्ट #1",
    testDate: "15 September 2026",
    totalMarks: 100,
    userId: "Rakesh yadav",
    hindi: 20,
    english: 20,
    gkgs: 20,
    math: 20,
    reasoning: 20,
    badge: "LIVE BATTLE",
    isLive: true,
  },
  {
    id: "mega-test-2",
    titleEn: "All India Mega Test #2",
    titleHi: "ऑल इंडिया मेगा टेस्ट #2",
    testDate: "10 September 2026",
    totalMarks: 100,
    userId: "Rakesh yadav",
    hindi: 20,
    english: 20,
    gkgs: 20,
    math: 20,
    reasoning: 20,
    badge: "ACTIVE",
    isLive: false,
  },
  {
    id: "mega-test-3",
    titleEn: "All India Mega Test #3",
    titleHi: "ऑल इंडिया मेगा टेस्ट #3",
    testDate: "05 September 2026",
    totalMarks: 100,
    userId: "Rakesh yadav",
    hindi: 20,
    english: 20,
    gkgs: 20,
    math: 20,
    reasoning: 20,
    badge: "ACTIVE",
    isLive: false,
  },
  {
    id: "mega-test-4",
    titleEn: "All India Special Test #4",
    titleHi: "ऑल इंडिया स्पेशल टेस्ट #4",
    testDate: "01 September 2026",
    totalMarks: 100,
    userId: "Rakesh yadav",
    hindi: 20,
    english: 20,
    gkgs: 20,
    math: 20,
    reasoning: 20,
    badge: "PRACTICE",
    isLive: false,
  },
  {
    id: "mega-test-5",
    titleEn: "All India Practice Test #5",
    titleHi: "ऑल इंडिया प्रैक्टिस टेस्ट #5",
    testDate: "25 August 2026",
    totalMarks: 100,
    userId: "Rakesh yadav",
    hindi: 20,
    english: 20,
    gkgs: 20,
    math: 20,
    reasoning: 20,
    badge: "PRACTICE",
    isLive: false,
  },
];

export default function AllIndiaMockTestsView({
  isHindi,
  onBack,
  onAttemptTest,
  onViewResults,
}: AllIndiaMockTestsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTests = MOCK_TEST_CARDS.filter(
    (t) =>
      t.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.titleHi.includes(searchTerm) ||
      t.testDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20 pt-4 px-4">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700 transition-colors shrink-0"
            title="Go Back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-wide uppercase border border-emerald-200 dark:border-emerald-500/20 mb-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              {isHindi ? "ऑल इंडिया टेस्ट सीरीज़" : "All India Test Series"}
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              {isHindi
                ? "ऑल इंडिया लाइव & मेगा मॉक टेस्ट्स"
                : "All India Live & Mega Mock Tests"}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
              {isHindi
                ? "100 प्रश्नों का लाइव टेस्ट दें (प्रत्येक विषय के 20 प्रश्न) और अपनी ऑल इंडिया रैंक देखें।"
                : "Attempt 100 questions live tests (20 per subject) & get your All India Rank."}
            </p>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={isHindi ? "टेस्ट खोजें..." : "Search tests..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-emerald-500 font-medium"
          />
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold">{isHindi ? "कुल टेस्ट" : "Total Tests"}</div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">5 Active Tests</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold">{isHindi ? "कुल प्रश्न" : "Total Questions"}</div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">100 MCQs / Test</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold">{isHindi ? "टेस्ट शुल्क" : "Test Fee"}</div>
            <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">100% FREE</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold">{isHindi ? "रैंकिंग" : "Ranking"}</div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">All India Rank</div>
          </div>
        </div>
      </div>

      {/* 4-5 DUPLICATE TEST CARDS GRID */}
      <div className="space-y-6">
        {filteredTests.map((testCard) => (
          <div
            key={testCard.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 rounded-[28px] p-5 md:p-7 shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-2xl group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full mix-blend-screen pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

            <div className="relative z-10 space-y-5">
              {/* CARD TITLE STRIP */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white">
                      {isHindi ? testCard.titleHi : testCard.titleEn}
                    </h3>
                    <div className="text-xs text-slate-400 font-medium">
                      {isHindi ? "फुल लेंथ मॉक टेस्ट • 100 अंक" : "Full Length Mock Test • 100 Marks"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    {testCard.badge}
                  </span>
                </div>
              </div>

              {/* TOP ROW: Profile Pic + 5 Subject Badges */}
              <div className="flex flex-col md:flex-row items-stretch gap-4">
                {/* Profile Picture with Camera Icon */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md group/pic">
                    <img
                      src="/teacher_avatar.png"
                      alt="Teacher Avatar"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/pic:scale-105"
                      onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                    <div className="absolute bottom-1 right-1 bg-emerald-600 text-white rounded-full p-1.5 border-2 border-white dark:border-slate-900 shadow-md flex items-center justify-center">
                      <Camera className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* 5 Subjects Cards Grid */}
                <div className="flex-1 grid grid-cols-5 gap-2 items-center justify-between">
                  {/* Hindi */}
                  <div className="flex flex-col items-center justify-between p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center h-full space-y-2 hover:border-emerald-200 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-extrabold text-base flex items-center justify-center shadow-xs">
                      अ
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Hindi
                    </span>
                    <div className="w-full py-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 font-extrabold text-sm rounded-xl">
                      {testCard.hindi}
                    </div>
                  </div>

                  {/* English */}
                  <div className="flex flex-col items-center justify-between p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center h-full space-y-2 hover:border-blue-200 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 font-bold text-[10px] flex items-center justify-center shadow-xs leading-tight">
                      A B C
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      English
                    </span>
                    <div className="w-full py-1 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-blue-400 font-extrabold text-sm rounded-xl">
                      {testCard.english}
                    </div>
                  </div>

                  {/* GK/GS */}
                  <div className="flex flex-col items-center justify-between p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center h-full space-y-2 hover:border-amber-200 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-bold text-sm flex items-center justify-center shadow-xs">
                      <Globe className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      GK/GS
                    </span>
                    <div className="w-full py-1 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 font-extrabold text-sm rounded-xl">
                      {testCard.gkgs}
                    </div>
                  </div>

                  {/* Math */}
                  <div className="flex flex-col items-center justify-between p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center h-full space-y-2 hover:border-purple-200 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 font-bold text-sm flex items-center justify-center shadow-xs">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Math
                    </span>
                    <div className="w-full py-1 bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/60 text-purple-700 dark:text-purple-400 font-extrabold text-sm rounded-xl">
                      {testCard.math}
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div className="flex flex-col items-center justify-between p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center h-full space-y-2 hover:border-emerald-200 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-bold text-sm flex items-center justify-center shadow-xs">
                      <Brain className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Reasoning
                    </span>
                    <div className="w-full py-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 font-extrabold text-sm rounded-xl">
                      {testCard.reasoning}
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS PANEL */}
              <div className="space-y-3 pt-1">
                {/* Big Dark Green Attempt Free Test Button */}
                <button
                  onClick={() => onAttemptTest(testCard.id)}
                  className="w-full py-4 px-6 font-extrabold rounded-2xl transition-all text-base md:text-lg shadow-lg flex items-center justify-between bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white shadow-emerald-700/20 hover:shadow-emerald-700/40 group/mainbtn"
                >
                  <div className="flex items-center gap-3">
                    <Rocket className="w-5 h-5 transition-transform group-hover/mainbtn:translate-x-0.5 group-hover/mainbtn:-translate-y-0.5" />
                    <span>{isHindi ? "फ्री टेस्ट दें (Attempt Free Test)" : "Attempt Free Test"}</span>
                  </div>
                  <ArrowRight className="w-6 h-6 transition-transform group-hover/mainbtn:translate-x-1" />
                </button>

                {/* 2x2 Grid of Secondary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* View Results */}
                  <button
                    onClick={onViewResults}
                    className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-all flex items-center justify-between text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 group/subbtn"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                        <Eye className="w-4 h-4" />
                      </div>
                      <span>{isHindi ? "परिणाम देखें" : "View Results"}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-blue-500 group-hover/subbtn:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Buy 20 /- */}
                  <button
                    onClick={() => {
                      alert(
                        isHindi
                          ? "यह टेस्ट सभी छात्रों के लिए 100% FREE है!"
                          : "This test is 100% FREE for all aspirants!"
                      );
                    }}
                    className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-slate-800 transition-all flex items-center justify-between text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 group/subbtn"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                        <Key className="w-4 h-4" />
                      </div>
                      <span>Buy 20 /-</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-emerald-500 group-hover/subbtn:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Answer Key */}
                  <button
                    onClick={onViewResults}
                    className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-purple-50/50 dark:hover:bg-slate-800 transition-all flex items-center justify-between text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 group/subbtn"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span>{isHindi ? "उत्तर कुंजी" : "Answer Key"}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-purple-500 group-hover/subbtn:translate-x-0.5 transition-transform" />
                  </button>

                  {/* How to Attempt This Test */}
                  <button
                    onClick={() => {
                      alert(
                        isHindi
                          ? "गाइड:\n1. Attempt Free Test पर क्लिक करें\n2. 100 प्रश्नों के उत्तर दें (प्रत्येक विषय के 20 प्रश्न)\n3. टेस्ट सबमिट करके अपना ऑल इंडिया रैंक देखें!"
                          : "Guide:\n1. Click Attempt Free Test\n2. Solve 100 questions (20 per subject)\n3. Submit test to get your All India Rank!"
                      );
                    }}
                    className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-slate-800 transition-all flex items-center justify-between text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 group/subbtn text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 shrink-0">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <div className="leading-tight">
                        <div className="text-xs font-bold">How to Attempt This Test</div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          (Step by Step Guide)
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-emerald-500 group-hover/subbtn:translate-x-0.5 transition-transform shrink-0" />
                  </button>
                </div>
              </div>

              {/* BOTTOM FOOTER STRIP */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300">
                {/* Test Date */}
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-normal">Test Date</div>
                    <div className="font-extrabold text-slate-800 dark:text-slate-200">
                      {testCard.testDate}
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700" />

                {/* Total Marks */}
                <div className="flex items-center gap-2.5">
                  <div className="px-3 py-1 bg-emerald-800 text-white rounded-xl font-black text-base">
                    {testCard.totalMarks}
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-normal">Total Marks</div>
                    <div className="font-extrabold text-slate-800 dark:text-slate-200">
                      {testCard.totalMarks}
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700" />

                {/* User ID */}
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-normal">User ID</div>
                    <div className="font-extrabold text-slate-800 dark:text-slate-200">
                      {testCard.userId}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
