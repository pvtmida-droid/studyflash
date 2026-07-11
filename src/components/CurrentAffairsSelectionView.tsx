import { ArrowLeft, Calendar, Newspaper, Clock } from "lucide-react";

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
  const PERIODS = [
    {
      id: "Today",
      titleEn: "Today",
      titleHi: "आज की करेंट अफेयर्स",
      icon: <Clock className="h-6 w-6 text-rose-500" />,
    },
    {
      id: "6 Month",
      titleEn: "6 Month",
      titleHi: "पिछले 6 महीने",
      icon: <Calendar className="h-6 w-6 text-rose-500" />,
    },
    {
      id: "1 Year",
      titleEn: "1 Year",
      titleHi: "पिछले 1 साल",
      icon: <Newspaper className="h-6 w-6 text-rose-500" />,
    },
  ];

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
        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-705 dark:text-emerald-300 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
          {isHindi ? "करंट अफेयर्स" : "CURRENT AFFAIRS"}
        </span>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-900 p-6 md:p-10 rounded-3xl shadow-sm text-center space-y-8 relative overflow-hidden">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-[#5C0632] dark:text-rose-400 tracking-tight">
            Select Period
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono font-bold">
            {isHindi ? "अपनी अभ्यास अवधि चुनें" : "Choose study range"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-2">
          {PERIODS.map((period) => (
            <div
              key={period.id}
              onClick={() => onSelectPeriod(period.titleEn)}
              className="relative group bg-white dark:bg-slate-950 border border-slate-100 hover:border-amber-400 dark:border-slate-800/80 dark:hover:border-amber-600 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] dark:hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-[1.03] active:scale-98 transition-all duration-300 min-h-[190px] overflow-hidden z-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>

              <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform">
                {period.icon}
              </div>

              <div className="text-center space-y-1">
                <span className="block text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  {period.titleEn}
                </span>
                <span className="block text-xs font-semibold text-rose-600 dark:text-rose-400 font-sans">
                  {period.titleHi}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
