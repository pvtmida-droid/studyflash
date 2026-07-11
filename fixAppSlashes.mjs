import fs from 'fs';

const filePath = 'src/App.tsx';
let data = fs.readFileSync(filePath, 'utf-8');

data = data.replace(/\\\\\\\`/g, '\`');
data = data.replace(/\\\\\$/g, '$');

fs.writeFileSync(filePath, data);
console.log('App.tsx syntactically repaired.');
