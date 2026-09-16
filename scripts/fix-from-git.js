const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const files = execSync('git ls-tree -r HEAD --name-only', { encoding: 'utf8' })
  .split('\n')
  .map(s => s.trim())
  .filter(s => s.endsWith('.html'));

console.log('Total HTML files in git repo:', files.length);

let fixedTotal = 0;
for (const relPath of files) {
  // Read exact content from git commit HEAD
  let originalContent;
  try {
    originalContent = execSync(`git show HEAD:"${relPath}"`, { encoding: 'utf8', maxBuffer: 15 * 1024 * 1024 });
  } catch (err) {
    console.error('Failed to read git object for:', relPath);
    continue;
  }

  // Exact replacement:
  // ../../css/ -> /css/
  // ../css/ -> /css/
  // ../../fontawesome/ -> /fontawesome/
  // ../fontawesome/ -> /fontawesome/
  // ../../scripts/ -> /scripts/
  // ../scripts/ -> /scripts/
  // ../../assets/ -> /assets/
  // ../assets/ -> /assets/
  // ./css/ -> /css/
  // ./fontawesome/ -> /fontawesome/
  // ./scripts/ -> /scripts/
  // ./assets/ -> /assets/

  let fixed = originalContent
    .replace(/(href|src)=["'](?:\.\.\/)+css\/(.*?)["']/g, '$1="/css/$2"')
    .replace(/(href|src)=["'](?:\.\.\/)+fontawesome\/(.*?)["']/g, '$1="/fontawesome/$2"')
    .replace(/(href|src)=["'](?:\.\.\/)+scripts\/(.*?)["']/g, '$1="/scripts/$2"')
    .replace(/(href|src)=["'](?:\.\.\/)+assets\/(.*?)["']/g, '$1="/assets/$2"')
    .replace(/(href|src)=["'](?:\.\/)?css\/(.*?)["']/g, '$1="/css/$2"')
    .replace(/(href|src)=["'](?:\.\/)?fontawesome\/(.*?)["']/g, '$1="/fontawesome/$2"')
    .replace(/(href|src)=["'](?:\.\/)?scripts\/(.*?)["']/g, '$1="/scripts/$2"')
    .replace(/(href|src)=["'](?:\.\/)?assets\/(.*?)["']/g, '$1="/assets/$2"');

  const absPath = path.join(process.cwd(), relPath);
  fs.writeFileSync(absPath, fixed, 'utf8');
  fixedTotal++;
}

console.log(`Successfully processed and fixed all ${fixedTotal} HTML files directly from HEAD.`);
