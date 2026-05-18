const fs = require('fs');
const path = require('path');

function walk(d) {
  fs.readdirSync(d).forEach(f => {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.html')) {
      let c = fs.readFileSync(p, 'utf8');
      const original = c;
      // Tratar diferentes espacios y comillas
      c = c.replace(/<script\s+src="([^"]*sts-header\.js)"\s+defer><\/script>/g, '<script src="$1"></script>');
      if (c !== original) {
        fs.writeFileSync(p, c);
        console.log('Modified', p);
      }
    }
  });
}

walk(process.cwd());
