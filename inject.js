const fs = require('fs');
let html = fs.readFileSync('d:/ain shams/index.html', 'utf8');
const quotesJs = fs.readFileSync('d:/ain shams/quotes.js', 'utf8');

const newEngine = '/* ============ QUOTES ENGINE ============ */\n' + quotesJs + `
let bannerQuoteIdx = -1;

function showNextBannerQuote(random = false){
  const spec = SPECIALIZATIONS[userProfile.spec] || SPECIALIZATIONS.medicine;
  const lang = userProfile.lang || 'ar';
  let specQuotes = (lang === 'en' && spec.quotesEn && spec.quotesEn.length) ? spec.quotesEn : spec.quotes;
  let generalQuotes = (lang === 'en') ? GENERAL_QUOTES_EN : GENERAL_QUOTES_AR;
  
  // Combine them!
  let allQuotes = [...specQuotes, ...generalQuotes];

  if(random){
    bannerQuoteIdx = Math.floor(Math.random()*allQuotes.length);
  } else {
    bannerQuoteIdx = (bannerQuoteIdx + 1) % allQuotes.length;
  }
  const q = allQuotes[bannerQuoteIdx] || allQuotes[0];
  $('quoteIcon').textContent = spec.icon || '💡';
  $('quoteText').textContent = '"' + q.q + '"';
  $('quoteAuthor').textContent = '— ' + q.by;
}
`;

html = html.replace(/\/\* ============ QUOTES ENGINE ============ \*\/[\s\S]*?function showNextBannerQuote[\s\S]*?\}/, newEngine);
fs.writeFileSync('d:/ain shams/index.html', html);
console.log('Quotes injected successfully!');
