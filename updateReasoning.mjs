import fs from 'fs';

let content = fs.readFileSync('src/components/ReasoningSelectionView.tsx', 'utf-8');

content = content.replace(
  /interface ReasoningTopic {[\s\S]*?}/,
  `interface ReasoningTopic {
  id: string;
  topicFilter: string;
  titleHi: string;
  titleEn: string;
  icon: string;
}`
);

content = content.replace(/topics: \[([\s\S]*?)\]/, `topics: [
        { id: "r1", topicFilter: "Similarity", titleHi: "समानता एवं भिन्नता", titleEn: "Similarity & Difference", icon: "⚖️" },
        { id: "r2", topicFilter: "Analogy", titleHi: "उपमा (Analogy)", titleEn: "Analogy Test", icon: "🔄" },
        { id: "r3", topicFilter: "Classification", titleHi: "वर्गीकरण", titleEn: "Classification", icon: "🗂️" },
        { id: "r4", topicFilter: "Coding", titleHi: "कोडिंग-डिकोडिंग", titleEn: "Coding-Decoding", icon: "🔠" },
        { id: "r5", topicFilter: "Number Series", titleHi: "संख्या श्रृंखला", titleEn: "Number Series", icon: "🔢" },
        { id: "r6", topicFilter: "Spatial", titleHi: "स्थानिक दृश्यांकन (Spatial Visualization)", titleEn: "Spatial Visualization", icon: "🧊" },
        { id: "r7", topicFilter: "Direction", titleHi: "दिशा ज्ञान", titleEn: "Direction SenseTest", icon: "🧭" },
        { id: "r8", topicFilter: "Visual Memory", titleHi: "दृश्य स्मृति", titleEn: "Visual Memory", icon: "👁️" },
        { id: "r9", topicFilter: "Relationship", titleHi: "संबंध आधारित प्रश्न", titleEn: "Blood Relation & Family Tree", icon: "👨‍👩‍👧‍👦" },
        { id: "r10", topicFilter: "Mirror Image", titleHi: "Mirror Image", titleEn: "Mirror Image Reflection", icon: "🪞" },
        { id: "r11", topicFilter: "Water Image", titleHi: "Water Image", titleEn: "Water Image Reflection", icon: "💧" },
        { id: "r12", topicFilter: "Embedded Figures", titleHi: "Embedded Figures", titleEn: "Embedded Figures", icon: "🧩" },
        { id: "r13", topicFilter: "Paper Folding", titleHi: "Paper Folding & Cutting", titleEn: "Paper Folding & Cutting", icon: "📄" }
      ]`);


content = content.replace(
  /<motion\.div\s+key=\{topic\.id\}[\s\S]*?<\/motion\.div>/,
  `<motion.div
                    key={topic.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    onClick={() => onSelectTopic("Reasoning", topic.topicFilter)}
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

                    {/* Start Button triggers active selection */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTopic("Reasoning", topic.topicFilter);
                      }}
                      className="px-3 py-2 text-[11px] font-black tracking-tight text-slate-700 hover:text-white dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-[#4169E1] dark:hover:bg-[#4169E1] border border-slate-100 dark:border-slate-800 rounded-xl transition-all duration-300 flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer"
                    >
                      <span>▶</span>
                      <span>{isHindi ? "शुरू करें" : "Start"}</span>
                    </button>
                  </motion.div>`
);

fs.writeFileSync('src/components/ReasoningSelectionView.tsx', content);
console.log('Reasoning updated');
