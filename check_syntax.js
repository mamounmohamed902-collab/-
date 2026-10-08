const fs = require('fs');
const html = fs.readFileSync('d:/ain shams/index.html', 'utf8');

// Extract just the JS between <script> and </script>
const scriptStart = html.indexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const scriptContent = html.substring(scriptStart + 8, scriptEnd);

// Write it to a temp .js file to syntax-check it
fs.writeFileSync('d:/ain shams/temp_check.js', scriptContent);
console.log('Script extracted, length:', scriptContent.length);
