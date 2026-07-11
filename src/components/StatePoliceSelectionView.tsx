import { ArrowLeft, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface StatePoliceSelectionViewProps {
  isHindi: boolean;
  onBack: () => void;
  onSelectState: (stateId: string) => void;
}

const STATE_POLICE_EXAMS = [
  {
    id: "up-police",
    nameEn: "UP Police",
    nameHi: "यूपी पुलिस",
    descEn: "Constable, SI & ASI Exams",
    descHi: "कांस्टेबल, एसआई और एएसआई परीक्षा",
    icon: <img src="https://www.typingexam.in/assets/logos/up-police.webp" alt="UP Police" className="h-8 w-8 object-contain" referrerPolicy="no-referrer" />,
  },
  {
    id: "bihar-police",
    nameEn: "Bihar Police",
    nameHi: "बिहार पुलिस",
    descEn: "Constable, SI & Fireman",
    descHi: "कांस्टेबल, एसआई और फायरमैन",
    icon: "🚨",
  },
  {
    id: "rajasthan-police",
    nameEn: "Rajasthan Police",
    nameHi: "राजस्थान पुलिस",
    descEn: "Constable & SI Exams",
    descHi: "कांस्टेबल और एसआई परीक्षा",
    icon: "🐪",
  },
  {
    id: "mp-police",
    nameEn: "MP Police",
    nameHi: "एमपी पुलिस",
    descEn: "Constable & SI Exams",
    descHi: "कांस्टेबल और एसआई परीक्षा",
    icon: "🛡️",
  },
  {
    id: "delhi-police",
    nameEn: "Delhi Police",
    nameHi: "दिल्ली पुलिस",
    descEn: "Constable, Head Constable & SI Exam",
    descHi: "कांस्टेबल, हेड कांस्टेबल और एसआई परीक्षा",
    icon: "🏛️",
  },
  {
    id: "haryana-police",
    nameEn: "Haryana Police",
    nameHi: "हरियाणा पुलिस",
    descEn: "Constable & SI Exams",
    descHi: "कांस्टेबल और एसआई परीक्षा",
    icon: "🚓",
  },
];

export default function StatePoliceSelectionView({
  isHindi,
  onBack,
  onSelectState,
}: StatePoliceSelectionViewProps) {
  return (
    <div
      className="space-y-8 animate-fade-in"
      id="state-police-selection-container"
    >
      {/* Top action row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800/80 transition active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{isHindi ? "मुख्य पृष्ठ" : "Back to Home"}</span>
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 dark:bg-rose-950/25 text-rose-700 dark:text-rose-400 border border-rose-200/40 rounded-full text-[10px] font-extrabold uppercase tracking-wider font-mono">
          <Shield className="h-3.5 w-3.5" />
          <span>{isHindi ? "राज्य पुलिस परीक्षा" : "State Police Exams"}</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/85 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden space-y-8">
        {/* Banner Decoration Subtle Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Heading Section */}
        <div className="space-y-1.5 text-left relative z-10">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isHindi ? "राज्य चुनें" : "Select State"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHindi
              ? "विभिन्न राज्यों की पुलिस परीक्षाओं के लिए मॉक टेस्ट और स्टडी मटेरियल"
              : "Mock tests and study material for various state police exams"}
          </p>
        </div>

        {/* Grid of states */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
          {STATE_POLICE_EXAMS.map((state, idx) => (
            <motion.div
              key={state.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2, delay: idx * 0.03 }}
              onClick={() => onSelectState(state.id)}
              className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] dark:hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 group cursor-pointer overflow-hidden z-0 min-h-[140px]"
            >
              {/* Glow Background Effect inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>

              <div className="flex items-start gap-4 z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 text-2xl group-hover:scale-110 shadow-sm transition-transform duration-300">
                  {state.icon}
                </div>

                <div className="space-y-1 text-left min-w-0 flex-1">
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                    {isHindi ? state.nameHi : state.nameEn}
                  </h4>
                  <span className="block text-[10px] text-slate-500 font-medium leading-relaxed">
                    {isHindi ? state.descHi : state.descEn}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-end z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectState(state.id);
                  }}
                  className="px-4 py-2 text-[11px] font-black tracking-tight text-slate-700 hover:text-white dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-[#4169E1] dark:hover:bg-[#4169E1] border border-slate-100 dark:border-slate-800 rounded-xl transition-all duration-300 flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
                >
                  <span>{isHindi ? "शुरू करें" : "Start"}</span>
                  <span>▶</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
