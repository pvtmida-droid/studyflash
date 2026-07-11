import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace half steps
    content = content.replace(/-850/g, '-900');
    content = content.replace(/-750/g, '-800');
    content = content.replace(/-450/g, '-500');
    content = content.replace(/-350/g, '-400');
    content = content.replace(/-250/g, '-300');
    content = content.replace(/-105/g, '-100');
    content = content.replace(/-205/g, '-200');
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
