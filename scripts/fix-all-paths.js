const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

const htmlFiles = getAllFiles(__dirname ? path.resolve(__dirname, '..') : process.cwd(), ['.html']);
let count = 0;

for (const file of htmlFiles) {
  const rootDir = path.resolve(__dirname, '..');
  const relPath = path.relative(rootDir, file).split(path.sep).join('/');
  let rawContent;
  try {
    rawContent = execSync(`git show 6b18dab1:"${relPath}"`, { cwd: rootDir, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  } catch (e) {
    rawContent = fs.readFileSync(file, 'utf8');
  }

  // Replace relative prefixes with root-relative paths
  let fixed = rawContent
    .replace(/href=["'](?:\.\.\/)+css\//g, 'href="/css/')
    .replace(/href=["'](?:\.\.\/)+fontawesome\//g, 'href="/fontawesome/')
    .replace(/src=["'](?:\.\.\/)+scripts\//g, 'src="/scripts/')
    .replace(/src=["'](?:\.\.\/)+assets\//g, 'src="/assets/')
    .replace(/href=["'](?:\.\.\/)+assets\//g, 'href="/assets/')
    .replace(/href=["']\.\/css\//g, 'href="/css/')
    .replace(/href=["']\.\/fontawesome\//g, 'href="/fontawesome/')
    .replace(/src=["']\.\/scripts\//g, 'src="/scripts/')
    .replace(/src=["']\.\/assets\//g, 'src="/assets/')
    .replace(/href=["']\.\/assets\//g, 'href="/assets/')
    .replace(/href=["']css\//g, 'href="/css/')
    .replace(/href=["']fontawesome\//g, 'href="/fontawesome/')
    .replace(/src=["']scripts\//g, 'src="/scripts/')
    .replace(/src=["']assets\//g, 'src="/assets/')
    .replace(/href=["']assets\//g, 'href="/assets/');

  fs.writeFileSync(file, fixed, 'utf8');
  count++;
}

console.log(`Successfully fixed paths in ${count} HTML files.`);
