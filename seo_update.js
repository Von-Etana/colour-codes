const fs = require('fs');
const path = require('path');

const files = ['index.html', 'about.html', 'branding.html', 'media.html', 'gifts.html', 'contact.html', 'printing.html'];

const descriptions = {
  'index.html': 'Colours and Codes is a premier Nigerian branding, media, corporate gifts, and printing agency creating ambitious brand stories.',
  'about.html': 'Discover the history, core values, and creative methodology behind the Colours and Codes agency.',
  'branding.html': 'Premium logo design, visual identity guidelines, tone of voice systems, and packaging design in Nigeria.',
  'media.html': 'Cinematography, corporate video production, commercial photography, and storytelling across Nigeria.',
  'gifts.html': 'Premium corporate gifts curation, custom branding, and logistics management across Nigeria.',
  'contact.html': 'Get in touch with Colours and Codes for your next creative, media, or branding project in Nigeria.',
  'printing.html': 'Premium large format printing, stationery, 3D signs, and wayfinding systems in Nigeria.'
};

const headings = {
  'branding.html': {
    oldRegex: /<h1[^>]*>.*?<\/h1>/i,
    newText: `<h1 class="reveal-text-container"><span class="font-manrope">B</span>ran<span class="font-pilowlava">d</span>ing <br>& <span style="color: var(--color-green);"><span class="font-pilowlava">I</span>den<span class="font-pilowlava">t</span>ity</span></h1>`
  },
  'media.html': {
    oldRegex: /<h1[^>]*>.*?<\/h1>/i,
    newText: `<h1 class="reveal-text-container"><span class="font-pilowlava">M</span>edi<span class="font-manrope">a</span> <br>& <span style="color: var(--color-green);"><span class="font-pilowlava">P</span>roduc<span class="font-manrope">t</span>ion</span></h1>`
  },
  'gifts.html': {
    oldRegex: /<h1[^>]*>.*?<\/h1>/i,
    newText: `<h1 class="reveal-text-container"><span class="font-manrope">C</span>orpo<span class="font-pilowlava">r</span>ate <br><span style="color: var(--color-green);"><span class="font-pilowlava">G</span>if<span class="font-manrope">t</span>s</span></h1>`
  }
};

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace description
  const descRegex = /<meta\s+name="description"\s+content="[^"]*">/i;
  const newDesc = `<meta name="description" content="${descriptions[file]}">`;
  
  if (descRegex.test(content)) {
    content = content.replace(descRegex, newDesc);
  } else {
    // If no description exists, put it after <title>
    content = content.replace(/(<title>.*?<\/title>)/i, `$1\n  ${newDesc}`);
  }

  // Get current title for OG tags
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : 'Colours and Codes';

  // Add OG tags and favicon if not present
  if (!content.includes('og:title')) {
    const ogTags = `
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${descriptions[file]}">
  <meta property="og:image" content="assets/hero.png">
  <meta property="og:url" content="https://colourandcodes.ng/${file}">
  <meta property="og:type" content="website">
  <link rel="icon" href="Images/brand logo/Untitled-design-36-1.png" type="image/png">`;
    
    // Insert after description
    content = content.replace(/(<meta name="description" content="[^"]*">)/i, `$1${ogTags}`);
  }

  // Replace headings if applicable
  if (headings[file]) {
    content = content.replace(headings[file].oldRegex, headings[file].newText);
  }

  // Add .page-transition-enter class to body to allow for smooth transitions
  if (!content.includes('class="page-transition-enter"')) {
    content = content.replace(/<body>/i, '<body class="page-transition-enter">');
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log("SEO, OG Tags, and Heading updates completed successfully!");
