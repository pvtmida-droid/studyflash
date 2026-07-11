import fs from 'fs';

const appCode = fs.readFileSync('src/App.tsx', 'utf-8');

const startIndex = appCode.indexOf('{currentView === "home" && (');
// The end index should be right before: {/* Dynamic Nav views components mapping */}
const endStr = '{/* Dynamic Nav views components mapping */}';
const endIndex = appCode.indexOf(endStr);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find boundaries");
  process.exit(1);
}

const before = appCode.substring(0, startIndex);
const after = appCode.substring(endIndex);

const newHomeView = `{currentView === "home" && (
          <HomeView
            isHindi={isHindi}
            setCurrentView={setCurrentView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setShowAiGenerator={setShowAiGenerator}
            setLockedFeature={setLockedFeature}
            setShowPremiumLock={setShowPremiumLock}
            userStats={userStats}
          />
        )}

        `;

let newAppCode = before + newHomeView + after;

// Also add import for HomeView
if (!newAppCode.includes('import HomeView')) {
  newAppCode = newAppCode.replace(
    'import DashboardView from "./components/DashboardView";',
    'import DashboardView from "./components/DashboardView";\nimport HomeView from "./components/HomeView";'
  );
}

fs.writeFileSync('src/App.tsx', newAppCode);
console.log('App updated');
