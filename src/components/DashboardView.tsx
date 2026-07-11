import { useState } from "react";
import {
  Award,
  Flame,
  Target,
  BookMarked,
  Activity,
  Plus,
  Download,
  Lightbulb,
  CheckCircle,
  Copy,
  Trash,
  Notebook,
  User,
  Shield,
  Clock,
} from "lucide-react";
import { UserStats, Question } from "../types";
import { MOCK_LEADERBOARD } from "../mockData";

interface DashboardViewProps {
  userStats: UserStats;
  isHindi: boolean;
  questions: Question[];
  onUpdateStats: (newStats: UserStats) => void;
}

export default function DashboardView({
  userStats,
  isHindi,
  questions,
  onUpdateStats,
}: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<
    "all" | "overview" | "bookmarks" | "notes" | "badges"
  >("all");
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Filter bookmarked real questions
  const bookmarkedItems = questions.filter((q) =>
    userStats.bookmarks.includes(q.id),
  );

  // Copy simulated referral code
  const handleCopyCode = () => {
    navigator.clipboard.writeText("STUDYFLASH50");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Delete Bookmark
  const handleRemoveBookmark = (id: string) => {
    const fresh = userStats.bookmarks.filter((bId) => bId !== id);
    onUpdateStats({
      ...userStats,
      bookmarks: fresh,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Upper Profile presentation bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 text-white text-3xl font-bold flex items-center justify-center shadow">
              {userStats.avatarUrl}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {userStats.name}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                  Active Member
                </span>
              </div>
              <p className="text-xs text-slate-500 font-sans">
                {userStats.email}
              </p>

              <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-blue-500" />
                  Level {userStats.level}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowReferralModal(true)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-400"
            >
              🤝 {isHindi ? "दोस्तों को रेफर करें" : "Refer & Gain XP"}
            </button>
            <button
              onClick={() => {
                const reportContent = JSON.stringify(userStats, null, 2);
                const blob = new Blob([reportContent], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "StudyFlash_Report.json";
                a.click();
              }}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/10"
            >
              <Download className="h-3.5 w-3.5 inline mr-1" />
              {isHindi ? "रिपोर्ट डाउनलोड करें" : "Download Analytics Report"}
            </button>
          </div>
        </div>

        {/* LEVEL XP Progress slider block */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
            <span>Level {userStats.level} Progress</span>
            <span className="font-mono text-slate-400">
              {userStats.xp % 500} / 500 XP
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-sky-400"
              style={{ width: `${((userStats.xp % 500) / 500) * 100}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            Gain 500 XP to level up. Solve MCQs to gather XP (+25 per correct
            MCQ, +50 per completed Mock).
          </span>
        </div>
      </div>

      {/* Main Grid display stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm">
          <span className="text-xs font-bold block text-slate-500">
            {isHindi ? "हल किए गए कुल अभ्यास" : "Attempted Questions"}
          </span>
          <span className="text-3xl font-extrabold text-blue-600 dark:text-sky-400 block mt-2">
            {userStats.attempted}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">
            {isHindi ? "प्रश्नों का प्रयास" : "Questions logged"}
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm">
          <span className="text-xs font-bold block text-slate-500">
            {isHindi ? "औसत सटीकता" : "Accuracy Percent"}
          </span>
          <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 block mt-2">
            {userStats.accuracy}%
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">
            {isHindi ? "सटीक गणना" : "Target precision percentage"}
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm">
          <span className="text-xs font-bold block text-slate-500">
            {isHindi ? "कुल संचित XP" : "Total Accumulated XP"}
          </span>
          <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 block mt-2">
            {userStats.xp}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">
            {isHindi ? "कार्यकारी अंक" : "Experience points"}
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm">
          <span className="text-xs font-bold block text-slate-500">
            {isHindi ? "ऑल इंडिया रैंक (संभावित)" : "National Ranking Rank"}
          </span>
          <span className="text-3xl font-extrabold text-amber-500 block mt-2">
            #{userStats.rank}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">
            Weekly Tier
          </span>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex flex-wrap gap-1 border-b border-slate-200 dark:border-slate-800">
        {[
          {
            id: "all",
            label: isHindi ? "सब एक में (All-in-One)" : "⚡ All-in-One Hub",
          },
          { id: "overview", label: isHindi ? "मॉक इतिहास" : "Mock History" },
          {
            id: "bookmarks",
            label: isHindi
              ? "सुरक्षित प्रश्न"
              : `Bookmarks (${bookmarkedItems.length})`,
          },
          { id: "notes", label: isHindi ? "अध्ययन नोट्स" : "Personal Notes" },
          { id: "badges", label: isHindi ? "प्राप्त बैज" : "Achievements" },
        ].map((tab) => (
          <button
            key={tab.id}
            id={`dashboard-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600 dark:text-sky-400 font-extrabold"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sub Tabs views */}
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm"
        id="studyflash-tab-views-container"
      >
        {/* All In One Tab */}
        {activeTab === "all" && (
          <div
            className="space-y-8 animate-fade-in"
            id="dashboard-all-in-one-panel"
          >
            {/* Grid for core categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Box 2: Achievements & Badges quick list */}
              <div
                className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/40 space-y-4"
                id="all-in-one-badges-box"
              >
                <div className="flex justify-between items-center pb-2 border-b border-slate-150 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-amber-500" />
                    <span>
                      {isHindi
                        ? "प्राप्त उपलब्धियां और बैज"
                        : "Trophies & Badges"}
                    </span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {userStats.earnedBadges.length} active
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[175px] overflow-y-auto pr-1">
                  {userStats.earnedBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="p-2 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 flex items-center gap-2.5"
                    >
                      <span className="text-base shrink-0">🏆</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 dark:text-white truncate">
                            {badge.name}
                          </span>
                          <span className="text-[8px] text-slate-400 font-mono shrink-0">
                            {badge.unlockedAt}
                          </span>
                        </div>
                        <span className="text-[9.5px] text-slate-500 block leading-snug truncate">
                          {badge.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 3: Bookmarked list */}
              <div
                className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/40 space-y-4"
                id="all-in-one-bookmarks-box"
              >
                <div className="flex justify-between items-center pb-2 border-b border-slate-150 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <BookMarked className="h-4 w-4 text-blue-500" />
                    <span>
                      {isHindi
                        ? "सुरक्षित रिवीजन प्रश्न"
                        : "Saved Bookmarked Items"}
                    </span>
                  </h4>
                  <button
                    onClick={() => setActiveTab("bookmarks")}
                    className="text-[10px] text-blue-600 dark:text-sky-305 font-bold hover:underline cursor-pointer"
                  >
                    View All ({bookmarkedItems.length})
                  </button>
                </div>

                {bookmarkedItems.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-4 text-center">
                    {isHindi
                      ? "कोई बुकमार्क नहीं है।"
                      : "No bookmarked items. Hit the flag bookmark button inside standard MCQ banks."}
                  </p>
                ) : (
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {bookmarkedItems.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl space-y-1.5 relative"
                      >
                        <div className="flex items-center justify-between text-[9px] text-slate-400">
                          <span className="px-1.5 py-0.5 rounded font-extrabold bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-sky-305">
                            {item.subject}
                          </span>
                          <span>{item.topic}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2">
                          {isHindi ? item.questionHi : item.questionEn}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Box 4: Recent Mock Tests Stats */}
              <div
                className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/40 space-y-4"
                id="all-in-one-history-box"
              >
                <div className="flex justify-between items-center pb-2 border-b border-slate-150 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Activity className="h-4 w-4 text-emerald-500" />
                    <span>
                      {isHindi
                        ? "मॉक परफॉरमेंस रिपोर्ट"
                        : "Completed Mock Logs"}
                    </span>
                  </h4>
                  <button
                    onClick={() => setActiveTab("overview")}
                    className="text-[10px] text-blue-600 dark:text-sky-305 font-bold hover:underline cursor-pointer"
                  >
                    All Mocks
                  </button>
                </div>

                {userStats.history.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-4 text-center">
                    {isHindi
                      ? "कोई इतिहास उपलब्ध नहीं"
                      : "No mocks completed yet."}
                  </p>
                ) : (
                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                    {userStats.history.slice(0, 3).map((record, i) => (
                      <div
                        key={i}
                        className="p-3 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="text-[8px] text-slate-400 block font-mono">
                            {record.date}
                          </span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate block">
                            {record.testTitle}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-extrabold text-slate-800 dark:text-white block">
                            {record.score}/{record.totalMarks} M
                          </span>
                          <span className="text-[9px] text-emerald-600 font-bold">
                            {record.accuracy}% accuracy
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Box 5: Study Notes */}
            <div
              className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/40 space-y-4"
              id="all-in-one-notes-box"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-150 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <Notebook className="h-4 w-4 text-amber-500" />
                  <span>
                    {isHindi
                      ? "सहेजे गए रिवीजन नोट्स मेमोरीज"
                      : "Active Revision Memory Notes"}
                  </span>
                </h4>
                <button
                  onClick={() => setActiveTab("notes")}
                  className="text-[10px] text-blue-600 dark:text-sky-305 font-bold hover:underline cursor-pointer"
                >
                  Edit Sticky Notes
                </button>
              </div>

              {Object.keys(userStats.notes).length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4 text-center">
                  {isHindi
                    ? "कोई नोट्स दर्ज नहीं हैं।"
                    : "Empty notebook. Take active notes during quiz feedback or mock tests!"}
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(userStats.notes)
                    .slice(0, 4)
                    .map(([qId, noteText]) => {
                      const relatedQs = questions.find((q) => q.id === qId);
                      if (!noteText.trim()) return null;
                      return (
                        <div
                          key={qId}
                          className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex flex-col justify-between"
                        >
                          <span className="text-[9px] font-bold text-amber-600 uppercase font-mono block mb-1">
                            Related subject:{" "}
                            {relatedQs ? relatedQs.subject : "Revision Card"}
                          </span>
                          <p className="text-xs text-slate-650 dark:text-slate-300 leading-snug italic line-clamp-3">
                            "{noteText}"
                          </p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mock history Tab */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 block mb-3">
              {isHindi
                ? "पूर्व मॉक टेस्ट रिकॉर्ड"
                : "PREVIOUS MOCK STATISTICAL OUTLINE"}
            </h3>

            {userStats.history.length === 0 ? (
              <p className="text-sm text-slate-500 italic py-4">
                {isHindi
                  ? "कोई इतिहास उपलब्ध नहीं"
                  : "No mock history logged yet."}
              </p>
            ) : (
              <div className="space-y-3">
                {userStats.history.map((record, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">
                        {record.date}
                      </span>
                      <span className="text-sm font-extrabold text-slate-800 dark:text-white">
                        {record.testTitle}
                      </span>
                    </div>

                    <div className="flex gap-4 text-xs font-bold items-center">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block">
                          MARKS
                        </span>
                        <span className="text-slate-800 dark:text-white">
                          {record.score} / {record.totalMarks}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block">
                          ACCURACY
                        </span>
                        <span className="text-emerald-600">
                          {record.accuracy}%
                        </span>
                      </div>
                      <div className="hidden sm:block">
                        <span className="text-[10px] font-mono text-slate-400 block">
                          DURATION
                        </span>
                        <span className="text-slate-500">
                          {record.timeSpent}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bookmarks Tab */}
        {activeTab === "bookmarks" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 block mb-3">
              {isHindi ? "सहेजे गए अध्ययन प्रश्न" : "BOOKMARKED STUDY PAPERS"}
            </h3>

            {bookmarkedItems.length === 0 ? (
              <p className="text-sm text-slate-500 italic py-4">
                {isHindi
                  ? "कोई सुरक्षित प्रश्न नहीं है।"
                  : "Bookmark items directly within practice sheets."}
              </p>
            ) : (
              <div className="space-y-4">
                {bookmarkedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 relative space-y-3"
                  >
                    <button
                      onClick={() => handleRemoveBookmark(item.id)}
                      className="absolute top-4 right-4 p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                      title="Remove Bookmark"
                    >
                      <Trash className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-50 text-blue-600">
                        {item.subject}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Topic: {item.topic}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-slate-800 dark:text-white pr-8 leading-relaxed mb-2">
                      {isHindi ? item.questionHi : item.questionEn}
                    </p>

                    <div className="text-[11px] text-slate-500 leading-relaxed font-sans pt-2 border-t border-dashed border-slate-100 dark:border-slate-800">
                      <strong>Correct Option: {item.correctAnswer}</strong>
                      <p className="mt-1 italic">
                        {isHindi ? item.explanationHi : item.explanationEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === "notes" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 block mb-3">
              {isHindi
                ? "सहेजे गए रीविजन टिप्पणियाँ"
                : "YOUR REVISION MEMORY CARDS"}
            </h3>

            {Object.keys(userStats.notes).length === 0 ? (
              <p className="text-sm text-slate-500 italic py-4">
                No notes recorded. Write notes during MCQ practice sheets!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(userStats.notes).map(([qId, noteText]) => {
                  const relatedQs = questions.find((q) => q.id === qId);
                  if (!noteText.trim()) return null;

                  return (
                    <div
                      key={qId}
                      className="p-4 bg-amber-50/40 dark:bg-slate-900 rounded-2xl border border-amber-100 dark:border-slate-800 space-y-2"
                    >
                      <span className="text-[10px] uppercase font-mono font-bold text-amber-700 dark:text-amber-400">
                        Related:{" "}
                        {relatedQs ? relatedQs.subject : "Practice Item"}
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                        "{noteText}"
                      </p>

                      <div className="pt-2 border-t border-dashed border-amber-200 dark:border-slate-700 flex justify-end gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(noteText);
                          }}
                          className="text-[10px] font-bold text-slate-400 hover:text-slate-800 dark:hover:text-white"
                        >
                          Copy Note 📋
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === "badges" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 block mb-3">
              {isHindi
                ? "अनलॉक की गई उपलब्धियां"
                : "EARNED USER TROPHIES & BADGES"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {userStats.earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-gradient-to-tr from-slate-50 to-white dark:from-slate-900 dark:to-slate-900"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-xl shrink-0">
                    🏆
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">
                      {badge.name}
                    </h4>
                    <span className="block text-[10px] text-slate-500 leading-snug mt-0.5">
                      {badge.description}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block mt-1">
                      Unlocked: {badge.unlockedAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Invite Friends Referral popup */}
      {showReferralModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <h3 className="text-base font-extrabold">
              🤝 Invite Aspirants & Gain XP
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Share StudyFlash.in with your classmates. They will get a free
              Premium PDF mock kit, and you will receive{" "}
              <strong className="text-blue-600">500 XP bonus Points</strong>{" "}
              instantly!
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700 rounded-xl flex items-center justify-between">
              <span className="text-xs font-mono font-extrabold text-slate-800 dark:text-white">
                STUDYFLASH50
              </span>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold"
              >
                {copiedCode ? "Copied!" : "Copy Code"}
              </button>
            </div>

            <button
              onClick={() => setShowReferralModal(false)}
              className="mt-2 text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
