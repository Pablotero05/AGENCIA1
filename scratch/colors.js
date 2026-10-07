const sharp = require('sharp');

async function test() {
  const { data, info } = await sharp('assets/stsLOGO.png').raw().toBuffer({ resolveWithObject: true });
  console.log('info:', info);
  let whiteCount = 0;
  let darkCount = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
    if (a > 100) {
      if (r > 200 && g > 200 && b > 200) whiteCount++;
      if (r < 50 && g < 50 && b < 100) darkCount++;
    }
  }
  console.log('stsLOGO non-alpha: white=', whiteCount, 'dark=', darkCount);

  const t2 = await sharp('assets/ststrasp.png').raw().toBuffer({ resolveWithObject: true });
  let w2 = 0, d2 = 0;
  for (let i = 0; i < t2.data.length; i += 4) {
    const r = t2.data[i], g = t2.data[i+1], b = t2.data[i+2], a = t2.data[i+3];
    if (a > 100) {
      if (r > 200 && g > 200 && b > 200) w2++;
      if (r < 50 && g < 50 && b < 100) d2++;
    }
  }
  console.log('ststrasp non-alpha: white=', w2, 'dark=', d2);
}
test().catch(console.error);
