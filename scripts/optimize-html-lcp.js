const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// Map of image filenames to convert
const imageReplacements = [
  { from: 'ststrasp.png', to: 'ststrasp.webp' },
  { from: 'stsLOGO.png', to: 'stsLOGO.webp' },
  { from: 'home_hero.png', to: 'home_hero.webp' },
  { from: 'home_experiencia.png', to: 'home_experiencia.webp' },
  { from: 'rutas_banner.png', to: 'rutas_banner.webp' },
  { from: 'sobre_nosotros_banner.png', to: 'sobre_nosotros_banner.webp' },
  { from: 'sobre_nosotros_equipo.png', to: 'sobre_nosotros_equipo.webp' },
  { from: 'service_breakfast.png', to: 'service_breakfast.webp' },
  { from: 'service_meals.png', to: 'service_meals.webp' },
  { from: 'service_luggage.png', to: 'service_luggage.webp' },
  { from: 'service_airport.png', to: 'service_airport.webp' },
  { from: 'service_transfer.png', to: 'service_transfer.webp' },
  { from: 'catedral-hero.jpg', to: 'catedral-hero.webp' },
  { from: 'miniatura-frances.png', to: 'miniatura-frances.webp' },
  { from: 'miniatura-valencia.jpg', to: 'miniatura-valencia.webp' },
  { from: 'ruta_portugues.png', to: 'ruta_portugues.webp' }
];

function getAllHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'public' && file !== '.git') {
        results = results.concat(getAllHtmlFiles(fullPath));
      }
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getAllHtmlFiles(rootDir);
console.log(`Processing ${htmlFiles.length} HTML files...`);

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Reemplazar extensiones de imágenes por sus equivalentes .webp
  imageReplacements.forEach(({ from, to }) => {
    content = content.split(from).join(to);
  });

  // 2. Optimizar imagen hero si existe
  // Reemplazar la etiqueta hero en index.html o páginas para añadir fetchpriority="high", decoding="async", etc.
  content = content.replace(
    /<img\s+src="([^"]*home_hero\.webp)"([^>]*)>/gi,
    (match, src, rest) => {
      let cleanRest = rest
        .replace(/loading="[^"]*"/gi, '')
        .replace(/fetchpriority="[^"]*"/gi, '')
        .replace(/decoding="[^"]*"/gi, '');
      return `<img src="${src}"${cleanRest} fetchpriority="high" decoding="async" width="1920" height="1080">`;
    }
  );

  content = content.replace(
    /<img\s+src="([^"]*rutas_banner\.webp)"([^>]*)>/gi,
    (match, src, rest) => {
      let cleanRest = rest
        .replace(/loading="[^"]*"/gi, '')
        .replace(/fetchpriority="[^"]*"/gi, '')
        .replace(/decoding="[^"]*"/gi, '');
      return `<img src="${src}"${cleanRest} fetchpriority="high" decoding="async" width="1920" height="600">`;
    }
  );

  content = content.replace(
    /<img\s+src="([^"]*catedral-hero\.webp)"([^>]*)>/gi,
    (match, src, rest) => {
      let cleanRest = rest
        .replace(/loading="[^"]*"/gi, '')
        .replace(/fetchpriority="[^"]*"/gi, '')
        .replace(/decoding="[^"]*"/gi, '');
      return `<img src="${src}"${cleanRest} fetchpriority="high" decoding="async" width="1920" height="1080">`;
    }
  );

  // 3. Optimizar imágenes secundarias (experiencia, equipo, servicios) con loading="lazy" y decoding="async"
  content = content.replace(
    /<img\s+src="([^"]*home_experiencia\.webp)"([^>]*)>/gi,
    (match, src, rest) => {
      let cleanRest = rest
        .replace(/loading="[^"]*"/gi, '')
        .replace(/decoding="[^"]*"/gi, '');
      return `<img src="${src}"${cleanRest} loading="lazy" decoding="async" width="800" height="533">`;
    }
  );

  content = content.replace(
    /<img\s+src="([^"]*sobre_nosotros_equipo\.webp)"([^>]*)>/gi,
    (match, src, rest) => {
      let cleanRest = rest
        .replace(/loading="[^"]*"/gi, '')
        .replace(/decoding="[^"]*"/gi, '');
      return `<img src="${src}"${cleanRest} loading="lazy" decoding="async" width="800" height="533">`;
    }
  );

  // 4. Corregir cualquier bloque de oficina en los formularios de contacto
  content = content.replace(
    /<div class="flex items-center gap-4 text-white">\s*<div class="w-12 h-12 bg-white\/10 rounded-full flex items-center justify-center">\s*<i class="fa-solid fa-location-dot[^"]*"><\/i>\s*<\/div>\s*<div>\s*<p class="text-sm text-white\/60">(?:Oficina|Escritório|Office)<\/p>\s*<p class="font-semibold">[^<]*<\/p>\s*<\/div>\s*<\/div>/gis,
    ''
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated ${path.relative(rootDir, filePath)}`);
  }
});

console.log('Finished optimizing all HTML files.');
