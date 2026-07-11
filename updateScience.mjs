import fs from 'fs';

let content = fs.readFileSync('src/components/ScienceSelectionView.tsx', 'utf-8');

content = content.replace(
  /interface ScienceTopic {[\s\S]*?}/,
  `interface ScienceTopic {
  id: string;
  topicFilter: string;
  titleHi: string;
  titleEn: string;
  icon: string;
}`
);

content = content.replace(/topics: \[([\s\S]*?)\]/, `topics: [
        { id: "p1", topicFilter: "Light", titleHi: "प्रकाश", titleEn: "Light - Reflection & Refraction", icon: "💡" },
        { id: "p2", topicFilter: "Eye", titleHi: "मानव नेत्र", titleEn: "The Human Eye & Colorful World", icon: "👁️" },
        { id: "p3", topicFilter: "Electricity", titleHi: "विद्युत", titleEn: "Electricity / Electric Current", icon: "⚡" },
        { id: "p4", topicFilter: "Magnetic", titleHi: "चुंबकीय प्रभाव", titleEn: "Magnetic Effects of Electric Current", icon: "🧲" },
        { id: "p5", topicFilter: "Energy", titleHi: "ऊर्जा के स्रोत", titleEn: "Sources of Energy", icon: "🔋" }
      ]`);
      
content = content.replace(/topics: \[([\s\S]*?)\]/g, (match, offset, full) => {
  if (match.includes('"Chemical"')) {
    return `topics: [
        { id: "c1", topicFilter: "Chemical", titleHi: "रासायनिक अभिक्रियाएँ एवं समीकरण", titleEn: "Chemical Reactions & Equations", icon: "🧪" },
        { id: "c2", topicFilter: "Acid", titleHi: "अम्ल, क्षार एवं लवण", titleEn: "Acids, Bases & Salts", icon: "🍋" },
        { id: "c3", topicFilter: "Metal", titleHi: "धातु एवं अधातु", titleEn: "Metals & Non-metals", icon: "🪨" },
        { id: "c4", topicFilter: "Carbon", titleHi: "कार्बन एवं उसके यौगिक", titleEn: "Carbon & its Compounds", icon: "💎" },
        { id: "c5", topicFilter: "Periodic", titleHi: "तत्वों का आवर्त वर्गीकरण", titleEn: "Periodic Classification of Elements", icon: "📊" }
      ]`;
  } else if (match.includes('"Life Processes"')) {
     return `topics: [
        { id: "b1", topicFilter: "Life Processes", titleHi: "जीवन प्रक्रियाएँ", titleEn: "Life Processes / जैव प्रक्रम", icon: "🧬" },
        { id: "b2", topicFilter: "Control", titleHi: "नियंत्रण एवं समन्वय", titleEn: "Control & Coordination", icon: "🧠" },
        { id: "b3", topicFilter: "Reproduction", titleHi: "प्रजनन", titleEn: "How do Organisms Reproduce?", icon: "👶" },
        { id: "b4", topicFilter: "Heredity", titleHi: "आनुवंशिकता एवं विकास", titleEn: "Heredity & Evolution", icon: "🐒" },
        { id: "b5", topicFilter: "Environment", titleHi: "पर्यावरण", titleEn: "Our Environment", icon: "🌍" }
      ]`;
  }
  return match;
});

content = content.replace(
  /<motion\.div\s+key=\{topic\.id\}[\s\S]*?<\/motion\.div>/,
  `<motion.div
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
                          {isHindi ? "क्विज अभ्यास • LIVE MCQS" : "QUIZ PRACTICE • LIVE MCQS"}
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
                  </motion.div>`
);

fs.writeFileSync('src/components/ScienceSelectionView.tsx', content);
console.log('Science updated');
