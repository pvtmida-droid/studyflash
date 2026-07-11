import {
  ArrowLeft,
  Search,
  Sparkles,
  BookOpen,
  FlaskConical,
  Leaf,
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface ScienceSelectionViewProps {
  isHindi: boolean;
  onBack: () => void;
  onSelectTopic: (subject: string, topic: string) => void;
}

interface ScienceTopic {
  id: string;
  topicFilter: string;
  titleHi: string;
  titleEn: string;
  icon: string;
}

interface ScienceSection {
  id: string;
  titleEn: string;
  titleHi: string;
  icon: any;
  colorClass: string;
  iconText: string;
  topics: ScienceTopic[];
}

export default function ScienceSelectionView({
  isHindi,
  onBack,
  onSelectTopic,
}: ScienceSelectionViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const sections: ScienceSection[] = [
    {
      id: "physics",
      titleEn: "PHYSICS",
      titleHi: "भौतिक विज्ञान",
      icon: BookOpen,
      iconText: "📚",
      colorClass: "text-blue-600 dark:text-sky-400",
      topics: [
        {
          id: "p1",
          topicFilter: "Light",
          titleHi: "प्रकाश",
          titleEn: "Light - Reflection & Refraction",
          icon: "💡",
        },
        {
          id: "p2",
          topicFilter: "Eye",
          titleHi: "मानव नेत्र",
          titleEn: "The Human Eye & Colorful World",
          icon: "👁️",
        },
        {
          id: "p3",
          topicFilter: "Electricity",
          titleHi: "विद्युत",
          titleEn: "Electricity / Electric Current",
          icon: "⚡",
        },
        {
          id: "p4",
          topicFilter: "Magnetic",
          titleHi: "चुंबकीय प्रभाव",
          titleEn: "Magnetic Effects of Electric Current",
          icon: "🧲",
        },
        {
          id: "p5",
          topicFilter: "Energy",
          titleHi: "ऊर्जा के स्रोत",
          titleEn: "Sources of Energy",
          icon: "🔋",
        },
      ],
    },
    {
      id: "chemistry",
      titleEn: "CHEMISTRY",
      titleHi: "रसायन विज्ञान",
      icon: FlaskConical,
      iconText: "🧪",
      colorClass: "text-emerald-600 dark:text-teal-400",
      topics: [
        {
          id: "c1",
          topicFilter: "Chemical",
          titleHi: "रासायनिक अभिक्रियाएँ एवं समीकरण",
          titleEn: "Chemical Reactions & Equations",
          icon: "🧪",
        },
        {
          id: "c2",
          topicFilter: "Acid",
          titleHi: "अम्ल, क्षार एवं लवण",
          titleEn: "Acids, Bases & Salts",
          icon: "🍋",
        },
        {
          id: "c3",
          topicFilter: "Metal",
          titleHi: "धातु एवं अधातु",
          titleEn: "Metals & Non-metals",
          icon: "🪨",
        },
        {
          id: "c4",
          topicFilter: "Carbon",
          titleHi: "कार्बन एवं उसके यौगिक",
          titleEn: "Carbon & its Compounds",
          icon: "💎",
        },
        {
          id: "c5",
          topicFilter: "Periodic",
          titleHi: "तत्वों का आवर्त वर्गीकरण",
          titleEn: "Periodic Classification of Elements",
          icon: "📊",
        },
      ],
    },
    {
      id: "biology",
      titleEn: "BIOLOGY",
      titleHi: "जीव विज्ञान",
      icon: Leaf,
      iconText: "🌿",
      colorClass: "text-green-600 dark:text-emerald-400",
      topics: [
        {
          id: "b1",
          topicFilter: "Life Processes",
          titleHi: "जीवन प्रक्रियाएँ",
          titleEn: "Life Processes / जैव प्रक्रम",
          icon: "🧬",
        },
        {
          id: "b2",
          topicFilter: "Control",
          titleHi: "नियंत्रण एवं समन्वय",
          titleEn: "Control & Coordination",
          icon: "🧠",
        },
        {
          id: "b3",
          topicFilter: "Reproduction",
          titleHi: "प्रजनन",
          titleEn: "How do Organisms Reproduce?",
          icon: "👶",
        },
        {
          id: "b4",
          topicFilter: "Heredity",
          titleHi: "आनुवंशिकता एवं विकास",
          titleEn: "Heredity & Evolution",
          icon: "🐒",
        },
        {
          id: "b5",
          topicFilter: "Environment",
          titleHi: "पर्यावरण",
          titleEn: "Our Environment",
          icon: "🌍",
        },
      ],
    },
  ];

  return (
    <div
      className="space-y-6 animate-fade-in text-left"
      id="science-selection-container"
    >
      {/* Search Header visual matching the GK design perfectly */}
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
              {isHindi ? "विषय-वार अभ्यास" : "SUBJECT-WISE PRACTICE"}
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {isHindi
                ? "सामान्य विज्ञान (General Science)"
                : "General Science syllabus"}
            </h2>
          </div>
        </div>

        {/* Dynamic Search bar resembling screenshot */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder={
              isHindi
                ? "विज्ञान विषय या टॉपिक खोजें..."
                : "Search physics, chemistry, biology..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-medium pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm text-slate-700 dark:text-slate-300 transition-all"
          />
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
        </div>
      </div>

      {/* Main container with structured subsections and cards matching screenshot layout */}
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
              className="space-y-4"
              id={`science-sec-${section.id}`}
            >
              {/* Header block with prefix emoji and clean typography */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                <span className="text-lg">{section.iconText}</span>
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 tracking-wider uppercase font-mono">
                  {section.titleEn}{" "}
                  <span className="text-slate-400 dark:text-slate-500 font-sans font-medium text-xs ml-1">
                    ({section.titleHi})
                  </span>
                </h3>
              </div>

              {/* Grid block closely matching target mockup */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    onClick={() => onSelectTopic("Science", topic.topicFilter)}
                    className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4.5 flex items-center justify-between shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] dark:hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 group cursor-pointer overflow-hidden z-0"
                  >
                    {/* Glow Background Effect inside card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>

                    <div className="flex items-center gap-4 min-w-0 z-10">
                      {/* Decorative Icon */}
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 border border-amber-100 dark:border-amber-500/20 flex items-center justify-center shrink-0 text-xl group-hover:scale-110 shadow-sm transition-transform duration-300">
                        {topic.icon}
                      </div>

                      {/* Topic title & context details */}
                      <div className="space-y-0.5 text-left min-w-0">
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                          {isHindi ? topic.titleHi : topic.titleEn}
                        </h4>
                        <span className="block text-[10px] text-slate-400 font-bold tracking-wider font-mono">
                          {isHindi
                            ? "क्विज अभ्यास • LIVE MCQS"
                            : "QUIZ PRACTICE • LIVE MCQS"}
                        </span>
                      </div>
                    </div>

                    {/* Play button match details */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTopic("Science", topic.topicFilter);
                      }}
                      className="px-3 py-1.5 text-[11px] font-black tracking-tight text-slate-700 hover:text-white dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-[#4169E1] dark:hover:bg-[#4169E1] border border-slate-100 dark:border-slate-800 rounded-xl transition-all duration-300 flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer"
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

        {/* Advice panel */}
        <div className="p-4 bg-blue-50/50 dark:bg-slate-900/30 rounded-2xl border border-blue-100/40 dark:border-slate-800 flex items-start gap-3 mt-4">
          <span className="p-1 rounded-md bg-blue-500/10 text-blue-500 text-base">
            🔬
          </span>
          <div className="text-left space-y-0.5">
            <h5 className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isHindi
                ? "विज्ञान अवधारणा स्पष्टिकरण टिप:"
                : "Science Integration Tip:"}
            </h5>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              {isHindi
                ? "प्रत्येक प्रश्न में विस्तृत एनसीईआरटी (NCERT) स्पष्टीकरण और चित्र शामिल हैं ताकि आपकी मूलभूत समझ और गति परीक्षा के अनुकूल हो सके।"
                : "Our complete physical & biosciences database matches strict NCERT syllabi mapped to multiple mock suites for SSC, Railway, and Board preparation."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
