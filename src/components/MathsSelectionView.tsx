import { ArrowLeft, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface MathsSelectionViewProps {
  isHindi: boolean;
  onBack: () => void;
  onSelectTopic: (subject: string, topic: string) => void;
}

interface MathsTopic {
  id: string;
  topicFilter: string;
  titleHi: string;
  titleEn: string;
  icon: string;
}

interface MathsSection {
  id: string;
  titleEn: string;
  titleHi: string;
  iconText: string;
  topics: MathsTopic[];
}

export default function MathsSelectionView({
  isHindi,
  onBack,
  onSelectTopic,
}: MathsSelectionViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const sections: MathsSection[] = [
    {
      id: "arithmetic",
      titleEn: "Arithmetic & Numbers",
      titleHi: "अंकगणित एवं संख्याएं",
      iconText: "🔢",
      topics: [
        {
          id: "m1",
          topicFilter: "Number System",
          titleHi: "संख्या पद्धति",
          titleEn: "Number System",
          icon: "🔢",
        },
        {
          id: "m2",
          topicFilter: "Percentage",
          titleHi: "प्रतिशत",
          titleEn: "Percentage",
          icon: "💯",
        },
        {
          id: "m3",
          topicFilter: "Profit",
          titleHi: "लाभ-हानि",
          titleEn: "Profit & Loss",
          icon: "📈",
        },
        {
          id: "m4",
          topicFilter: "Average",
          titleHi: "औसत",
          titleEn: "Average",
          icon: "⚖️",
        },
        {
          id: "m5",
          topicFilter: "Ratio",
          titleHi: "अनुपात एवं समानुपात",
          titleEn: "Ratio & Proportion",
          icon: "➗",
        },
        {
          id: "m6",
          topicFilter: "Time & Work",
          titleHi: "समय और कार्य",
          titleEn: "Time & Work",
          icon: "⏳",
        },
        {
          id: "m7",
          topicFilter: "Speed",
          titleHi: "समय, दूरी एवं चाल",
          titleEn: "Time, Distance & Speed",
          icon: "🚄",
        },
        {
          id: "m8",
          topicFilter: "Interest",
          titleHi: "साधारण एवं चक्रवृद्धि ब्याज",
          titleEn: "Simple & Compound Interest",
          icon: "💵",
        },
        {
          id: "m9",
          topicFilter: "Mensuration",
          titleHi: "क्षेत्रमिति (Mensuration)",
          titleEn: "Mensuration",
          icon: "📐",
        },
        {
          id: "m10",
          topicFilter: "Decimal",
          titleHi: "दशमलव एवं भिन्न",
          titleEn: "Decimal & Fraction",
          icon: "🔹",
        },
        {
          id: "m11",
          topicFilter: "LCM",
          titleHi: "LCM, HCF",
          titleEn: "LCM & HCF",
          icon: "🧩",
        },
        {
          id: "m12",
          topicFilter: "DI",
          titleHi: "डेटा व्याख्या (Basic DI)",
          titleEn: "Data Interpretation (DI)",
          icon: "📊",
        },
      ],
    },
  ];

  return (
    <div
      className="space-y-6 animate-fade-in text-left"
      id="maths-selection-container"
    >
      {/* Top Header Row matching screen exactly */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          </button>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#4169E1] font-extrabold block">
              विषय-वार अभ्यास (SUBJECT-WISE PRACTICE)
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {isHindi ? "गणित" : "Mathematics"}
            </h2>
          </div>
        </div>

        {/* Dynamic Search Box matches top right */}
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

      {/* Primary Section Container */}
      <div className="space-y-8 bg-slate-50/20 dark:bg-slate-900/10 border border-slate-100 dark:border-slate-800/50 rounded-[32px] p-6 md:p-8">
        {sections.map((section) => {
          // Filter section topics based on query
          const filteredTopics = section.topics.filter((t) => {
            const query = searchQuery.toLowerCase();
            return (
              t.titleHi.toLowerCase().includes(query) ||
              t.titleEn.toLowerCase().includes(query)
            );
          });

          if (filteredTopics.length === 0) return null;

          return (
            <div
              key={section.id}
              className="space-y-5"
              id={`maths-sec-${section.id}`}
            >
              {/* Header block matching user's image exactly (e.g. 🔢 अंकगणित एवं संख्याएं) */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/85">
                <span className="text-lg">{section.iconText}</span>
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 tracking-wider">
                  {isHindi ? section.titleHi : section.titleEn}
                </h3>
              </div>

              {/* Grid block duplicating the reference photo's gorgeous format */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    onClick={() =>
                      onSelectTopic("Mathematics", topic.topicFilter)
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

                      {/* Topic Metadata & titles */}
                      <div className="space-y-1 text-left min-w-0">
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                          {isHindi ? topic.titleHi : topic.titleEn}
                        </h4>
                        <span className="block text-[10px] text-slate-400 font-bold tracking-wider font-mono">
                          {isHindi
                            ? "क्विज अभ्यास • LIVE MCQS"
                            : "QUIZ PRACTICE • LIVE MCQS"}
                        </span>
                      </div>
                    </div>

                    {/* Start Button triggers active simulation */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTopic("Mathematics", topic.topicFilter);
                      }}
                      className="px-3 py-2 text-[11px] font-black tracking-tight text-slate-700 hover:text-white dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-[#4169E1] dark:hover:bg-[#4169E1] border border-slate-100 dark:border-slate-800 rounded-xl transition-all duration-300 flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer"
                    >
                      <span>▶</span>
                      <span>{isHindi ? "शुरू करें" : "Start"}</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Informative advice bottom banner */}
        <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/10 rounded-2xl border border-emerald-150/40 dark:border-slate-800 flex items-start gap-3 mt-4">
          <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 text-base">
            📐
          </span>
          <div className="text-left space-y-0.5">
            <h5 className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isHindi ? "गणित शॉर्टकट टिप:" : "Mathematics Optimization Tip:"}
            </h5>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              {isHindi
                ? "प्रत्येक प्रश्न में हल करने के त्वरित सूत्र (Shortcuts) और विस्तृत विवरण दिए गए हैं, ताकि आप परीक्षा में कम से कम समय में सही उत्तर चुन सकें।"
                : "Active practice with continuous self-evaluation triggers higher retention. Learn shortcuts, equations & logical derivations for each module."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
