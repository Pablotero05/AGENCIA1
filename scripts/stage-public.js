const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'public');
const directories = ['assets', 'css', 'en', 'es', 'fontawesome', 'por', 'pt'];
const browserScripts = ['animations.js', 'filterDiff.js', 'LeadsContact.js', 'mobileMenu.js'];
const rootFiles = ['index.html', 'robots.txt', 'sitemap.xml', 'googlee93585bedc255548.html', 'favicon.ico', 'favicon.png'];

// Clean and recreate output directory
try {
  fs.rmSync(outputDir, { recursive: true, force: true });
} catch (e) {}
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
  const scriptPath = path.join(rootDir, 'scripts', script);
  if (fs.existsSync(scriptPath)) {
    fs.copyFileSync(scriptPath, path.join(scriptsDir, script));
  }
}

if (fs.existsSync(path.join(rootDir, 'scripts', 'components'))) {
  fs.cpSync(path.join(rootDir, 'scripts', 'components'), path.join(scriptsDir, 'components'), {
    recursive: true
  });
}

if (fs.existsSync(path.join(rootDir, 'scripts', 'analytics'))) {
  fs.cpSync(path.join(rootDir, 'scripts', 'analytics'), path.join(scriptsDir, 'analytics'), {
    recursive: true
  });
}

// Copy root files ensuring sitemap.xml and robots.txt are directly overwritten in public/
for (const file of rootFiles) {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    const destPath = path.join(outputDir, file);
    fs.copyFileSync(filePath, destPath);
  }
}

console.log('Staged static site in public/.');
