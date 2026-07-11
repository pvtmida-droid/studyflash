import fs from 'fs';

let content = fs.readFileSync('src/components/CentralExamSelectionView.tsx', 'utf-8');

content = content.replace(/delay: folderIdx \* 0\.03/g, 'delay: idx * 0.03');
content = content.replace(/onSelectFolder\(category\.id, folder\.id\)/g, 'onSelectFolder(activeCategory.id, folder.id)');
content = content.replace(/\$\{category\.hoverShadowClass \|\| ''\}/g, '');

fs.writeFileSync('src/components/CentralExamSelectionView.tsx', content);
console.log('Central fixed');
