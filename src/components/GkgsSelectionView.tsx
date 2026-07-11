import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface GkgsSelectionViewProps {
  isHindi: boolean;
  onBack: () => void;
  onSelectTopic: (subject: string, topic: string) => void;
}

interface GkgsTopic {
  id: string; // Used for actual dataset subject filtering
  subjectCode: string; // actual subject mapping e.g. "History"
  topicFilter: string; // actual topic search keyword
  titleHi: string;
  titleEn: string;
  icon: string;
}

export default function GkgsSelectionView({
  isHindi,
  onBack,
  onSelectTopic,
}: GkgsSelectionViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const topics: GkgsTopic[] = [
    {
      id: "india-neighboring",
      subjectCode: "All",
      topicFilter: "Neighboring",
      titleHi: "भारत एवं पड़ोसी देश",
      titleEn: "India & Neighboring Countries",
      icon: "🗺️",
    },
    {
      id: "history",
      subjectCode: "History",
      topicFilter: "",
      titleHi: "इतिहास",
      titleEn: "History",
      icon: "📜",
    },
    {
      id: "geography",
      subjectCode: "Geography",
      topicFilter: "",
      titleHi: "भूगोल",
      titleEn: "Geography",
      icon: "🌎",
    },
    {
      id: "constitution",
      subjectCode: "Polity",
      topicFilter: "Constitution",
      titleHi: "भारतीय संविधान",
      titleEn: "Indian Constitution",
      icon: "🏛",
    },
    {
      id: "polity",
      subjectCode: "Polity",
      topicFilter: "",
      titleHi: "राजनीति",
      titleEn: "Polity & Politics",
      icon: "⚖️",
    },
    {
      id: "economy",
      subjectCode: "Economics",
      topicFilter: "",
      titleHi: "अर्थव्यवस्था",
      titleEn: "Economics / Indian Economy",
      icon: "💰",
    },
    {
      id: "culture",
      subjectCode: "Static GK",
      topicFilter: "Culture",
      titleHi: "संस्कृति",
      titleEn: "Art & Culture",
      icon: "🎨",
    },
    {
      id: "sports",
      subjectCode: "Static GK",
      topicFilter: "Sports",
      titleHi: "खेल",
      titleEn: "Sports & Athletics",
      icon: "🏅",
    },
    {
      id: "awards",
      subjectCode: "Static GK",
      topicFilter: "Honors",
      titleHi: "पुरस्कार एवं सम्मान",
      titleEn: "Awards & Honors",
      icon: "🏆",
    },
    {
      id: "important-days",
      subjectCode: "Static GK",
      topicFilter: "Days",
      titleHi: "महत्वपूर्ण दिवस",
      titleEn: "Important Days & Milestones",
      icon: "📅",
    },
    {
      id: "science-research",
      subjectCode: "Science",
      topicFilter: "Research",
      titleHi: "वैज्ञानिक अनुसंधान",
      titleEn: "Scientific Research",
      icon: "🔬",
    },
  ];

  // Filtering based on search query
  const filteredTopics = topics.filter((t) => {
    const term = searchQuery.toLowerCase();
    return (
      t.titleHi.toLowerCase().includes(term) ||
      t.titleEn.toLowerCase().includes(term)
    );
  });

  return (
    <div
      className="space-y-6 animate-fade-in text-left"
      id="gkgs-selection-container"
    >
      {/* Top Header Row matching the exact screenshot visual hierarchy */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          </button>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-extrabold block">
              विषय-वार अभ्यास (SUBJECT-WISE PRACTICE)
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight">
              सामान्य ज्ञान / सामान्य अध्ययन
            </h2>
          </div>
        </div>

        {/* Dynamic Search Box matching look from image */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder={
              isHindi
                ? "अध्याय या टॉपिक खोजें..."
                : "Search chapter or topic..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-medium pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm text-slate-700 dark:text-slate-300 transition-all"
          />
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
        </div>
      </div>

      {/* Primary Container Grid Box */}
      <div className="bg-slate-50/50 dark:bg-slate-900/10 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-6">
        {/* catalog header banner */}
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800/80">
          <span className="text-base">🌏</span>
          <h3 className="text-sm font-extrabold text-slate-700 dark:text-slate-300">
            {isHindi
              ? "सामान्य अध्ययन विषय सूची"
              : "General Studies Complete Catalog"}
          </h3>
        </div>

        {filteredTopics.length === 0 ? (
          <div className="py-12 text-center text-slate-400 font-mono text-sm">
            {isHindi ? "कोई फोल्डर नहीं मिला।" : "No matches found."}
          </div>
        ) : (
          /* Grid structure mirroring the image perfectly */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTopics.map((topic, i) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2, delay: i * 0.02 }}
                onClick={() =>
                  onSelectTopic(topic.subjectCode, topic.topicFilter)
                }
                className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4.5 flex items-center justify-between shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] dark:hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 group cursor-pointer overflow-hidden z-0"
              >
                {/* Glow Background Effect inside card */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>

                <div className="flex items-center gap-4 min-w-0 z-10">
                  {/* Decorative Icon */}
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 border border-amber-100 dark:border-amber-500/20 flex items-center justify-center shrink-0 text-xl group-hover:scale-110 shadow-sm transition-transform duration-300">
                    {topic.icon}
                  </div>

                  {/* Subject Name & Info */}
                  <div className="space-y-1 text-left min-w-0">
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                      {isHindi ? topic.titleHi : topic.titleEn}
                    </h4>
                    <span className="block text-[10px] text-slate-400 font-bold tracking-wider font-mono uppercase">
                      {isHindi
                        ? "क्विज अभ्यास • LIVE MCQS"
                        : "QUIZ PRACTICE • LIVE MCQS"}
                    </span>
                  </div>
                </div>

                {/* Right Align Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTopic(topic.subjectCode, topic.topicFilter);
                  }}
                  className="px-3 py-2 text-[11px] font-black tracking-tight text-slate-700 hover:text-white dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-[#4169E1] dark:hover:bg-[#4169E1] border border-slate-100 dark:border-slate-800 rounded-xl transition-all duration-300 flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer"
                >
                  <span>▶</span>
                  <span>{isHindi ? "शुरू करें" : "Start"}</span>
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Study Advice Box */}
        <div className="p-4 bg-orange-50/40 dark:bg-slate-950/20 rounded-2xl border border-orange-100/50 dark:border-slate-800 flex items-start gap-3 mt-4">
          <span className="p-1 rounded-md bg-amber-500/10 text-amber-600 text-base flex shrink-0">
            🎯
          </span>
          <div className="text-left space-y-0.5">
            <h5 className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isHindi ? "दैनिक अभ्यास टिप:" : "Daily Practice Strategy:"}
            </h5>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal font-sans">
              {isHindi
                ? "प्रत्येक विषय के तहत महत्वपूर्ण एमसीक्यू और स्पष्टीकरण शामिल हैं। नियमित हल करने से आपकी मानसिक धारणा (Retention) ४ गुना तक बढ़ सकती है।"
                : "Active recall is highly effective for GK studies. Target folders daily to significantly elevate your scoring accuracy across all UPSC and ssc exams."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
