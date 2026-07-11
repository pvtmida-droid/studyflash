import fs from 'fs';

let content = fs.readFileSync('src/components/CurrentAffairsSelectionView.tsx', 'utf-8');

content = content.replace(
  /<div\s+key=\{period\.id\}\s+onClick=\{[\s\S]*?className="bg-white dark:bg-slate-950 border border-rose-100 hover:border-rose-500 dark:border-rose-900\/30 dark:hover:border-rose-800 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer hover:shadow-xl hover:scale-\[1.03\] active:scale-98 transition-all duration-300 min-h-\[190px\] relative group"/g,
  `<div
              key={period.id}
              onClick={() => handleSelectPeriod(period.id, period.mcqCountRequest, period.titleHi)}
              className="relative group bg-white dark:bg-slate-950 border border-slate-100 hover:border-amber-400 dark:border-slate-800/80 dark:hover:border-amber-600 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] dark:hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-[1.03] active:scale-98 transition-all duration-300 min-h-[190px] overflow-hidden z-0"
            >
              {/* Glow inner */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>
`
);

fs.writeFileSync('src/components/CurrentAffairsSelectionView.tsx', content);
console.log('CA Selection Update complete');
