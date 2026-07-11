import {
  ChevronLeft,
  Trophy,
  Search,
  Clock,
  Calendar,
  Shield,
  Swords,
  Award,
  Filter,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { db, collection, getDocs } from "../lib/firebase";

export default function BattleResultsView({ isHindi, setCurrentView }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [allResults, setAllResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testResults"));
        const results = querySnapshot.docs.map((doc) => doc.data());
        setAllResults(results);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // Format the leaderboard (All results saved are already "All India" tests only)
  const leaderboard = useMemo(() => {
    let filtered = [...allResults];

    // Sort by score descending
    filtered.sort((a, b) => b.score - a.score);

    // Add rank and avatar
    return filtered.map((r, i) => ({
      ...r,
      rank: i + 1,
      name: r.studentName || "Anonymous",
      avatar: ["👨‍🎓", "👩‍🎓", "👨‍💻", "👩‍🌾", "👨‍✈️", "👩‍🏫"][i % 6],
      score: r.score,
      accuracy: r.accuracy || 0,
      fatherName: r.fatherName || "N/A",
      rollNumber: r.rollNumber || "N/A",
    }));
  }, [allResults]);

  const top3 = leaderboard.slice(0, 3);
  const others = leaderboard
    .slice(3)
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.rollNumber &&
          user.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in relative z-10">
      <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 pt-4">
        <button
          onClick={() => setCurrentView("home")}
          className="p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-2xl transition-colors active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            {isHindi ? "बैटल परिणाम" : "Battle Results"}
          </h1>
          <p className="text-slate-500 font-medium flex items-center gap-2 mt-1">
            <Swords className="w-4 h-4 text-indigo-500" />{" "}
            {isHindi ? "ऑल इंडिया मेगा टेस्ट लीडरबोर्ड" : "All India Mega Test Leaderboard"}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div className="flex items-center gap-6">
            <div className="flex flex-col text-center md:text-left">
              <span className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">
                {isHindi ? "दिनांक" : "Tested On"}
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" /> 25 June 2026
              </span>
            </div>
            <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
            <div className="flex flex-col text-center md:text-left">
              <span className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">
                {isHindi ? "कुल छात्र" : "Participants"}
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                {loading
                  ? "Loading..."
                  : leaderboard.length > 0
                  ? (12450 + leaderboard.length).toLocaleString()
                  : "0"}
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center px-4 py-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4" />
            <input
              type="text"
              placeholder={isHindi ? "नाम खोजें..." : "Search participant..."}
              className="bg-transparent border-none outline-none pl-8 text-sm w-full font-medium placeholder:font-normal"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 border-b border-slate-200 dark:border-slate-800 pb-8 mb-12">
            <span className="text-slate-500 font-bold">
              {isHindi ? "परिणाम लोड हो रहे हैं..." : "Loading results..."}
            </span>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="flex justify-center items-center h-64 border-b border-slate-200 dark:border-slate-800 pb-8 mb-12">
            <span className="text-slate-500 font-bold">
              {isHindi
                ? "कोई परिणाम नहीं मिला"
                : "No results yet. Be the first!"}
            </span>
          </div>
        ) : !searchQuery && (
          <div className="mb-12 flex items-end justify-center gap-4 h-64 border-b border-slate-200 dark:border-slate-800 pb-8">
            {/* 2nd Place */}
            {top3[1] && (
              <div
                className="flex flex-col items-center animate-fade-in"
                style={{ animationDelay: "100ms" }}
              >
                <div className="text-3xl mb-2">{top3[1].avatar}</div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate w-24 text-center">
                  {top3[1].name}
                </div>
                <div className="text-xs font-mono text-slate-500 mb-2">
                  {top3[1].score}/{top3[1].score}
                </div>
                <div className="w-24 h-24 bg-gradient-to-t from-slate-300 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-t-xl flex items-center justify-center text-4xl shadow-lg relative border-t-2 border-slate-300 dark:border-slate-500">
                  🥈
                </div>
              </div>
            )}

            {/* 1st Place */}
            {top3[0] && (
              <div className="flex flex-col items-center z-10 animate-fade-in">
                <div className="text-4xl mb-2 relative">
                  {top3[0].avatar}
                  <Trophy className="absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-6 text-amber-500" />
                </div>
                <div className="text-base font-extrabold text-amber-600 dark:text-amber-500 truncate w-32 text-center">
                  {top3[0].name}
                </div>
                <div className="text-sm font-mono text-amber-700 dark:text-amber-600 mb-2">
                  {top3[0].score}/{top3[0].score}
                </div>
                <div className="w-32 h-32 bg-gradient-to-t from-amber-300 to-amber-200 dark:from-amber-600 dark:to-amber-500 rounded-t-xl flex items-center justify-center text-5xl shadow-2xl relative border-t-4 border-amber-400">
                  🥇
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {top3[2] && (
              <div
                className="flex flex-col items-center animate-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                <div className="text-3xl mb-2">{top3[2].avatar}</div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate w-24 text-center">
                  {top3[2].name}
                </div>
                <div className="text-xs font-mono text-slate-500 mb-2">
                  {top3[2].score}/{top3[2].score}
                </div>
                <div className="w-24 h-20 bg-gradient-to-t from-orange-300 to-orange-200 dark:from-orange-800 dark:to-orange-700 rounded-t-xl flex items-center justify-center text-4xl shadow-lg relative border-t-2 border-orange-300 dark:border-orange-600">
                  🥉
                </div>
              </div>
            )}
          </div>
        )}

        <div className="space-y-3">
          <div className="flex text-xs font-bold uppercase tracking-widest text-slate-400 pb-2 px-4">
            <div className="w-16">Rank</div>
            <div className="flex-1">Participant</div>
            <div className="w-24 text-center">Accuracy</div>
            <div className="w-24 text-right">Score</div>
          </div>

          <div className="space-y-2">
            {others.map((u) => (
              <div
                key={u.rank}
                className="flex items-center p-3 sm:px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20"
              >
                <div className="w-16 font-mono text-sm text-slate-500 font-medium">
                  #{u.rank}
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-2xl">{u.avatar}</span>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                      {u.name}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {isHindi ? "पिता: " : "S/O: "}{u.fatherName} | {u.rollNumber}
                    </span>
                  </div>
                </div>
                <div className="w-24 text-center text-slate-600 dark:text-slate-400 text-sm font-medium">
                  {u.accuracy}%
                </div>
                <div className="w-24 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {u.score}
                </div>
              </div>
            ))}
            {others.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                {isHindi ? "कोई छात्र नहीं मिला" : "No participants found matching "} "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
