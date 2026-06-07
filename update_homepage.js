const fs = require('fs');

const path = "c:/Users/DELL/OneDrive/Dokumente/colours&codes/index.html";
let content = fs.readFileSync(path, 'utf8');

// Hero Section
content = content.replace(
  `<h1>Creative Solutions for<br><span style="color: var(--color-green);">Ambitious Brands</span></h1>
    <p>Transforming Your Brand Story through bespoke design, digital media, and premium event execution.</p>`,
  `<h1>Elevating Visions for<br><span style="color: var(--color-green);">Bold Brands</span></h1>
    <p>Redefining your brand narrative through tailored design, digital media, and top-tier event experiences.</p>`
);

// Process Diagram
content = content.replace(
  `<h3 style="color: var(--color-green);">01 / Discover</h3>
        <p>Research, insights and strategy alignment.</p>`,
  `<h3 style="color: var(--color-green);">01 / Unearth</h3>
        <p>Deep research, strategic insights, and core alignment.</p>`
).replace(
  `<h3 style="color: var(--color-blue);">02 / Design</h3>
        <p>Concept design and visual synthesis.</p>`,
  `<h3 style="color: var(--color-blue);">02 / Craft</h3>
        <p>Conceptualizing and synthesizing visual identity.</p>`
).replace(
  `<h3 style="color: var(--color-yellow);">03 / Deliver</h3>
        <p>Execution, media rollout and delivery.</p>`,
  `<h3 style="color: var(--color-yellow);">03 / Launch</h3>
        <p>Flawless execution, media deployment, and final handover.</p>`
);

// Headline Spotlight (also updating font class directly here)
content = content.replace(
  `The Activities, Impact <br>
      & Achievements Of <span class="highlight-green"><span class="font-asenpro">IN</span><span class="font-pilowlava">FLU</span><span class="font-asenpro">EN</span><span class="font-pilowlava">TIAL</span></span> <br>
      <div class="inline-badge"><img src="assets/wales.png" alt="Creative"></div> Individuals, 
      <span class="highlight-yellow"><span class="font-asenpro">EL</span><span class="font-pilowlava">ITE</span></span> Organisations <br>
      + Pivotal Government <span class="highlight-orange"><span class="font-asenpro">EN</span><span class="font-pilowlava">TIT</span><span class="font-asenpro">IES</span></span>.`,
  `The Ventures, Influence <br>
      & Milestones Of <span class="highlight-green"><span class="font-manrope">IN</span><span class="font-pilowlava">FLU</span><span class="font-manrope">EN</span><span class="font-pilowlava">TIAL</span></span> <br>
      <div class="inline-badge"><img src="assets/wales.png" alt="Creative"></div> Figures, 
      <span class="highlight-yellow"><span class="font-manrope">EL</span><span class="font-pilowlava">ITE</span></span> Corporations <br>
      + Key Government <span class="highlight-orange"><span class="font-manrope">EN</span><span class="font-pilowlava">TIT</span><span class="font-manrope">IES</span></span>.`
);

// Story Split
content = content.replace(
  `<span class="span-outline">Your Story,</span>
        <span class="span-green">Greatest</span>
        <span>Legacy.</span>
      </h2>
      <p style="color: var(--text-muted);">
        Every identity has a narrative. At Colours and Codes, we take the threads of your organization's vision and weave them into premium, high-impact assets that stand out in modern landscapes.
      </p>`,
  `<span class="span-outline">Your Narrative,</span>
        <span class="span-green">Lasting</span>
        <span>Legacy.</span>
      </h2>
      <p style="color: var(--text-muted);">
        Every brand possesses a unique tale. At Colours and Codes, we gather the essence of your vision and craft it into premium, striking assets built for the modern era.
      </p>`
);

// Featured Work
content = content.replace(
  `<h3>Architectural Rebrand</h3>
          <p>Visual Guidelines & Identity Design</p>`,
  `<h3>Architectural Renaissance</h3>
          <p>Visual Identity & Brand Guidelines</p>`
).replace(
  `<h3>The Next Era</h3>
          <p>Digital Media & Identity Rollout</p>`,
  `<h3>The New Frontier</h3>
          <p>Digital Strategy & Identity Deployment</p>`
).replace(
  `<h3>Abuja Recreational</h3>
          <p>Premium Corporate Materials</p>`,
  `<h3>Abuja Leisure</h3>
          <p>High-End Corporate Assets</p>`
);

// Trust / Client Section
content = content.replace(
  `With A <span class="text-yellow-lime font-pilowlava">U</span><span class="text-yellow-lime">nited</span> <span class="text-yellow-lime font-pilowlava">F</span><span class="text-yellow-lime">ront</span>, We Honour Our Clients With <span class="text-lime-green font-pilowlava">CO</span><span class="text-lime-green">nfidential</span> <span class="text-lime-green font-pilowlava">PARTN</span><span class="text-lime-green">erships</span> While Serving Them With <span class="font-pilowlava">U</span>nparalleled <span class="font-pilowlava">CREAT</span>ivity Backed By <span class="font-pilowlava">S</span>trategic In<span class="font-pilowlava">si</span><span class="font-pilowlava">gh</span>ts, And <span class="font-pilowlava">TE</span>chnical expertise`,
  `Standing <span class="text-yellow-lime font-pilowlava">U</span><span class="text-yellow-lime">nited</span>, We Value Our Clients Through <span class="text-lime-green font-pilowlava">CO</span><span class="text-lime-green">nfidential</span> <span class="text-lime-green font-pilowlava">PARTN</span><span class="text-lime-green">erships</span> While Delivering <span class="font-pilowlava">U</span>nrivaled <span class="font-pilowlava">CREAT</span>ivity Supported By <span class="font-pilowlava">S</span>trategic In<span class="font-pilowlava">si</span><span class="font-pilowlava">gh</span>ts And <span class="font-pilowlava">TE</span>chnical Mastery`
);

// Testimonials
content = content.replace(
  `"Colours and Codes took our legacy brand and turned it into an industry authority in Nigeria. Their media assets are world-class."`,
  `"Colours and Codes revitalized our legacy brand, transforming it into a leading industry voice in Nigeria. Their media production is truly world-class."`
);

// Slogan Banner
content = content.replace(
  `CREATING<br>
      <span class="font-pilowlava">S</span>t<span class="star-o-container"><svg class="star-o" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><line x1="12" y1="2" x2="12" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line><line x1="4.93" y1="19.07" x2="19.07" y2="4.93"></line><line x1="8.5" y1="2.5" x2="15.5" y2="21.5"></line><line x1="2.5" y1="8.5" x2="21.5" y2="15.5"></line></svg></span>r<span class="font-pilowlava">i</span>es<br>
      <span class="text-lime-green">LEADING</span><br>`,
  `SHAPING<br>
      <span class="font-pilowlava">N</span>a<span class="star-o-container"><svg class="star-o" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><line x1="12" y1="2" x2="12" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line><line x1="4.93" y1="19.07" x2="19.07" y2="4.93"></line><line x1="8.5" y1="2.5" x2="15.5" y2="21.5"></line><line x1="2.5" y1="8.5" x2="21.5" y2="15.5"></line></svg></span>r<span class="font-pilowlava">r</span>atives<br>
      <span class="text-lime-green">DRIVING</span><br>`
);

// Final sweep of Asenpro classes just in case
content = content.replace(/font-asenpro/g, 'font-manrope');

fs.writeFileSync(path, content, 'utf8');
console.log("Updated index.html");
