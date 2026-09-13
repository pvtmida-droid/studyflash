import { ArrowLeft, Newspaper, ChevronRight } from "lucide-react";

interface CurrentAffairsSelectionViewProps {
  isHindi: boolean;
  onBack: () => void;
  onSelectPeriod: (period: string) => void;
}

export default function CurrentAffairsSelectionView({
  isHindi,
  onBack,
  onSelectPeriod,
}: CurrentAffairsSelectionViewProps) {
  const period = {
    id: "Current Affairs 2026",
    titleEn: "Current Affairs 2026",
    titleHi: "करेंट अफेयर्स 2026",
    descEn: "Complete National & International Current Affairs 2026 MCQs",
    descHi: "वर्ष 2026 की संपूर्ण राष्ट्रीय एवं अंतर्राष्ट्रीय करेंट अफेयर्स प्रश्न संग्रह",
    badgeEn: "LATEST 2026",
    badgeHi: "नवीनतम 2026",
  };

  return (
    <div
      className="space-y-8 animate-fade-in"
      id="current-affairs-selection-view"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800/80 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{isHindi ? "मुख्य पृष्ठ" : "Back to Home"}</span>
        </button>
        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
          {isHindi ? "करंट अफेयर्स" : "CURRENT AFFAIRS"}
        </span>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 md:p-10 rounded-3xl shadow-sm text-center space-y-8 relative overflow-hidden">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-[#5C0632] dark:text-rose-400 tracking-tight">
            {isHindi ? "करेंट अफेयर्स 2026" : "Current Affairs 2026"}
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono font-bold">
            {isHindi ? "अपनी अभ्यास श्रेणी चुनें" : "Choose study category"}
          </p>
        </div>

        <div className="max-w-md mx-auto pt-2">
          <div
            onClick={() => onSelectPeriod(period.titleEn)}
            className="relative group bg-white dark:bg-slate-950 border border-slate-200 hover:border-amber-400 dark:border-slate-800/80 dark:hover:border-amber-600 rounded-3xl p-8 flex flex-col items-center justify-center space-y-5 cursor-pointer hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] dark:hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:scale-[1.02] active:scale-98 transition-all duration-300 min-h-[220px] overflow-hidden z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>

            <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40">
              {isHindi ? period.badgeHi : period.badgeEn}
            </span>

            <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900/40 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <Newspaper className="h-7 w-7 text-rose-500" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {period.titleEn}
              </h3>
              <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 font-sans">
                {period.titleHi}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs leading-relaxed font-sans pt-1">
                {isHindi ? period.descHi : period.descEn}
              </p>
            </div>

            <button
              className="w-full mt-2 bg-slate-950 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold text-xs py-3 rounded-xl shadow transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{isHindi ? "प्रैक्टिस शुरू करें" : "Start Practice"}</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
