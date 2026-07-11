const fs = require('fs');
let content = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

const subjectPracticeStart = `      {/* 3. MAIN ATTRACTION: SUBJECT PRACTICE */}`;
const examCategoriesStart = `      {/* 3. EXAM CATEGORIES */}`;
const examCategoriesEnd = `      {/* 5. GAMIFICATION & STATS REMOVED */}`;

let p1 = content.indexOf(subjectPracticeStart);
let p2 = content.indexOf(examCategoriesStart);
let p3 = content.indexOf(examCategoriesEnd);

if (p1 !== -1 && p2 !== -1 && p3 !== -1) {
    let subjectPracticeBlock = content.substring(p1, p2);
    let examCategoriesBlock = content.substring(p2, p3);

    let newContent = content.substring(0, p1) + examCategoriesBlock + subjectPracticeBlock + content.substring(p3);
    fs.writeFileSync('src/components/HomeView.tsx', newContent);
    console.log('Swapped successfully');
} else {
    console.log('Could not find markers');
}
