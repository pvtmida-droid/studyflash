import fs from 'fs';

let content = fs.readFileSync('src/components/CurrentAffairsSelectionView.tsx', 'utf-8');

content = content.replace(
  /<div className=\"absolute inset-0 bg-gradient-to-br from-amber-400\/0 via-orange-500\/0 to-amber-600\/0 group-hover:from-amber-400\/5 group-hover:via-orange-500\/5 group-hover:to-amber-500\/10 transition-all duration-300 -z-10\"><\/div>\n\n              >/g,
  `<div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>\n`
);

fs.writeFileSync('src/components/CurrentAffairsSelectionView.tsx', content);
console.log('CA Selection Fix complete');
