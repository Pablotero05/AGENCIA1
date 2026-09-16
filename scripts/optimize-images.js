const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.resolve(__dirname, '..', 'assets');

async function optimizeImages() {
  const files = fs.readdirSync(assetsDir);
  console.log(`Analyzing ${files.length} items in assets/...`);

  for (const file of files) {
    const fullPath = path.join(assetsDir, file);
    const stat = fs.statSync(fullPath);
    if (!stat.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const baseName = path.basename(file, ext);
    const targetWebP = path.join(assetsDir, `${baseName}.webp`);

    try {
      const metadata = await sharp(fullPath).metadata();
      let pipeline = sharp(fullPath);

      // Dimensiones máximas según tipo de imagen
      let maxWidth = 1920;
      if (file.includes('hero') || file.includes('catedral') || file.includes('banner')) {
        maxWidth = 1920;
      } else if (file.includes('miniatura') || file.includes('ruta_')) {
        maxWidth = 800;
      } else if (file.includes('service_') || file.includes('experiencia') || file.includes('equipo')) {
        maxWidth = 800;
      } else if (file.includes('logo') || file.includes('sts') || file.includes('ststrasp')) {
        maxWidth = 600;
      }

      if (metadata.width && metadata.width > maxWidth) {
        pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
      }

      // Generar WebP con compresión de alto rendimiento y calidad óptima
      await pipeline
        .webp({ quality: 82, effort: 6 })
        .toFile(targetWebP);

      const oldSize = (stat.size / 1024).toFixed(1);
      const newStat = fs.statSync(targetWebP);
      const newSize = (newStat.size / 1024).toFixed(1);
      const savings = (((stat.size - newStat.size) / stat.size) * 100).toFixed(1);

      console.log(`✓ ${file} (${oldSize} KB) -> ${baseName}.webp (${newSize} KB) [-${savings}%]`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  // Comprobar flags
  const flagsDir = path.join(assetsDir, 'flags');
  if (fs.existsSync(flagsDir)) {
    const flagFiles = fs.readdirSync(flagsDir);
    for (const flag of flagFiles) {
      const fullPath = path.join(flagsDir, flag);
      const ext = path.extname(flag).toLowerCase();
      if (!['.png'].includes(ext)) continue;
      const baseName = path.basename(flag, ext);
      const targetWebP = path.join(flagsDir, `${baseName}.webp`);
      try {
        await sharp(fullPath)
          .resize({ width: 80, withoutEnlargement: true })
          .webp({ quality: 90 })
          .toFile(targetWebP);
        console.log(`✓ Flag ${flag} -> ${baseName}.webp`);
      } catch (err) {
        console.error(`Error processing flag ${flag}:`, err);
      }
    }
  }

  console.log('Finished optimizing all images to WebP.');
}

optimizeImages();
