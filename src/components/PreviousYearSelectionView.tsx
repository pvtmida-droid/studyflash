import { useState } from "react";
import {
  Building,
  Award,
  Sparkles,
  GraduationCap,
  Shield,
  ArrowLeft,
  History,
  FolderOpen,
} from "lucide-react";
import { motion } from "motion/react";
import { MockTest } from "../types";

interface PreviousYearSelectionViewProps {
  isHindi: boolean;
  onBack: () => void;
  mockTests: MockTest[];
  onStartMockTest: (test: MockTest) => void;
}

const EXAM_FOLDERS = [
  {
    id: "SSC CGL PYQ",
    categoryId: "ssc-pyq",
    nameEn: "SSC CGL",
    nameHi: "एसएससी CGL",
    descEn: "Previous 5 years tier 1 & 2",
    descHi: "पिछले 5 वर्षों के प्रश्न पत्र",
    icon: <img src="https://www.typingexam.in/assets/logos/ssc.webp" alt="SSC" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />,
  },
  {
    id: "SSC CHSL PYQ",
    categoryId: "ssc-pyq",
    nameEn: "SSC CHSL",
    nameHi: "एसएससी CHSL",
    descEn: "Previous 5 years",
    descHi: "पिछले 5 वर्षों के प्रश्न पत्र",
    icon: <img src="https://www.typingexam.in/assets/logos/ssc.webp" alt="SSC" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />,
  },
  {
    id: "SSC GD PYQ",
    categoryId: "ssc-pyq",
    nameEn: "SSC GD",
    nameHi: "एसएससी GD",
    descEn: "Previous Papers",
    descHi: "पिछले वर्ष के प्रश्न पत्र",
    icon: <img src="https://www.typingexam.in/assets/logos/ssc.webp" alt="SSC" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />,
  },
  {
    id: "SSC MTS PYQ",
    categoryId: "ssc-pyq",
    nameEn: "SSC MTS",
    nameHi: "एसएससी MTS",
    descEn: "Previous Papers",
    descHi: "पिछले वर्ष के प्रश्न पत्र",
    icon: <img src="https://www.typingexam.in/assets/logos/ssc.webp" alt="SSC" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />,
  },
  {
    id: "IBPS PO PYQ",
    categoryId: "banking-pyq",
    nameEn: "IBPS PO",
    nameHi: "आईबीपीएस PO",
    descEn: "Previous 5 yrs Pre & Mains",
    descHi: "पिछले 5 वर्षों के प्री/मेन्स",
    icon: <Award className="h-6 w-6" />,
  },
  {
    id: "SBI Clerk PYQ",
    categoryId: "banking-pyq",
    nameEn: "SBI Clerk",
    nameHi: "एसबीआई क्लर्क ",
    descEn: "Previous 5 years",
    descHi: "पिछले 5 वर्षों के प्रश्न पत्र",
    icon: <Award className="h-6 w-6" />,
  },
  {
    id: "RRB NTPC PYQ",
    categoryId: "railway-pyq",
    nameEn: "RRB NTPC 2025",
    nameHi: "आरआरबी NTPC 2025",
    descEn: "CBT 1 & 2 Papers",
    descHi: "CBT 1 और 2 पेपर",
    icon: <img src="https://www.typingexam.in/assets/logos/rrb.webp" alt="RRB" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />,
  },
  {
    id: "RRB Group D PYQ",
    categoryId: "railway-pyq",
    nameEn: "RRB Group D",
    nameHi: "आरआरबी ग्रुप डी",
    descEn: "All shift papers",
    descHi: "सभी शिफ्ट के पेपर",
    icon: <img src="https://www.typingexam.in/assets/logos/rrb.webp" alt="RRB" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />,
  },
  {
    id: "RRB ALP PYQ",
    categoryId: "railway-pyq",
    nameEn: "RRB ALP",
    nameHi: "आरआरबी एएलपी",
    descEn: "CBT 1 & 2 Papers",
    descHi: "CBT 1 और 2 पेपर",
    icon: <img src="https://www.typingexam.in/assets/logos/rrb.webp" alt="RRB" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />,
  },
  {
    id: "UPSC Prelims PYQ",
    categoryId: "upsc-pyq",
    nameEn: "UPSC Prelims (Last 10 Yrs)",
    nameHi: "यूपीएससी (पिछले 10 वर्ष)",
    descEn: "CSAT & General Studies",
    descHi: "सीसैट और सामान्य अध्ययन",
    icon: <GraduationCap className="h-6 w-6" />,
  },
  {
    id: "CDS NDA PYQ",
    categoryId: "upsc-pyq",
    nameEn: "CDS / NDA PYQ",
    nameHi: "सीडीएस / एनडीए PYQ",
    descEn: "Last 5 Years Papers",
    descHi: "पिछले 5 वर्षों के पेपर",
    icon: <GraduationCap className="h-6 w-6" />,
  },
  {
    id: "UP Police PYQ",
    categoryId: "police-pyq",
    nameEn: "UP Police Constable",
    nameHi: "यूपी पुलिस कांस्टेबल",
    descEn: "Previous Papers",
    descHi: "पिछले प्रश्न पत्र",
    icon: <img src="https://www.typingexam.in/assets/logos/up-police.webp" alt="UP Police" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />,
  },
  {
    id: "Bihar Police PYQ",
    categoryId: "police-pyq",
    nameEn: "Bihar Police SI/Constable",
    nameHi: "बिहार पुलिस",
    descEn: "Previous Papers",
    descHi: "पिछले प्रश्न पत्र",
    icon: <Shield className="h-6 w-6" />,
  },
];

const CATEGORY_META: Record<string, { nameEn: string; nameHi: string }> = {
  "ssc-pyq": { nameEn: "SSC PYQ", nameHi: "एसएससी PYQ" },
  "banking-pyq": { nameEn: "Banking PYQ", nameHi: "बैंकिंग PYQ" },
  "railway-pyq": { nameEn: "Railway PYQ", nameHi: "रेलवे PYQ" },
  "upsc-pyq": { nameEn: "UPSC PYQ", nameHi: "यूपीएससी PYQ" },
  "police-pyq": { nameEn: "Police PYQ", nameHi: "पुलिस PYQ" },
};

export default function PreviousYearSelectionView({
  isHindi,
  onBack,
  mockTests,
  onStartMockTest,
}: PreviousYearSelectionViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<typeof EXAM_FOLDERS[0] | null>(null);

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
      id="previous-year-selection-container"
    >
      {/* Top action row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => selectedFolder ? setSelectedFolder(null) : selectedCategory ? setSelectedCategory(null) : onBack()}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800/80 transition active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{isHindi ? "पीछे" : "Back"}</span>
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/25 text-amber-700 dark:text-amber-400 border border-amber-200/40 rounded-full text-[10px] font-extrabold uppercase tracking-wider font-mono">
          <History className="h-3.5 w-3.5" />
          <span>
            {isHindi
              ? "पिछले वर्ष के प्रश्न पत्र (PYQ)"
              : "Previous Year Papers (PYQ)"}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/85 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden space-y-8">
        {/* Banner Decoration Subtle Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Heading Section */}
        <div className="space-y-1.5 text-left relative z-10">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isHindi 
              ? (selectedFolder ? "प्रश्न पत्र चुनें" : selectedCategory ? CATEGORY_META[selectedCategory]?.nameHi : "PYQ श्रेणी चुनें") 
              : (selectedFolder ? "Select Question Paper" : selectedCategory ? CATEGORY_META[selectedCategory]?.nameEn : "Select PYQ Category")}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHindi
              ? (selectedFolder ? "नीचे दिए गए प्रश्न पत्रों में से चुनें" : selectedCategory ? "नीचे दी गई परीक्षाओं में से चुनें" : "विभिन्न परीक्षाओं के लिए पिछले वर्षों के प्रश्न पत्रों का अभ्यास करें")
              : (selectedFolder ? "Select from the question papers below" : selectedCategory ? "Select from the exams below" : "Practice previous years' question papers for various exams")}
          </p>
        </div>

        <div className="relative z-10">
          {!selectedCategory ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Object.entries(CATEGORY_META).map(([categoryId, meta], idx) => {
                 const folderCount = groupedFolders[categoryId]?.length || 0;
                 if (folderCount === 0) return null;
                 
                 // Get the icon from the first folder as a representative icon
                 const representativeIcon = groupedFolders[categoryId][0]?.icon;
                 
                 return (
                   <motion.div
                     key={categoryId}
                     initial={{ opacity: 0, scale: 0.98 }}
                     animate={{ opacity: 1, scale: 1 }}
                     whileHover={{ scale: 1.03 }}
                     transition={{ duration: 0.2, delay: idx * 0.03 }}
                     onClick={() => setSelectedCategory(categoryId)}
                     className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] dark:hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 group cursor-pointer overflow-hidden z-0 min-h-[140px]"
                   >
                     {/* Glow Background Effect inside card */}
                     <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>
                     
                     <div className="flex items-start gap-4 z-10">
                       <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 text-amber-500 group-hover:scale-110 shadow-sm transition-transform duration-300">
                         {representativeIcon || <FolderOpen className="h-6 w-6" />}
                       </div>
                       
                       <div className="space-y-1 text-left min-w-0 flex-1">
                         <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                           {isHindi ? meta.nameHi : meta.nameEn}
                         </h4>
                         <span className="block text-[10px] text-slate-500 font-medium leading-relaxed">
                           {folderCount} {isHindi ? "परीक्षाएं" : "Exams"}
                         </span>
                       </div>
                     </div>
                     
                     <div className="mt-4 flex justify-end z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCategory(categoryId);
                          }}
                          className="px-4 py-2 text-[11px] font-black tracking-tight text-slate-700 hover:text-white dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-[#4169E1] dark:hover:bg-[#4169E1] border border-slate-100 dark:border-slate-800 rounded-xl transition-all duration-300 flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
                        >
                          <span>{isHindi ? "खोलें" : "Open"}</span>
                          <span>▶</span>
                        </button>
                      </div>
                   </motion.div>
                 );
              })}
            </div>
          ) : !selectedFolder ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {groupedFolders[selectedCategory]?.map((folder, idx) => (
                <motion.div
                  key={folder.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  onClick={() => setSelectedFolder(folder)}
                  className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] dark:hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 group cursor-pointer overflow-hidden z-0 min-h-[140px]"
                >
                  {/* Glow Background Effect inside card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>

                  <div className="flex items-start gap-4 z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 text-amber-500 group-hover:scale-110 shadow-sm transition-transform duration-300">
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
                        setSelectedFolder(folder);
                      }}
                      className="px-4 py-2 text-[11px] font-black tracking-tight text-slate-700 hover:text-white dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-[#4169E1] dark:hover:bg-[#4169E1] border border-slate-100 dark:border-slate-800 rounded-xl transition-all duration-300 flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
                    >
                      <span>{isHindi ? "खोलें" : "Open"}</span>
                      <span>▶</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {mockTests.filter(t => t.isPreviousYear && t.exam === selectedFolder.id).length > 0 ? mockTests.filter(t => t.isPreviousYear && t.exam === selectedFolder.id).map((paper, idx) => (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  onClick={() => onStartMockTest(paper)}
                  className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] dark:hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 group cursor-pointer overflow-hidden z-0 min-h-[140px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>
                  
                  <div className="flex items-start gap-4 z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 text-amber-500 group-hover:scale-110 shadow-sm transition-transform duration-300">
                      <History className="h-6 w-6" />
                    </div>

                    <div className="space-y-1 text-left min-w-0 flex-1">
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                        {isHindi ? paper.titleHi : paper.titleEn}
                      </h4>
                      <span className="block text-[10px] text-slate-500 font-medium leading-relaxed">
                        {paper.totalQuestions} {isHindi ? "प्रश्न" : "Questions"} • {paper.duration} {isHindi ? "मिनट" : "Minutes"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartMockTest(paper);
                      }}
                      className="px-4 py-2 text-[11px] font-black tracking-tight text-slate-700 hover:text-white dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-[#4169E1] dark:hover:bg-[#4169E1] border border-slate-100 dark:border-slate-800 rounded-xl transition-all duration-300 flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
                    >
                      <span>{isHindi ? "शुरू करें" : "Start"}</span>
                      <span>▶</span>
                    </button>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-full py-12 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {isHindi ? "अभी तक कोई प्रश्न पत्र नहीं जोड़ा गया है।" : "No question papers added yet."}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2 font-mono">
                    {isHindi ? "एडमिन पैनल से प्रश्न पत्र अपलोड करें।" : "Upload question papers from the admin panel."}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
