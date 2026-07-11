import fs from 'fs';

let content = fs.readFileSync('src/components/HindiSelectionView.tsx', 'utf-8');

content = content.replace(
  /interface HindiTopic {[\s\S]*?}/,
  `interface HindiTopic {
  id: string;
  topicFilter: string;
  titleHi: string;
  titleEn: string;
  icon: string;
}`
);

content = content.replace(/topics: \[([\s\S]*?)\]/g, (match, offset, full) => {
  if (match.includes('"Sandhi"')) {
    return `topics: [
        { id: "h1", topicFilter: "Sandhi", titleHi: "संधि", titleEn: "Sandhi (Joins)", icon: "🤝" },
        { id: "h2", topicFilter: "Samas", titleHi: "समास", titleEn: "Samas (Compound Words)", icon: "🔗" },
        { id: "h3", topicFilter: "Karak", titleHi: "कारक", titleEn: "Karak (Cases & Declensions)", icon: "🔡" },
        { id: "h4", topicFilter: "Vachan", titleHi: "वचन", titleEn: "Vachan (Grammatical Numbers)", icon: "🔢" },
        { id: "h5", topicFilter: "Ling", titleHi: "लिंग", titleEn: "Ling (Gender Roles)", icon: "🚻" },
        { id: "h6", topicFilter: "Kaal", titleHi: "काल", titleEn: "Kaal (Verbal Tenses)", icon: "⏳" },
        { id: "h7", topicFilter: "Vachya", titleHi: "वाच्य", titleEn: "Vachya (Voices - Active/Passive)", icon: "🗣️" },
        { id: "h8", topicFilter: "Prefix Suffix", titleHi: "उपसर्ग एवं प्रत्यय", titleEn: "Upsarg & Pratyay (Prefix & Suffix)", icon: "➕" },
        { id: "h9", topicFilter: "Kriya", titleHi: "क्रिया", titleEn: "Kriya (Verbs)", icon: "🏃" },
        { id: "h10", topicFilter: "Sangya", titleHi: "संज्ञा", titleEn: "Sangya (Nouns)", icon: "📦" },
        { id: "h11", topicFilter: "Sarvanam", titleHi: "सर्वनाम", titleEn: "Sarvanam (Pronouns)", icon: "👤" },
        { id: "h12", topicFilter: "Visheshon", titleHi: "विशेषण", titleEn: "Visheshon (Adjectives)", icon: "✨" },
        { id: "h13", topicFilter: "Avyay", titleHi: "अव्यय", titleEn: "Avyay (Particles & Indeclinables)", icon: "🚫" },
        { id: "h14", topicFilter: "Sentence Correction", titleHi: "वाक्य शुद्धि", titleEn: "Vakya Shuddhi (Sentence Correction)", icon: "✍️" },
        { id: "h15", topicFilter: "Spelling Correction", titleHi: "वर्तनी शुद्धि", titleEn: "Vartani Shuddhi (Spelling Correction)", icon: "✔️" }
      ]`;
  } else if (match.includes('"Synonyms"')) {
    return `topics: [
        { id: "h16", topicFilter: "Synonyms", titleHi: "पर्यायवाची शब्द", titleEn: "Paryayvachi (Synonyms)", icon: "🔀" },
        { id: "h17", topicFilter: "Antonyms", titleHi: "विलोम शब्द", titleEn: "Vilom Shabd (Antonyms)", icon: "🔄" },
        { id: "h18", topicFilter: "Homonyms", titleHi: "अनेकार्थी शब्द", titleEn: "Anekarthi Shabd (Homonyms)", icon: "🎭" },
        { id: "h19", topicFilter: "One Word Substitution", titleHi: "एक शब्द के लिए अनेक शब्द / वाक्यांश", titleEn: "One Word Substitution", icon: "1️⃣" },
        { id: "h20", topicFilter: "Tatsam Tadbhav", titleHi: "तत्सम-तद्भव", titleEn: "Tatsam-Tadbhav", icon: "📜" },
        { id: "h21", topicFilter: "Deshaj Videshaj", titleHi: "देशज एवं विदेशी शब्द", titleEn: "Deshaj & Videshaj Words", icon: "🌍" }
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
                    onClick={() => onSelectTopic("Hindi", topic.topicFilter)}
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
                        onSelectTopic("Hindi", topic.topicFilter);
                      }}
                      className="px-3 py-2 text-[11px] font-black tracking-tight text-slate-700 hover:text-white dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-[#4169E1] dark:hover:bg-[#4169E1] border border-slate-100 dark:border-slate-800 rounded-xl transition-all duration-300 flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer"
                    >
                      <span>▶</span>
                      <span>{isHindi ? "शुरू करें" : "Start"}</span>
                    </button>
                  </motion.div>`
);

fs.writeFileSync('src/components/HindiSelectionView.tsx', content);
console.log('Hindi updated');
