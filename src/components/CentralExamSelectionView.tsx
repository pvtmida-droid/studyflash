import { Building, Award, Sparkles, ArrowLeft, Layers } from "lucide-react";
import { motion } from "motion/react";

interface CentralExamSelectionViewProps {
  isHindi: boolean;
  onBack: () => void;
  onSelectFolder: (categoryName: string, folderId: string) => void;
}

const EXAM_FOLDERS = [
  {
    id: "SSC CGL",
    categoryId: "ssc",
    nameEn: "SSC CGL",
    nameHi: "एसएससी CGL",
    descEn: "Combined Graduate Level",
    descHi: "संयुक्त स्नातक स्तरीय",
    icon: <img src="https://www.typingexam.in/assets/logos/ssc.webp" alt="SSC" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />,
  },
  {
    id: "SSC CHSL",
    categoryId: "ssc",
    nameEn: "SSC CHSL",
    nameHi: "एसएससी CHSL",
    descEn: "10+2 Higher Secondary",
    descHi: "संयुक्त उच्चतर माध्यमिक",
    icon: <img src="https://www.typingexam.in/assets/logos/ssc.webp" alt="SSC" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />,
  },
  {
    id: "SSC GD",
    categoryId: "ssc",
    nameEn: "SSC GD Constable",
    nameHi: "एसएससी GD कांस्टेबल",
    descEn: "General Duty Constable",
    descHi: "सामान्य ड्यूटी आरक्षी",
    icon: <img src="https://www.typingexam.in/assets/logos/ssc.webp" alt="SSC" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />,
  },
  {
    id: "SSC MTS",
    categoryId: "ssc",
    nameEn: "SSC MTS",
    nameHi: "एसएससी MTS",
    descEn: "Multi-Tasking Staff",
    descHi: "मल्टी-टास्किंग स्टाफ",
    icon: <img src="https://www.typingexam.in/assets/logos/ssc.webp" alt="SSC" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />,
  },
  {
    id: "IBPS PO",
    categoryId: "ibps",
    nameEn: "IBPS PO",
    nameHi: "आईबीपीएस PO",
    descEn: "Probationary Officer exam",
    descHi: "प्रोबेशनरी ऑफिसर परीक्षा",
    icon: <Award className="h-6 w-6" />,
  },
  {
    id: "IBPS Clerk",
    categoryId: "ibps",
    nameEn: "IBPS Clerk",
    nameHi: "आईबीपीएस क्लर्क",
    descEn: "Public Sector Banks Clerk",
    descHi: "सार्वजनिक क्षेत्र क्लर्क",
    icon: <Award className="h-6 w-6" />,
  },
  {
    id: "IBPS SO",
    categoryId: "ibps",
    nameEn: "IBPS SO",
    nameHi: "आईबीपीएस SO",
    descEn: "Specialist Officer",
    descHi: "स्पेशलिस्ट ऑफिसर",
    icon: <Award className="h-6 w-6" />,
  },
  {
    id: "RRB NTPC",
    categoryId: "railway",
    nameEn: "RRB NTPC",
    nameHi: "आरआरबी NTPC",
    descEn: "Non-Technical Categories",
    descHi: "गैर-तकनीकी श्रेणियां",
    icon: <img src="https://www.typingexam.in/assets/logos/rrb.webp" alt="RRB" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />,
  },
  {
    id: "RRB Group D",
    categoryId: "railway",
    nameEn: "RRB Group D",
    nameHi: "आरआरबी ग्रुप डी",
    descEn: "Track Maintainer",
    descHi: "ट्रैक मेंटेनर",
    icon: <img src="https://www.typingexam.in/assets/logos/rrb.webp" alt="RRB" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />,
  },
  {
    id: "RRB ALP",
    categoryId: "railway",
    nameEn: "RRB ALP",
    nameHi: "आरआरबी एएलपी",
    descEn: "Assistant Loco Pilot",
    descHi: "सहायक लोको पायलट",
    icon: <img src="https://www.typingexam.in/assets/logos/rrb.webp" alt="RRB" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />,
  },
];

const CATEGORY_META: Record<string, { nameEn: string; nameHi: string }> = {
  ssc: { nameEn: "SSC Exams", nameHi: "एसएससी परीक्षाएं" },
  ibps: { nameEn: "Banking Exams", nameHi: "बैंकिंग परीक्षाएं" },
  railway: { nameEn: "Railway Exams", nameHi: "रेलवे परीक्षाएं" },
};

export default function CentralExamSelectionView({
  isHindi,
  onBack,
  onSelectFolder,
}: CentralExamSelectionViewProps) {
  // Group folders by categoryId
  const groupedFolders = EXAM_FOLDERS.reduce(
    (acc, folder) => {
      if (!acc[folder.categoryId]) acc[folder.categoryId] = [];
      acc[folder.categoryId].push(folder);
      return acc;
    },
    {} as Record<string, typeof EXAM_FOLDERS>,
  );

  return (
    <div
      className="space-y-8 animate-fade-in"
      id="central-exam-selection-container"
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
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/25 text-emerald-700 dark:text-emerald-400 border border-emerald-200/40 rounded-full text-[10px] font-extrabold uppercase tracking-wider font-mono">
          <Layers className="h-3.5 w-3.5" />
          <span>
            {isHindi ? "सेंट्रल परीक्षा पोर्टल" : "Central Exam Portal"}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/85 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden space-y-8">
        {/* Banner Decoration Subtle Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Heading Section */}
        <div className="space-y-1.5 text-left relative z-10">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isHindi ? "परीक्षा श्रेणी चुनें" : "Select Exam Category"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHindi
              ? "नवीनतम पाठ्यक्रम पर आधारित विभिन्न केंद्रीय परीक्षाओं के लिए फोल्डर्स चुनें"
              : "Choose highly structured subfolders for exams based on the latest central syllabi"}
          </p>
        </div>

        <div className="space-y-8 relative z-10">
          {Object.entries(groupedFolders).map(([categoryId, folders]) => {
            const meta = CATEGORY_META[categoryId];
            return (
              <div key={categoryId} className="space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block"></span>
                  {isHindi ? meta?.nameHi : meta?.nameEn}
                </h3>

                {/* Grid of folders matching State Police style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {folders.map((folder, idx) => (
                    <motion.div
                      key={folder.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                      onClick={() =>
                        onSelectFolder(folder.categoryId, folder.id)
                      }
                      className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] dark:hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 group cursor-pointer overflow-hidden z-0 min-h-[140px]"
                    >
                      {/* Glow Background Effect inside card */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>

                      <div className="flex items-start gap-4 z-10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 group-hover:text-amber-500 group-hover:scale-110 shadow-sm transition-transform duration-300">
                          {folder.icon}
                        </div>

                        <div className="space-y-1 text-left min-w-0 flex-1">
                          <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                            {isHindi ? folder.nameHi : folder.nameEn}
                          </h4>
                          <span className="block text-[10px] text-slate-500 font-medium leading-relaxed">
                            {isHindi ? folder.descHi : folder.descEn}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectFolder(folder.categoryId, folder.id);
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
