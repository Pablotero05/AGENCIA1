const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadedLogoPath = 'C:\\Users\\Pablo\\.gemini\\antigravity-ide\\brain\\9b0e55d0-ea0a-4080-869d-1f9e6592e021\\.user_uploaded\\media_1791279531408.png';
const assetsDir = path.resolve(__dirname, '..', 'assets');
const rootDir = path.resolve(__dirname, '..');

async function run() {
  console.log('Processing uploaded logo...');
  
  // 1. Trim transparent padding and add balanced clean padding (16px)
  const trimmedBuffer = await sharp(uploadedLogoPath)
    .trim()
    .extend({
      top: 4,
      bottom: 4,
      left: 4,
      right: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();

  const meta = await sharp(trimmedBuffer).metadata();
  console.log(`Trimmed + padded dimensions: ${meta.width}x${meta.height}`);

  // 2. High-res base (up to 800px or keep original trimmed)
  // Let's create high quality PNG and WebP
  const logoPngBuffer = await sharp(trimmedBuffer).png().toBuffer();
  const logoWebpBuffer = await sharp(trimmedBuffer).webp({ quality: 95, effort: 6 }).toBuffer();

  // Save to assets/
  fs.writeFileSync(path.join(assetsDir, 'ststrasp.png'), logoPngBuffer);
  fs.writeFileSync(path.join(assetsDir, 'ststrasp.webp'), logoWebpBuffer);
  fs.writeFileSync(path.join(assetsDir, 'stsLOGO.png'), logoPngBuffer);
  fs.writeFileSync(path.join(assetsDir, 'stsLOGO.webp'), logoWebpBuffer);
  fs.writeFileSync(path.join(assetsDir, 'sts.png'), logoPngBuffer);
  fs.writeFileSync(path.join(assetsDir, 'sts.webp'), logoWebpBuffer);

  // 3. Create the Dark-Mode / Negative variant for dark backgrounds (Footer)
  // The dark navy footprints and text become pure crisp white (#FFFFFF)
  // while the golden-yellow arrow and underline remain yellow
  const { data, info } = await sharp(trimmedBuffer).raw().toBuffer({ resolveWithObject: true });
  const whiteData = Buffer.from(data);
  for (let i = 0; i < whiteData.length; i += 4) {
    const a = whiteData[i + 3];
    if (a > 15) {
      const r = whiteData[i];
      const g = whiteData[i + 1];
      const b = whiteData[i + 2];
      // Yellow arrow: R is high (>160), G is high (>120), B is low (<100)
      const isYellow = (r > 150 && g > 115 && b < 100);
      if (!isYellow) {
        whiteData[i] = 255;
        whiteData[i + 1] = 255;
        whiteData[i + 2] = 255;
      }
    }
  }

  const whiteVariantPng = await sharp(whiteData, {
    raw: { width: info.width, height: info.height, channels: 4 }
  }).png().toBuffer();

  const whiteVariantWebp = await sharp(whiteData, {
    raw: { width: info.width, height: info.height, channels: 4 }
  }).webp({ quality: 95, effort: 6 }).toBuffer();

  fs.writeFileSync(path.join(assetsDir, 'stsLOGO-footer.png'), whiteVariantPng);
  fs.writeFileSync(path.join(assetsDir, 'stsLOGO-footer.webp'), whiteVariantWebp);

  // 4. Generate Favicon (32x32, 64x64, 192x192, 512x512)
  const favicon32 = await sharp(trimmedBuffer).resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const favicon192 = await sharp(trimmedBuffer).resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  
  fs.writeFileSync(path.join(rootDir, 'favicon.ico'), favicon32);
  fs.writeFileSync(path.join(rootDir, 'favicon.png'), favicon192);
  fs.writeFileSync(path.join(assetsDir, 'favicon.ico'), favicon32);
  fs.writeFileSync(path.join(assetsDir, 'favicon.png'), favicon192);

  // 5. Generate Preview composites on light and dark backgrounds
  const scratchDir = path.resolve(__dirname, '..', 'scratch');
  if (!fs.existsSync(scratchDir)) fs.mkdirSync(scratchDir, { recursive: true });

  // Light preview (Header background #EFF4F8)
  await sharp({
    create: { width: 500, height: 400, channels: 4, background: { r: 239, g: 244, b: 248, alpha: 1 } }
  }).composite([{ input: logoPngBuffer, gravity: 'center' }])
    .png()
    .toFile(path.join(scratchDir, 'preview_header_light.png'));

  // Dark preview (Footer background #1A1A2E) with white variant
  await sharp({
    create: { width: 500, height: 400, channels: 4, background: { r: 26, g: 26, b: 46, alpha: 1 } }
  }).composite([{ input: whiteVariantPng, gravity: 'center' }])
    .png()
    .toFile(path.join(scratchDir, 'preview_footer_white.png'));

  // Dark preview with original logo for comparison
  await sharp({
    create: { width: 500, height: 400, channels: 4, background: { r: 26, g: 26, b: 46, alpha: 1 } }
  }).composite([{ input: logoPngBuffer, gravity: 'center' }])
    .png()
    .toFile(path.join(scratchDir, 'preview_footer_original.png'));

  console.log('All logo assets generated successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
