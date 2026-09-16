const fs = require('fs');
const path = require('path');

function getAllFiles(dir, exts = ['.html']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === 'public' || file === '.git' || file === 'archive') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else if (exts.includes(path.extname(file))) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllFiles(path.resolve(__dirname, '..'));
let count = 0;
for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Clean logo attribute on <sts-header> and <sts-footer>
  content = content.replace(/<(sts-header|sts-footer)\s+logo=["'][^"']*["']/g, '<$1');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
  }
}
console.log('Cleaned logo attributes on', count, 'files');
