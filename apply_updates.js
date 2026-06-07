const fs = require('fs');
const path = require('path');

const files = ['index.html', 'about.html', 'branding.html', 'media.html', 'gifts.html', 'contact.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Add Printing & Signage to dropdown
    const printDropdownLink = `<li><a href="printing.html">Printing & Signage</a></li>`;
    // Find the end of the dropdown-menu
    content = content.replace(/<li><a href="gifts\.html">Gifts<\/a><\/li>\s*<\/ul>/, `<li><a href="gifts.html">Gifts</a></li>\n          ${printDropdownLink}\n        </ul>`);

    if (file === 'index.html') {
        // 2. Testimonial lighter
        content = content.replace(
            `class="spotlight-main" style="font-size: clamp(1.5rem, 3vw, 2.5rem); max-width: 900px; margin-bottom: 40px;"`,
            `class="spotlight-main testimonial-light" style="max-width: 900px; margin-bottom: 40px;"`
        );
        // Also add reveal class to the highlighted section text
        // "SHAPING Narratives DRIVING Change" -> apply span wrapping
        // The script will just apply .reveal-text-container to sections that should animate
    }

    if (file === 'contact.html') {
        // Add padding class
        content = content.replace(`class="about-hero" style="padding-bottom: 20px;"`, `class="about-hero contact-hero-padding" style="padding-bottom: 20px;"`);
        
        // Social icons
        content = content.replace(
            /<div class="social-links">[\s\S]*?<\/div>/,
            `<div class="social-links">
            <a href="#" aria-label="LinkedIn" style="color: var(--color-blue);"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            <a href="#" aria-label="Twitter" style="color: var(--color-cyan);"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
            <a href="#" aria-label="Instagram" style="color: var(--color-orange);"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.666-.072-4.948c-.2-4.358-2.618-6.78-6.979-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          </div>`
        );
        
        // Mixed font for Contact
        content = content.replace(
            `Let's Build Something <br><span style="color: var(--color-green);">Remarkable</span>`,
            `<span class="font-manrope">L</span>et's <span class="font-manrope">B</span>uild <span class="font-pilowlava">S</span>omething <br><span style="color: var(--color-green);"><span class="font-pilowlava">R</span>ema<span class="font-pilowlava">r</span>kable</span>`
        );
        content = content.replace(`<h1 style="`, `<h1 class="reveal-text-container" style="`);
    }

    if (file === 'about.html') {
        content = content.replace(
            `Telling Stories <br>That <span style="color: var(--color-green);">Shape Markets</span>`,
            `<span class="font-manrope">O</span>ur <span class="font-pilowlava">S</span>to<span class="font-pilowlava">r</span>y <br>And <span style="color: var(--color-green);"><span class="font-manrope">V</span>alu<span class="font-pilowlava">e</span>s</span>`
        );
        content = content.replace(`<h1 style="`, `<h1 class="reveal-text-container" style="`);
    }

    if (file === 'branding.html') {
        content = content.replace(
            `Telling Stories <br>That <span style="color: var(--color-green);">Shape Markets</span>`,
            `<span class="font-manrope">B</span>ran<span class="font-pilowlava">d</span>ing <br>& <span style="color: var(--color-green);"><span class="font-pilowlava">I</span>den<span class="font-pilowlava">t</span>ity</span>`
        );
        content = content.replace(`<h1 style="`, `<h1 class="reveal-text-container" style="`);
    }
    
    if (file === 'media.html') {
        content = content.replace(
            `Creating High-Impact <br><span style="color: var(--color-green);">Media Assets</span>`,
            `<span class="font-pilowlava">M</span>edi<span class="font-manrope">a</span> <br>& <span style="color: var(--color-green);"><span class="font-pilowlava">P</span>roduc<span class="font-manrope">t</span>ion</span>`
        );
        content = content.replace(`<h1 style="`, `<h1 class="reveal-text-container" style="`);
    }
    
    if (file === 'gifts.html') {
        content = content.replace(
            `Curating Premium <br><span style="color: var(--color-green);">Corporate Gifts</span>`,
            `<span class="font-manrope">C</span>orpo<span class="font-pilowlava">r</span>ate <br><span style="color: var(--color-green);"><span class="font-pilowlava">G</span>if<span class="font-manrope">t</span>s</span>`
        );
        content = content.replace(`<h1 style="`, `<h1 class="reveal-text-container" style="`);
    }

    // Wrap highlighted words with reveal-text-container in index.html
    if (file === 'index.html') {
        content = content.replace(`<h2 class="spotlight-main">`, `<h2 class="spotlight-main reveal-text-container">`);
        content = content.replace(`<h2 class="slogan-title">`, `<h2 class="slogan-title reveal-text-container">`);
    }

    fs.writeFileSync(file, content, 'utf8');
});

console.log("HTML updates applied!");
