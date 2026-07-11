import fs from 'fs';

let content = fs.readFileSync('src/components/ComputerSelectionView.tsx', 'utf-8');

content = content.replace(
  /<div\s+key=\{course\.key\}\s+className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800\/80 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 relative group min-h-\[380px\]"/g,
  `<div
            key={course.key}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] dark:hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 relative group min-h-[380px] overflow-hidden z-0"
          >
            {/* Glow Background Effect inside card */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>
`
);

fs.writeFileSync('src/components/ComputerSelectionView.tsx', content);
console.log('Computer Selection Update complete');
