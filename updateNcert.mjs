import fs from 'fs';

let content = fs.readFileSync('src/components/NcertSelectionView.tsx', 'utf-8');

// Replace level 1 card
content = content.replace(
  /<div\s+key=\{clazz\.classNum\}[\s\S]*?onClick=\{[\s\S]*?className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-\[20px\] hover:border-emerald-500\/30 hover:shadow-\[0_12px_35px_rgba\(5,150,105,0\.05\)\] transition-all cursor-pointer group active:scale-95 text-left flex items-center justify-between"[\s\S]*?>/g,
  `<div
                  key={clazz.classNum}
                  onClick={() => setSelectedClassNum(clazz.classNum)}
                  className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-[20px] hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all cursor-pointer group active:scale-95 text-left flex items-center justify-between overflow-hidden z-0"
                >
                  {/* Glow Background Effect inside card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>`
);

// Replace level 2 card
content = content.replace(
  /<div\s+key=\{idx\}[\s\S]*?onClick=\{[\s\S]*?className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-\[20px\] hover:border-emerald-500\/30 hover:shadow-\[0_12px_35px_rgba\(5,150,105,0\.05\)\] transition-all cursor-pointer group active:scale-95 text-left flex flex-col justify-between h-\[150px\]"[\s\S]*?>/g,
  `<div
                key={idx}
                onClick={() => onSelectNcertClass(selectedClassNum, sub.id)}
                className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-[20px] hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all cursor-pointer group active:scale-95 text-left flex flex-col justify-between h-[150px] overflow-hidden z-0"
              >
                {/* Glow Background Effect inside card */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>`
);

fs.writeFileSync('src/components/NcertSelectionView.tsx', content);
console.log('Ncert updated');

