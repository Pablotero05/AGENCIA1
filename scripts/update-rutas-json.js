const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
['es', 'en', 'por'].forEach(lang => {
  const file = path.join(rootDir, lang, 'data', 'rutas.json');
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/miniatura-frances\.png/g, 'miniatura-frances.webp');
  content = content.replace(/ruta_portugues\.png/g, 'ruta_portugues.webp');
  content = content.replace(/miniatura-valencia\.jpg/g, 'miniatura-valencia.webp');
  content = content.replace(/home_experiencia\.png/g, 'home_experiencia.webp');
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${lang}/data/rutas.json`);
});
