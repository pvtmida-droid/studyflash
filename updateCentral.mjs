import fs from 'fs';

let content = fs.readFileSync('src/components/CentralExamSelectionView.tsx', 'utf-8');

// The CentralExamSelectionView uses a slightly different layout.
// Let's modify the `<motion.div` representing the folder cards.

content = content.replace(
  /<motion\.div\s+key=\{folder\.id\}[\s\S]*?<\/motion\.div>/g,
  `<motion.div
                      key={folder.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2, delay: folderIdx * 0.03 }}
                      onClick={() => onSelectFolder(category.id, folder.id)}
                      className={\`relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-sm \${category.hoverShadowClass || ''} hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] dark:hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 group cursor-pointer overflow-hidden z-0\`}
                    >
                      {/* Glow Background Effect inside card */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>
                  
                      <div className="flex items-center gap-3.5 min-w-0 z-10">
                        {/* Custom decorative icon styling */}
                        <div className={\`w-10 h-10 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 border border-amber-100 dark:border-amber-500/20 flex items-center justify-center shrink-0 text-amber-500 group-hover:scale-110 shadow-sm transition-transform duration-300\`}>
                          <Sparkles className="h-4.5 w-4.5 fill-amber-100 dark:fill-amber-950/40" />
                        </div>
                        
                        <div className="space-y-0.5 text-left min-w-0">
                          <h4 className="text-xs font-black text-slate-900 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                            {isHindi ? folder.nameHi : folder.nameEn}
                          </h4>
                          <span className="block text-[9px] text-slate-400 font-bold tracking-wider font-mono">
                            {isHindi ? folder.descHi : folder.descEn}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectFolder(category.id, folder.id);
                        }}
                        className="px-3 py-1.5 text-[11px] font-black tracking-tight text-slate-700 hover:text-white dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-[#4169E1] dark:hover:bg-[#4169E1] border border-slate-100 dark:border-slate-800 rounded-xl transition-all duration-300 flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer z-10"
                      >
                        <span>▶</span>
                        <span>{isHindi ? "शुरू करें" : "Start"}</span>
                      </button>
                    </motion.div>`
);

fs.writeFileSync('src/components/CentralExamSelectionView.tsx', content);
console.log('Central updated');

