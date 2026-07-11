import fs from 'fs';

let content = fs.readFileSync('src/components/ComputerSelectionView.tsx', 'utf-8');

// remove the extra `>` on its own line after the `</div>` glow
content = content.replace(
  /<div className=\"absolute inset-0 bg-gradient-to-br from-amber-400\/0 via-orange-500\/0 to-amber-600\/0 group-hover:from-amber-400\/5 group-hover:via-orange-500\/5 group-hover:to-amber-500\/10 transition-all duration-300 -z-10\"><\/div>\n\n          >/g,
  `<div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:via-orange-500/5 group-hover:to-amber-500/10 transition-all duration-300 -z-10"></div>\n`
);

fs.writeFileSync('src/components/ComputerSelectionView.tsx', content);
console.log('Computer Selection Fix complete');
