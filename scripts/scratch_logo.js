const sharp = require('sharp');
const fs = require('fs');

async function processLogo() {
  const input = 'assets/test-logos/4.png';
  const meta = await sharp(input).metadata();
  console.log('Original metadata:', meta);

  // We want a clean logo image with transparent background and cropped tightly around the graphic.
  // Let's inspect raw pixels to see if background is white:
  const { data, info } = await sharp(input)
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log('Channels:', info.channels, 'Width:', info.width, 'Height:', info.height);

  // Check top-left pixel
  console.log('Top-left pixel:', data[0], data[1], data[2], info.channels > 3 ? data[3] : 'no-alpha');

  // If the background is white (e.g. 255,255,255), we convert white pixels to transparent!
  // And the logo itself is black text/graphics (#000000).
  const newData = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * info.channels];
    const g = data[i * info.channels + 1];
    const b = data[i * info.channels + 2];
    const a = info.channels > 3 ? data[i * info.channels + 3] : 255;

    // Invert lightness to alpha for crisp black-on-white:
    // If pixel is white (255,255,255), alpha = 0.
    // If pixel is black (0,0,0), alpha = 255.
    // Let's compute darkness:
    const lightness = (r + g + b) / 3;
    const alpha = Math.round(255 - lightness);

    // Let's make it pure white with alpha for dark footer, or pure black with alpha for light backgrounds!
    // Since Step To Santiago footer is dark: bg-[var(--dark-background-color)] (#1e293b / #0f172a / dark gray-900),
    // a white logo or a logo that can be inverted / styled will look amazing.
    // But even better: let's export a version with white logo on transparent background AND a version with black logo on transparent background!
    newData[i * 4] = 255;     // R
    newData[i * 4 + 1] = 255; // G
    newData[i * 4 + 2] = 255; // B
    newData[i * 4 + 3] = alpha > 20 ? alpha : 0; // Alpha
  }

  // Trim and save white version
  const whiteBuffer = await sharp(newData, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .trim()
  .webp({ quality: 95 })
  .toFile('assets/oriona-logo-white.webp');

  console.log('Saved white version:', whiteBuffer);

  // Also trim original with threshold
  // First make black on transparent
  const blackData = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * info.channels];
    const g = data[i * info.channels + 1];
    const b = data[i * info.channels + 2];
    const lightness = (r + g + b) / 3;
    const alpha = Math.round(255 - lightness);

    blackData[i * 4] = 0;
    blackData[i * 4 + 1] = 0;
    blackData[i * 4 + 2] = 0;
    blackData[i * 4 + 3] = alpha > 20 ? alpha : 0;
  }

  const blackBuffer = await sharp(blackData, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .trim()
  .webp({ quality: 95 })
  .toFile('assets/oriona-logo-dark.webp');

  console.log('Saved dark version:', blackBuffer);

  // Also save PNG versions for compatibility
  await sharp('assets/oriona-logo-white.webp').png().toFile('assets/oriona-logo-white.png');
  await sharp('assets/oriona-logo-dark.webp').png().toFile('assets/oriona-logo-dark.png');
}

processLogo().catch(console.error);
