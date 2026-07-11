import fs from 'fs';

let appContent = fs.readFileSync('src/App.tsx', 'utf-8');

appContent = appContent.replace(
  /import EnglishSelectionView from "\.\/components\/EnglishSelectionView";/,
  `import EnglishSelectionView from "./components/EnglishSelectionView";\nimport StatePoliceSelectionView from "./components/StatePoliceSelectionView";`
);

appContent = appContent.replace(
  /\{currentView === "english-selection" && \([\s\S]*?\}\)/,
  `{currentView === "english-selection" && (
          <EnglishSelectionView 
            isHindi={isHindi}
            onBack={() => setCurrentView("home")}
            onSelectTopic={(subjectCode, topicFilter) => {
              setInitialSubject(subjectCode);
              setInitialSearchQuery(topicFilter);
              setCurrentView("questions");
            }}
          />
        )}

        {currentView === "state-police-selection" && (
          <StatePoliceSelectionView
            isHindi={isHindi}
            onBack={() => setCurrentView("home")}
            onSelectState={(stateId) => {
              setInitialSubject("All");
              setInitialSearchQuery(stateId);
              setCurrentView("questions");
            }}
          />
        )}`
);

fs.writeFileSync('src/App.tsx', appContent);

let homeContent = fs.readFileSync('src/components/HomeView.tsx', 'utf-8');

homeContent = homeContent.replace(
  /\[[\s]*\{\s*id:\s*"ncert-selection"[\s\S]*?\]\.map/,
  `[
            { id: "ncert-selection", titleEn: "NCERT Books", titleHi: "एनसीईआरटी पुस्तकें", descEn: "Class 5 to 12 materials", descHi: "कक्षा 5 से 12 तक", icon: "📚", bg: "from-emerald-400 to-teal-500" },
            { id: "central-exam-selection", titleEn: "Central Exams", titleHi: "केंद्रीय परीक्षाएं", descEn: "SSC, Railways, UPSC", descHi: "एसएससी, रेलवे, यूपीएससी", icon: "🏆", bg: "from-blue-500 to-indigo-600" },
            { id: "computer-selection", titleEn: "Computer Knowledge", titleHi: "कंप्यूटर ज्ञान", descEn: "Professional Courses", descHi: "व्यावसायिक पाठ्यक्रम (DCA, CCC)", icon: "💻", bg: "from-indigo-500 to-purple-600" },
            { id: "current-affairs-selection", titleEn: "Current Affairs", titleHi: "करेंट अफेयर्स", descEn: "Daily events updates", descHi: "दैनिक घटनाएं और समाचार", icon: "📰", bg: "from-amber-400 to-orange-500" },
            { id: "state-police-selection", titleEn: "State Police", titleHi: "राज्य पुलिस", descEn: "UP, Bihar, Rajasthan", descHi: "यूपी, बिहार, राजस्थान पुलिस", icon: "🛡️", bg: "from-rose-500 to-pink-600" }
          ].map`
);

// We need to adjust grid-cols in homeview so that it displays nicely with 5 items.
// Currently it is likely: className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
homeContent = homeContent.replace(
  /className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"/,
  `className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8"`
);

// Or let's see exactly what HomeView has. I need to make sure I match the grid string.
// Let's write the HomeView update logic more robustly
fs.writeFileSync('src/components/HomeView.tsx', homeContent);

console.log('App and Home updated with State Police');
