const sharp = require('sharp');
const path = require('path');

const srcPath = 'C:\\Users\\Pablo\\.gemini\\antigravity-ide\\brain\\9b0e55d0-ea0a-4080-869d-1f9e6592e021\\.user_uploaded\\media_1791279531408.png';

async function testVersions() {
  const img = sharp(srcPath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  
  // Clone data for white text/footprint version
  const whiteData = Buffer.from(data);
  for (let i = 0; i < whiteData.length; i += 4) {
    const a = whiteData[i + 3];
    if (a > 20) {
      const r = whiteData[i];
      const g = whiteData[i + 1];
      const b = whiteData[i + 2];
      
      // If it's the dark blue color (r < 70, g < 100, and not yellow)
      // Yellow arrow has high R and G (R > 180, G > 140, B < 80)
      const isYellow = (r > 150 && g > 120 && b < 100);
      if (!isYellow) {
        // Change dark blue to crisp white (#F8FAFC), preserving alpha
        whiteData[i] = 248;     // R
        whiteData[i + 1] = 250; // G
        whiteData[i + 2] = 252; // B
      }
    }
  }

  // Save the white variant transparent PNG
  await sharp(whiteData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile('scratch/logo_darkmode.png');

  // Create composite on footer background #1A1A2E
  const bg = { create: { width: 500, height: 500, channels: 4, background: { r: 26, g: 26, b: 46, alpha: 1 } } };
  
  // Original on dark bg
  await sharp(bg)
    .composite([{ input: srcPath, top: 0, left: 0 }])
    .png()
    .toFile('scratch/preview_original_on_dark.png');

  // White variant on dark bg
  await sharp(bg)
    .composite([{ input: 'scratch/logo_darkmode.png', top: 0, left: 0 }])
    .png()
    .toFile('scratch/preview_white_on_dark.png');

  console.log('Generated test images in scratch/');
}

testVersions().catch(console.error);
