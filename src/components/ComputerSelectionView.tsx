import {
  ArrowLeft,
  MonitorPlay,
  Database,
  Globe2,
  Code2,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface ComputerSelectionViewProps {
  isHindi: boolean;
  onBack: () => void;
  onSelectCourse: (courseKey: string) => void;
}

const COMPUTER_COURSES = [
  {
    key: "FUNDAMENTALS_OS",
    title: "1. Fundamentals & OS",
    subtitleEn: "Computer Fundamentals & Operating Systems",
    subtitleHi: "कंप्यूटर बुनियादी सिद्धांत और ऑपरेटिंग सिस्टम",
    badgeLabelEn: "CORE BASICS",
    badgeLabelHi: "मूल बातें",
    badgeColor:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40",
    modulesCount: 6,
    mcqsCount: 500,
    icon: <MonitorPlay className="h-5 w-5 text-blue-500" />,
    iconBg:
      "bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30",
    topics: [
      "Introduction to Computers",
      "Hardware vs Software",
      "Input & Output Devices",
      "Operating Systems (Windows, DOS, Unix)",
    ],
  },
  {
    key: "MS_OFFICE",
    title: "2. MS Office Suite",
    subtitleEn: "Word, Excel, PowerPoint, Access",
    subtitleHi: "वर्ड, एक्सेल, पॉवरपॉइंट, एक्सेस",
    badgeLabelEn: "PRODUCTIVITY",
    badgeLabelHi: "उत्पादकता",
    badgeColor:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40",
    modulesCount: 8,
    mcqsCount: 600,
    icon: <Database className="h-5 w-5 text-emerald-500" />,
    iconBg:
      "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30",
    topics: [
      "Microsoft Word basics & shortcuts",
      "Microsoft Excel formulas & charts",
      "Microsoft PowerPoint slides & design",
      "Database access & tables",
    ],
  },
  {
    key: "INTERNET_NETWORKING",
    title: "3. Internet & IT Apps",
    subtitleEn: "Internet, Emails, Networking, DBMS & Multimedia",
    subtitleHi: "इंटरनेट, ईमेल, नेटवर्किंग, डेटाबेस और मल्टीमीडिया",
    badgeLabelEn: "INTERMEDIATE",
    badgeLabelHi: "मध्यम स्तर",
    badgeColor:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40",
    modulesCount: 12,
    mcqsCount: 800,
    icon: <Globe2 className="h-5 w-5 text-indigo-500" />,
    iconBg:
      "bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30",
    topics: [
      "Internet & Email Applications",
      "Networking Basics (LAN, WAN, Protocols)",
      "Database Management (SQL)",
      "Multimedia & DTP (Photoshop, Corel Draw)",
    ],
  },
  {
    key: "EXAM_MIX",
    title: "4. Exam Oriented Mix",
    subtitleEn: "Exam Targeted Combined Computer Questions",
    subtitleHi: "परीक्षा उन्मुख कंप्यूटर मिश्रित प्रश्न संग्रह",
    badgeLabelEn: "EXAM SPECIFIC",
    badgeLabelHi: "परीक्षा विशेष",
    badgeColor:
      "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-300 dark:border-rose-900/40",
    modulesCount: 10,
    mcqsCount: 1200,
    icon: <Code2 className="h-5 w-5 text-orange-500" />,
    iconBg:
      "bg-orange-50 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-900/30",
    topics: [
      "Most repeated computer MCQs",
      "Previous Year paper mixes",
      "General informatics practices",
    ],
  },
];

export default function ComputerSelectionView({
  isHindi,
  onBack,
  onSelectCourse,
}: ComputerSelectionViewProps) {
  return (
    <div
      className="space-y-8 animate-fade-in"
      id="computer-selection-container"
    >
      {/* Back link row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800/80 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{isHindi ? "मुख्य पृष्ठ" : "Back to Home"}</span>
        </button>
        <span className="text-[10px] bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
          {isHindi ? "कंप्यूटर शिक्षा" : "Computer Courses"}
        </span>
      </div>

      {/* Header section match design */}
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          💻{" "}
          {isHindi ? "कंप्यूटर कोर्स श्रेणी चुनें" : "Select Course Category"}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
          {isHindi
            ? "कंप्यूटर डिप्लोमा और व्यावसायिक प्रमाणपत्र परीक्षाओं के लिए नवीनतम एमसीक्यू और पाठ्यक्रम संग्रह"
            : "Explore structured lessons, model test questions, and exam mock sheets for prominent national IT diplomas."}
        </p>
      </div>

      {/* Grid structure matching screenshot closely */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {COMPUTER_COURSES.map((course) => (
          <div
            key={course.key}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] dark:hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 relative group min-h-[380px] overflow-hidden z-0"
          >
            {/* Glow Background Effect inside card */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>

            {/* Top row with custom icon boundary and Badge */}
            <div className="flex items-center justify-between">
              {/* Rounded custom icon container */}
              <div
                className={`w-10 h-10 rounded-xl ${course.iconBg} flex items-center justify-center shadow-inner`}
              >
                {course.icon}
              </div>
              {/* Mini Badge */}
              <span
                className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${course.badgeColor}`}
              >
                {isHindi ? course.badgeLabelHi : course.badgeLabelEn}
              </span>
            </div>

            {/* Core Titles */}
            <div className="space-y-1.5 mt-5 text-left flex-1">
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                {course.title}
              </h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed font-sans min-h-[36px]">
                {isHindi ? course.subtitleHi : course.subtitleEn}
              </p>

              {/* Course study elements */}
              <div className="pt-3 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">
                  Core Areas:
                </span>
                <ul className="space-y-1 text-left">
                  {course.topics.slice(0, 3).map((topic, i) => (
                    <li
                      key={i}
                      className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate font-sans"
                    >
                      <span className="text-blue-500">•</span> {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Gray box with dual statistics layout from image */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-2xl p-4 grid grid-cols-2 gap-2 text-center mt-5">
              <div className="border-r border-slate-200/60 dark:border-slate-800/80 pr-1 text-left pl-1">
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">
                  MODULES
                </span>
                <span className="block text-lg font-black text-slate-800 dark:text-white mt-1">
                  {course.modulesCount}
                </span>
              </div>
              <div className="text-left pl-3">
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">
                  MCQS
                </span>
                <span className="block text-lg font-black text-slate-805 dark:text-white mt-1">
                  {course.mcqsCount}+
                </span>
              </div>
            </div>

            {/* Dark button styled button */}
            <button
              onClick={() => onSelectCourse(course.key)}
              className="w-full mt-4 bg-slate-950 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold text-xs py-3 rounded-xl shadow transition duration-200 flex items-center justify-center gap-1 active:scale-98 cursor-pointer"
            >
              <span>{isHindi ? "MCQ शुरू करें" : "Start MCQ"}</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Bonus free combined test resource layout */}
      <div className="bg-gradient-to-tr from-indigo-900 to-blue-950 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden border border-slate-800 shadow-xl text-center md:text-left">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] bg-indigo-500/30 text-indigo-300 font-extrabold px-3 py-1 rounded-full uppercase tracking-widest font-mono">
              🚀{" "}
              {isHindi
                ? "नया: कंप्यूटर सामान्य ज्ञान"
                : "NEW: GENERAL INFORMATICS"}
            </span>
            <h3 className="text-lg md:text-xl font-bold">
              {isHindi
                ? "कंप्यूटर सामान्य योग्यता प्रश्नोत्तरी"
                : "Information Technology General Merit Mock"}
            </h3>
            <p className="text-xs text-blue-100 max-w-2xl leading-relaxed font-sans">
              {isHindi
                ? "सभी प्रतियोगी परीक्षाओं (SSC CGL, Bank, COPA, Railway) के लिए महत्वपूर्ण बेसिक एवं एडवांस कंप्यूटर एमसीक्यू हल करें।"
                : "A grand 50-question general assessment test mapping basic computer networks, database queries, and productivity apps."}
            </p>
          </div>
          <button
            onClick={() => onSelectCourse("GENERAL")}
            className="px-6 py-3 bg-white text-indigo-950 rounded-xl text-xs font-black hover:bg-indigo-50 transition active:scale-95 shadow-lg whitespace-nowrap"
          >
            {isHindi ? "शुरू करें ➔" : "Start General Quiz ➔"}
          </button>
        </div>
      </div>
    </div>
  );
}
