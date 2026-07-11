import { ArrowLeft, BookOpen, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { Question } from "../types";

interface NcertSelectionViewProps {
  isHindi: boolean;
  onBack: () => void;
  onSelectNcertClass: (classNum: number, subject?: string) => void;
}

// Map each class with a theme and list of typical NCERT subjects for interactive navigation
const NCERT_CLASSES_DATA = [
  {
    number: 12,
    nameEn: "Class 12",
    nameHi: "कक्षा 12",
    color: "bg-orange-500",
    textColor: "text-orange-500",
    borderColor: "border-orange-200/60 dark:border-orange-900/30",
    hoverBg: "hover:bg-orange-500/10 dark:hover:bg-orange-950/20",
    subjects: [
      { id: "Physics", nameEn: "Physics", nameHi: "भौतिक विज्ञान", icon: "⚛️" },
      {
        id: "History",
        nameEn: "History (Modern India)",
        nameHi: "इतिहास (आधुनिक भारत)",
        icon: "📜",
      },
      {
        id: "Polity",
        nameEn: "Political Science",
        nameHi: "राजनीति विज्ञान",
        icon: "🏛️",
      },
    ],
  },
  {
    number: 11,
    nameEn: "Class 11",
    nameHi: "कक्षा 11",
    color: "bg-emerald-600",
    textColor: "text-emerald-600",
    borderColor: "border-emerald-200/60 dark:border-emerald-900/30",
    hoverBg: "hover:bg-emerald-600/10 dark:hover:bg-emerald-950/20",
    subjects: [
      {
        id: "Geography",
        nameEn: "Physical Geography",
        nameHi: "भौतिक भूगोल",
        icon: "🌍",
      },
      {
        id: "Chemistry",
        nameEn: "Chemistry",
        nameHi: "रसायन विज्ञान",
        icon: "🧪",
      },
      {
        id: "History",
        nameEn: "Ancient World History",
        nameHi: "विश्व इतिहास",
        icon: "🏺",
      },
    ],
  },
  {
    number: 10,
    nameEn: "Class 10",
    nameHi: "कक्षा 10",
    color: "bg-rose-500",
    textColor: "text-rose-500",
    borderColor: "border-rose-200/60 dark:border-rose-900/30",
    hoverBg: "hover:bg-rose-500/10 dark:hover:bg-rose-950/20",
    subjects: [
      {
        id: "Science",
        nameEn: "General Science",
        nameHi: "सामान्य विज्ञान",
        icon: "🔬",
      },
      { id: "Mathematics", nameEn: "Mathematics", nameHi: "गणित", icon: "📐" },
      {
        id: "Civics",
        nameEn: "Civics & Economics",
        nameHi: "नागरिक और अर्थशास्त्र",
        icon: "📊",
      },
    ],
  },
  {
    number: 9,
    nameEn: "Class 9",
    nameHi: "कक्षा 9",
    color: "bg-emerald-600",
    textColor: "text-emerald-600",
    borderColor: "border-emerald-200/60 dark:border-emerald-900/30",
    hoverBg: "hover:bg-emerald-600/10 dark:hover:bg-emerald-950/20",
    subjects: [
      {
        id: "Science",
        nameEn: "Science (Matter & Laws)",
        nameHi: "विज्ञान (पदार्थ और नियम)",
        icon: "🧬",
      },
      {
        id: "History",
        nameEn: "French Revolution & Polity",
        nameHi: "फ्रांसीसी क्रांति और राजनीति",
        icon: "✊",
      },
    ],
  },
  {
    number: 8,
    nameEn: "Class 8",
    nameHi: "कक्षा 8",
    color: "bg-blue-500",
    textColor: "text-blue-500",
    borderColor: "border-blue-200/60 dark:border-blue-900/30",
    hoverBg: "hover:bg-blue-500/10 dark:hover:bg-blue-950/20",
    subjects: [
      {
        id: "Science",
        nameEn: "General Science",
        nameHi: "सामान्य विज्ञान",
        icon: "💡",
      },
      {
        id: "Civics",
        nameEn: "Our Constitution",
        nameHi: "हमारा संविधान",
        icon: "⚖️",
      },
    ],
  },
  {
    number: 7,
    nameEn: "Class 7",
    nameHi: "कक्षा 7",
    color: "bg-lime-600",
    textColor: "text-lime-600",
    borderColor: "border-lime-200/60 dark:border-lime-900/30",
    hoverBg: "hover:bg-lime-600/10 dark:hover:bg-lime-950/20",
    subjects: [
      {
        id: "Science",
        nameEn: "Environment & Animals",
        nameHi: "पर्यावरण और जीव",
        icon: "🌱",
      },
      {
        id: "History",
        nameEn: "Medieval India",
        nameHi: "मध्यकालीन भारत",
        icon: "🏯",
      },
    ],
  },
  {
    number: 6,
    nameEn: "Class 6",
    nameHi: "कक्षा 6",
    color: "bg-fuchsia-500",
    textColor: "text-fuchsia-500",
    borderColor: "border-fuchsia-200/60 dark:border-fuchsia-900/30",
    hoverBg: "hover:bg-fuchsia-500/10 dark:hover:bg-fuchsia-950/20",
    subjects: [
      {
        id: "Science",
        nameEn: "Basic Science Concepts",
        nameHi: "मूल विज्ञान अवधारणाएं",
        icon: "🔎",
      },
      {
        id: "History",
        nameEn: "Our Pasts - I",
        nameHi: "हमारे अतीत - I",
        icon: "🏺",
      },
    ],
  },
  {
    number: 5,
    nameEn: "Class 5",
    nameHi: "कक्षा 5",
    color: "bg-pink-500",
    textColor: "text-pink-500",
    borderColor: "border-pink-200/60 dark:border-pink-900/30",
    hoverBg: "hover:bg-pink-500/10 dark:hover:bg-pink-950/20",
    subjects: [
      {
        id: "Science",
        nameEn: "Environmental Studies",
        nameHi: "पर्यावरण अध्ययन (EVS)",
        icon: "🎒",
      },
    ],
  },
];

export default function NcertSelectionView({
  isHindi,
  onBack,
  onSelectNcertClass,
}: NcertSelectionViewProps) {
  const [selectedClassNum, setSelectedClassNum] = useState<number | null>(null);

  const selectedClassData = NCERT_CLASSES_DATA.find(
    (c) => c.number === selectedClassNum,
  );

  return (
    <div className="space-y-8 animate-fade-in" id="ncert-selection-container">
      {/* Back button link row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800/80 transition cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{isHindi ? "मुख्य पृष्ठ" : "Back to Home"}</span>
        </button>
        <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/25 text-emerald-700 dark:text-emerald-400 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-mono border border-emerald-200/40">
          {isHindi ? "एनसीईआरटी संकलन" : "NCERT Curriculums"}
        </span>
      </div>

      {/* Title Card layout - Match design precisely! */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[24px] border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden space-y-4 shadow-[0_12px_45px_rgba(5,150,105,0.02)]">
        {/* Decorative circle backdrop */}
        <div className="absolute top-[-20%] right-[-10%] w-60 h-60 bg-emerald-500/5 rounded-full pointer-events-none blur-xl" />

        {/* Rounded book icon container */}
        <div className="w-14 h-14 mx-auto rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <BookOpen className="h-6 w-6" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isHindi
              ? "NCERT पुस्तकें (कक्षा 5 - 12)"
              : "NCERT Textbooks (Class 5 - 12)"}
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-sans">
            {isHindi
              ? "विषय-वार MCQ और Mock Test अभ्यास के लिए अपनी कक्षा का चयन करें"
              : "Select your standard to access customized bilingual questions and quick practice tests"}
          </p>
        </div>
      </div>

      {!selectedClassNum ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-mono">
              {isHindi
                ? "NCERT कक्षाएं (CLASS-WISE STUDY)"
                : "NCERT Classes (Class-wise Study)"}
            </h3>
            <span className="h-px bg-slate-200 dark:bg-slate-800/80 flex-1" />
          </div>

          {/* 8 rounded class cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {NCERT_CLASSES_DATA.map((cls) => (
              <div
                key={cls.number}
                onClick={() => setSelectedClassNum(cls.number)}
                className={`flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 hover:border-emerald-500/35 rounded-2xl cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-all active:scale-[0.98] shadow-sm hover:shadow-[0_8px_25px_rgba(5,150,105,0.03)] hover:scale-[1.01] hover:shadow-emerald-500/5 group`}
              >
                <div className="flex items-center gap-4">
                  {/* Thick solid colored class circle */}
                  <div
                    className={`w-12 h-12 rounded-full ${cls.color} text-white flex items-center justify-center text-sm font-black shadow-md flex-shrink-0`}
                  >
                    {cls.number}
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-extrabold text-slate-905 dark:text-white block group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {isHindi ? cls.nameHi : cls.nameEn}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {isHindi
                        ? `कक्षा ${cls.number} के अध्याय-वार प्रश्न संकलित`
                        : `Bilingual questions for Class ${cls.number}`}
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-55 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group-hover:bg-emerald-500/10 flex items-center justify-center transition-all group-hover:scale-100">
                  <ChevronRight className="h-4 w-4 text-slate-405 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-scale-up">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-mono">
              {isHindi
                ? `${selectedClassData?.nameHi} ➔ विषय का चयन करें`
                : `${selectedClassData?.nameEn} ➔ Select Study Subject`}
            </h3>
            <span className="h-px bg-slate-200 dark:bg-slate-800/80 flex-1" />
            <button
              onClick={() => setSelectedClassNum(null)}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-extrabold cursor-pointer"
            >
              {isHindi ? "कक्षाएं बदलें" : "Change Class"}
            </button>
          </div>

          {/* Sub-folder topics / subjects selection cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectedClassData?.subjects.map((sub, idx) => (
              <div
                key={idx}
                onClick={() => onSelectNcertClass(selectedClassNum, sub.id)}
                className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-[20px] hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all cursor-pointer group active:scale-95 text-left flex flex-col justify-between h-[150px] overflow-hidden z-0"
              >
                {/* Glow Background Effect inside card */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-605 text-xl flex items-center justify-center group-hover:scale-100 transition-transform">
                    {sub.icon}
                  </div>
                  <span className="text-[9px] bg-emerald-50 dark:bg-emerald-950/25 text-emerald-600 dark:text-emerald-400 font-extrabold px-1.5 py-0.5 rounded uppercase font-mono border border-emerald-200/40">
                    {isHindi ? "अध्याय टेस्ट" : "Topic Test"}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                    {sub.id}
                  </h4>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white line-clamp-1 mt-0.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {isHindi ? sub.nameHi : sub.nameEn}
                  </h3>
                  <p className="text-[10px] text-slate-405 dark:text-slate-400 mt-1">
                    {isHindi
                      ? "संशोधित पाठ्यक्रम 2025-26 के अनुसार"
                      : "Aligned with revised 2025-26 NCERT rules"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick random mock practice button for this NCERT class */}
          <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 rounded-[24px] p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-800/20 shadow-xl">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="inline-flex items-center gap-1 bg-emerald-500/25 border border-emerald-500/40 px-2.5 py-1 rounded-full text-[9px] font-mono font-extrabold text-emerald-400 uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5 fill-emerald-400/20" />
                {isHindi ? "त्वरित मॉक टेस्ट" : "BILINGUAL MASTER MOCK"}
              </span>
              <h3 className="text-base font-extrabold">
                {isHindi
                  ? `कक्षा ${selectedClassNum} संयुक्त मॉक टेस्ट शुरू करें`
                  : `Start Standard Class ${selectedClassNum} Combined Practice Mock`}
              </h3>
              <p className="text-xs text-slate-300 leading-normal max-w-lg">
                {isHindi
                  ? `इतिहास, विज्ञान, और भूगोल विषयों से यादृच्छिक प्रश्नों का तीव्र अभ्यास`
                  : `A fast timed training slot focusing on mixed GK, math and science topics for Standard ${selectedClassNum}.`}
              </p>
            </div>
            <button
              onClick={() => onSelectNcertClass(selectedClassNum)}
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition transform active:scale-95 whitespace-nowrap cursor-pointer"
            >
              {isHindi ? "ऑल-इन-वन टेस्ट शुरू करें ➔" : "Start Full Test ➔"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
