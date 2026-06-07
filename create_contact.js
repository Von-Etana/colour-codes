const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/DELL/OneDrive/Dokumente/colours&codes';
const aboutPath = path.join(dir, 'about.html');
const contactPath = path.join(dir, 'contact.html');

let content = fs.readFileSync(aboutPath, 'utf8');

// replace title
content = content.replace(/<title>.*?<\/title>/, '<title>Contact Us | Colours and Codes</title>');

// replace active nav
content = content.replace(/<li><a href="about.html" class="active">About<\/a><\/li>/, '<li><a href="about.html">About</a></li>');
content = content.replace(/<li><a href="contact.html">Contact<\/a><\/li>/, '<li><a href="contact.html" class="active">Contact</a></li>');

// replace main content between </nav> and <!-- MAIN FOOTER -->
const mainContentRegex = /<\/nav>[\s\S]*?<!-- MAIN FOOTER -->/;

const newMainContent = `</nav>

  <!-- CONTACT HERO -->
  <section style="padding: 160px 6% 60px; max-width: 1400px; margin: 0 auto; text-align: left;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;">
      <div>
        <h1 style="font-size: clamp(3rem, 5vw, 4rem); margin-bottom: 24px; color: var(--color-blue);"><span class="highlight">Get in Touch</span></h1>
        <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 40px;">
          Ready to transform your brand story? Let's talk about your next big project. Reach out to us through our studio in Lagos or office in Abuja.
        </p>
        
        <div style="background: var(--bg-secondary); padding: 40px; border-radius: var(--border-radius-lg); border: 1px solid rgba(255, 255, 255, 0.05); margin-bottom: 32px;">
          <h3 style="color: var(--color-green); margin-bottom: 16px; font-size: 1.5rem;">Abuja Office</h3>
          <p style="color: var(--text-muted); margin-bottom: 16px;">
            Suite FF002, Neighborhood Centre, Area 3,<br>
            Garki. Abuja. FCT.
          </p>
          <p style="margin-bottom: 8px;"><a href="mailto:reachus@colourandcodes.ng" style="color: var(--text-main); font-weight: 600;">reachus@colourandcodes.ng</a></p>
          <p><a href="tel:+2348096299096" style="color: var(--text-main); font-weight: 600;">+234-809-629-9096</a></p>
        </div>
      </div>

      <!-- CONTACT FORM -->
      <div style="background: var(--bg-secondary); padding: 40px; border-radius: var(--border-radius-lg); border: 1px solid rgba(255, 255, 255, 0.05);">
        <h2 style="font-size: 2rem; margin-bottom: 32px;">Send a Message</h2>
        <form style="display: flex; flex-direction: column; gap: 20px;">
          <div>
            <label style="display: block; margin-bottom: 8px; color: var(--text-muted); font-size: 0.9rem;">Name</label>
            <input type="text" style="width: 100%; padding: 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white;" placeholder="Your Name">
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px; color: var(--text-muted); font-size: 0.9rem;">Email</label>
            <input type="email" style="width: 100%; padding: 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white;" placeholder="your.email@example.com">
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px; color: var(--text-muted); font-size: 0.9rem;">Service Interested In</label>
            <select style="width: 100%; padding: 14px; background: rgba(0, 11, 26, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white;">
              <option>Branding</option>
              <option>Media Services</option>
              <option>Corporate Gifts</option>
              <option>Events Planning</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px; color: var(--text-muted); font-size: 0.9rem;">Message</label>
            <textarea style="width: 100%; padding: 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white; min-height: 150px; resize: vertical;" placeholder="Tell us about your project..."></textarea>
          </div>
          <button type="button" class="btn-pill" style="margin-top: 10px; width: 100%; font-size: 1rem;">Send Message</button>
        </form>
      </div>
    </div>
  </section>

  <!-- MAIN FOOTER -->`;

content = content.replace(mainContentRegex, newMainContent);

// Optional: remove styles that were specific to about.html
content = content.replace(/<style>[\s\S]*?<\/style>/, '');

fs.writeFileSync(contactPath, content);
console.log("contact.html created.");
