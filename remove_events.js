const fs = require('fs');

const files = ['index.html', 'about.html', 'branding.html', 'media.html', 'gifts.html', 'contact.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove from dropdown
    content = content.replace(/[ \t]*<li><a href="events\.html".*?<\/a><\/li>[ \t]*\r?\n?/g, '');
    
    // Remove from footer
    content = content.replace(/[ \t]*<li><a href="events\.html">Events Planning<\/a><\/li>[ \t]*\r?\n?/g, '');

    // For index.html, remove the whole events column
    if (file === 'index.html') {
        const eventsColumnRegex = /[ \t]*<!-- Events Column -->[\s\S]*?<div class="service-column" data-page="events\.html">[\s\S]*?<\/div>[ \t]*\r?\n?/g;
        content = content.replace(eventsColumnRegex, '');

        // Update numbering for Prints
        content = content.replace(
            /<!-- Prints Column \(Linked to Branding as a fallback or sub-page\) -->\s*<div class="service-column" data-page="branding\.html">\s*<span class="service-num">05<\/span>/g,
            `<!-- Prints Column (Linked to Branding as a fallback or sub-page) -->
      <div class="service-column" data-page="branding.html">
        <span class="service-num">04</span>`
        );
    }

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Events removed from all files.");
