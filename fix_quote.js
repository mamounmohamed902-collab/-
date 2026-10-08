const fs = require('fs');
let html = fs.readFileSync('d:/ain shams/index.html', 'utf8');
const lines = html.split('\n');
// Fix line 3021 (index 3020)
const oldLine = lines[3020];
console.log('Old line:', oldLine);
lines[3020] = "  { q: 'Whoever does not taste the bitterness of learning for an hour, will swallow the humiliation of ignorance for a lifetime.', by: \"Imam Al-Shafi'i\" },";
console.log('New line:', lines[3020]);
html = lines.join('\n');
fs.writeFileSync('d:/ain shams/index.html', html);
console.log('Fixed!');
