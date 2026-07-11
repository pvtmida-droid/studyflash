import fs from 'fs';

let content = fs.readFileSync('src/components/HomeView.tsx', 'utf-8');

// Update subject items
content = content.replace(
  /\[\s*\{\s*id:\s*"gkgs-selection"[\s\S]*?\]\.map/g,
  `[
            { id: "gkgs-selection", titleEn: "GK / General Studies", titleHi: "सामान्य ज्ञान / अध्ययन", descEn: "History, Polity, Geography, Economy", descHi: "इतिहास, राजनीति, अर्थशास्त्र", bg: "from-blue-500 to-indigo-600", icon: "🏛️", stat: "11 Topics" },
            { id: "science-selection", titleEn: "General Science", titleHi: "सामान्य विज्ञान", descEn: "Physics, Chemistry, Biology", descHi: "भौतिकी, रसायन विज्ञान, जीव विज्ञान", bg: "from-emerald-400 to-teal-500", icon: "🧬", stat: "15 Topics" },
            { id: "maths-selection", titleEn: "Mathematics", titleHi: "गणित", descEn: "Aptitude, Arithmetic, Algebra", descHi: "अंकगणित, बीजगणित, परिमिति", bg: "from-pink-500 to-rose-600", icon: "📐", stat: "12 Topics" },
            { id: "reasoning-selection", titleEn: "Reasoning", titleHi: "तार्किक क्षमता", descEn: "Analogy, Series, Puzzles", descHi: "श्रृंखला, रक्त संबंध, पज़ल", bg: "from-amber-400 to-orange-500", icon: "🧠", stat: "13 Topics" },
            { id: "hindi-selection", titleEn: "General Hindi", titleHi: "सामान्य हिन्दी", descEn: "Grammar, Vocabulary", descHi: "व्याकरण, शब्दावली, वर्णमाला", bg: "from-violet-500 to-purple-600", icon: "✍️", stat: "22 Topics" },
            { id: "english-selection", titleEn: "General English", titleHi: "सामान्य अंग्रेजी", descEn: "Grammar, Comprehension", descHi: "व्याकरण, बोधगम्यता", bg: "from-sky-400 to-blue-500", icon: "🔤", stat: "8 Topics" },
          ].map`
);

// Update subject rendering
content = content.replace(
  /\{subj\.title\}/g,
  `{isHindi ? subj.titleHi : subj.titleEn}`
);
content = content.replace(
  /\{subj\.desc\}/g,
  `{isHindi ? subj.descHi : subj.descEn}`
);

// Update category items
content = content.replace(
  /\[\s*\{\s*id:\s*"ncert-selection"[\s\S]*?\]\.map/g,
  `[
            { id: "ncert-selection", titleEn: "NCERT Books", titleHi: "एनसीईआरटी पुस्तकें", descEn: "Class 5 to 12 materials", descHi: "कक्षा 5 से 12 तक", icon: "📚", bg: "from-emerald-400 to-teal-500" },
            { id: "central-exam-selection", titleEn: "Central Exams", titleHi: "केंद्रीय परीक्षाएं", descEn: "SSC, Railways, UPSC", descHi: "एसएससी, रेलवे, यूपीएससी", icon: "🏆", bg: "from-blue-500 to-indigo-600" },
            { id: "computer-selection", titleEn: "Computer Knowledge", titleHi: "कंप्यूटर ज्ञान", descEn: "Professional Courses", descHi: "व्यावसायिक पाठ्यक्रम (DCA, CCC)", icon: "💻", bg: "from-indigo-500 to-purple-600" },
            { id: "current-affairs-selection", titleEn: "Current Affairs", titleHi: "करेंट अफेयर्स", descEn: "Daily events updates", descHi: "दैनिक घटनाएं और समाचार", icon: "📰", bg: "from-amber-400 to-orange-500" }
          ].map`
);

// Update category rendering
content = content.replace(
  /\{item\.title\}/g,
  `{isHindi ? item.titleHi : item.titleEn}`
);
content = content.replace(
  /\{item\.desc\}/g,
  `{isHindi ? item.descHi : item.descEn}`
);

fs.writeFileSync('src/components/HomeView.tsx', content);
console.log('Fixed translations on HomeView');
