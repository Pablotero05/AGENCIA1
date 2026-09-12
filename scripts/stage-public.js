const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'public');
const directories = ['assets', 'css', 'en', 'es', 'fontawesome', 'por', 'pt'];
const browserScripts = ['animations.js', 'filterDiff.js', 'LeadsContact.js', 'mobileMenu.js'];
const rootFiles = ['index.html', 'robots.txt', 'sitemap.xml', 'googlee93585bedc255548.html'];

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const directory of directories) {
  const source = path.join(rootDir, directory);
  if (fs.existsSync(source)) {
    fs.cpSync(source, path.join(outputDir, directory), { recursive: true });
  }
}

const scriptsDir = path.join(outputDir, 'scripts');
fs.mkdirSync(scriptsDir, { recursive: true });

for (const script of browserScripts) {
  fs.copyFileSync(path.join(rootDir, 'scripts', script), path.join(scriptsDir, script));
}

fs.cpSync(path.join(rootDir, 'scripts', 'components'), path.join(scriptsDir, 'components'), {
  recursive: true
});

for (const file of rootFiles) {
  fs.copyFileSync(path.join(rootDir, file), path.join(outputDir, file));
}

console.log('Staged static site in public/.');
