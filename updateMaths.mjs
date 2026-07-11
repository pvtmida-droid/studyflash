import fs from 'fs';

const mathsCode = fs.readFileSync('src/components/MathsSelectionView.tsx', 'utf-8');

let updatedMathsCode = mathsCode.replace(
  /interface MathsTopic {[\s\S]*?}/,
  `interface MathsTopic {
  id: string;
  topicFilter: string;
  titleHi: string;
  titleEn: string;
  icon: string;
}`
);

updatedMathsCode = updatedMathsCode.replace(
  /topics: \[([\s\S]*?)\]/,
  `topics: [
        { id: "m1", topicFilter: "Number System", titleHi: "संख्या पद्धति", titleEn: "Number System", icon: "🔢" },
        { id: "m2", topicFilter: "Percentage", titleHi: "प्रतिशत", titleEn: "Percentage", icon: "💯" },
        { id: "m3", topicFilter: "Profit", titleHi: "लाभ-हानि", titleEn: "Profit & Loss", icon: "📈" },
        { id: "m4", topicFilter: "Average", titleHi: "औसत", titleEn: "Average", icon: "⚖️" },
        { id: "m5", topicFilter: "Ratio", titleHi: "अनुपात एवं समानुपात", titleEn: "Ratio & Proportion", icon: "➗" },
        { id: "m6", topicFilter: "Time & Work", titleHi: "समय और कार्य", titleEn: "Time & Work", icon: "⏳" },
        { id: "m7", topicFilter: "Speed", titleHi: "समय, दूरी एवं चाल", titleEn: "Time, Distance & Speed", icon: "🚄" },
        { id: "m8", topicFilter: "Interest", titleHi: "साधारण एवं चक्रवृद्धि ब्याज", titleEn: "Simple & Compound Interest", icon: "💵" },
        { id: "m9", topicFilter: "Mensuration", titleHi: "क्षेत्रमिति (Mensuration)", titleEn: "Mensuration", icon: "📐" },
        { id: "m10", topicFilter: "Decimal", titleHi: "दशमलव एवं भिन्न", titleEn: "Decimal & Fraction", icon: "🔹" },
        { id: "m11", topicFilter: "LCM", titleHi: "LCM, HCF", titleEn: "LCM & HCF", icon: "🧩" },
        { id: "m12", topicFilter: "DI", titleHi: "डेटा व्याख्या (Basic DI)", titleEn: "Data Interpretation (DI)", icon: "📊" }
      ]`
);

updatedMathsCode = updatedMathsCode.replace(
  /<motion\.div\s+key=\{topic\.id\}[\s\S]*?<\/motion\.div>/,
  `<motion.div
                    key={topic.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    onClick={() => onSelectTopic("Mathematics", topic.topicFilter)}
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
                          {isHindi ? "क्विज अभ्यास • LIVE MCQS" : "QUIZ PRACTICE • LIVE MCQS"}
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
                  </motion.div>`
);

fs.writeFileSync('src/components/MathsSelectionView.tsx', updatedMathsCode);
console.log('Maths updated');

