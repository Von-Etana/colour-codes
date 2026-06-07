const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/DELL/OneDrive/Dokumente/colours&codes';

const files = ['index.html', 'about.html', 'branding.html', 'media.html', 'gifts.html', 'events.html'];

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace Navbar
    const navRegex = /<ul class="nav-links">[\s\S]*?<\/ul>/;
    let newNav = `<ul class="nav-links">
      <li><a href="index.html"${file === 'index.html' ? ' class="active"' : ''}>Home</a></li>
      <li><a href="about.html"${file === 'about.html' ? ' class="active"' : ''}>About</a></li>
      <li class="dropdown">
        <a href="#" class="dropdown-toggle${['branding.html', 'media.html', 'gifts.html', 'events.html'].includes(file) ? ' active' : ''}">What We Do</a>
        <ul class="dropdown-menu">
          <li><a href="branding.html"${file === 'branding.html' ? ' class="active"' : ''}>Branding</a></li>
          <li><a href="media.html"${file === 'media.html' ? ' class="active"' : ''}>Media</a></li>
          <li><a href="gifts.html"${file === 'gifts.html' ? ' class="active"' : ''}>Gifts</a></li>
          <li><a href="events.html"${file === 'events.html' ? ' class="active"' : ''}>Events</a></li>
        </ul>
      </li>
      <li><a href="contact.html">Contact</a></li>
    </ul>`;
    
    content = content.replace(navRegex, newNav);

    // Replace Footer Agency Links
    const agencyRegex = /<h4>Agency<\/h4>\s*<ul class="footer-links">\s*<li><a href="about\.html">Our Story<\/a><\/li>\s*<li><a href="about\.html#team">The Team<\/a><\/li>\s*<li><a href="about\.html#process">Our Process<\/a><\/li>\s*<\/ul>/;
    
    let newAgency = `<h4>Agency</h4>
        <ul class="footer-links">
          <li><a href="about.html">Our Story</a></li>
          <li><a href="about.html#team">The Team</a></li>
          <li><a href="about.html#process">Our Process</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>`;
    
    content = content.replace(agencyRegex, newAgency);

    // Replace Footer Locations
    const locationsRegex = /<h4>Locations<\/h4>\s*<address class="footer-address">[\s\S]*?<\/address>/;
    let newLocations = `<h4>OFFICE</h4>
        <address class="footer-address">
          Suite FF002, Neighborhood Centre, Area 3,<br>
          Garki. Abuja. FCT.<br>
          <br>
          <a href="mailto:reachus@colourandcodes.ng">reachus@colourandcodes.ng</a><br>
          <a href="tel:+2348096299096">+234-809-629-9096</a>
        </address>`;

    content = content.replace(locationsRegex, newLocations);

    fs.writeFileSync(filePath, content);
});

console.log("Updated HTML files.");
