const sharp = require('sharp');
const fs = require('fs');

async function check() {
  const m1 = await sharp('assets/stsLOGO.png').metadata();
  console.log('stsLOGO.png:', m1);
  const m2 = await sharp('assets/ststrasp.png').metadata();
  console.log('ststrasp.png:', m2);
}
check().catch(console.error);
