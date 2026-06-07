document.addEventListener("DOMContentLoaded", () => {
  // --- THEME INITIALIZATION & TOGGLE ---
  const themeToggle = document.getElementById("theme-toggle");
  const logoImg = document.querySelector(".logo img");
  
  const darkLogo = "Images/brand logo/Untitled-design-36-1.png";
  const lightLogo = "Images/brand logo/Untitled_design__31_-removebg-preview.png";

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.classList.add("light-theme");
      document.body.classList.add("light-theme");
      if (logoImg) logoImg.src = lightLogo;
    } else {
      document.documentElement.classList.remove("light-theme");
      document.body.classList.remove("light-theme");
      if (logoImg) logoImg.src = darkLogo;
    }
  }

  // Initial load sync
  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = document.documentElement.classList.contains("light-theme");
      const newTheme = isLight ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  }

  // --- VIDEO CONTROLS ---
  const mediaContainers = document.querySelectorAll(".media-container");
  
  mediaContainers.forEach(container => {
    const video = container.querySelector("video");
    const controlBtn = container.querySelector(".media-control");
    
    if (video && controlBtn) {
      controlBtn.addEventListener("click", () => {
        if (video.muted) {
          video.muted = false;
          video.volume = 1.0;
          controlBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>`;
        } else {
          video.muted = true;
          controlBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zm10.414-6L20 13m0 0l4-4m-4 4l-4 4m4-4l4 4" />
            </svg>`;
        }
      });
    }
  });

  // --- MOBILE NAV TOGGLE ---
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
      document.body.classList.toggle("no-scroll");
    });
  }

  // Handle dropdown toggle on mobile view (width <= 992px)
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const parent = dropdownToggle.parentElement;
        parent.classList.toggle("open");
      }
    });
  }

  // --- SCROLL ANIMATIONS (USING MOTION) ---
  if (typeof Motion !== "undefined") {
    // 1. General scroll-activated element animations
    const elementsToAnimate = [
      ".hero h1", ".hero p", ".circle-step", ".spotlight-main", 
      ".service-column", ".story-left", ".work-card", 
      ".client-statement", ".logo-item"
    ];
    
    elementsToAnimate.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        
        Motion.inView(el, ({ target }) => {
          Motion.animate(
            target,
            { opacity: [0, 1], y: [30, 0] },
            { duration: 0.8, easing: [0.25, 1, 0.5, 1] }
          );
        });
      });
    });

    // 2. Text Reveal (Staggered characters/words) for highlight sections
    const textContainers = document.querySelectorAll(".reveal-text-container");
    textContainers.forEach(container => {
      const spans = container.querySelectorAll("span");
      
      spans.forEach(span => {
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(20px)";
      });
      
      Motion.inView(container, ({ target }) => {
        const targetSpans = target.querySelectorAll("span");
        Motion.animate(
          targetSpans,
          { opacity: [0, 1], y: [20, 0] },
          { 
            delay: Motion.stagger(0.04), 
            duration: 0.8,
            easing: [0.25, 1, 0.5, 1]
          }
        );
      });
    });
  } else {
    // Fallback to basic IntersectionObserver if Motion library is not available
    const animatedElements = document.querySelectorAll(
      ".hero h1, .hero p, .circle-step, .spotlight-main, .service-column, .story-left, .work-card, .client-statement, .logo-item"
    );
    animatedElements.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
    });
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };
    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      });
    }, observerOptions);
    animatedElements.forEach(el => scrollObserver.observe(el));
  }

  // --- SERVICE REDIRECTS ---
  const serviceColumns = document.querySelectorAll(".service-column");
  serviceColumns.forEach(column => {
    column.addEventListener("click", () => {
      const page = column.getAttribute("data-page");
      if (page) {
        document.body.classList.add("page-transition-exit");
        setTimeout(() => window.location.href = page, 400);
      }
    });
  });

  // --- PAGE TRANSITION LINKS ---
  const links = document.querySelectorAll("a[href]");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      // Only intercept internal html links, not hashes or external/mailto
      if (href && href.includes(".html") && !href.startsWith("http")) {
        e.preventDefault();
        document.body.classList.add("page-transition-exit");
        setTimeout(() => window.location.href = href, 400);
      }
    });
  });

  // --- GSAP HERO VIDEO SCROLL TRIGGER ---
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    const mediaContainer = document.querySelector(".media-container");
    const video = document.querySelector("#hero-video");
    
    if (mediaContainer && video) {
      // Scale and round corners of the video container
      gsap.fromTo(mediaContainer, 
        { 
          scale: 0.85,
          borderRadius: "40px"
        },
        {
          scale: 1.0,
          borderRadius: "16px",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom center",
            scrub: true
          }
        }
      );

      // Parallax effect on the video itself
      gsap.fromTo(video, 
        { 
          scale: 1.2,
          yPercent: -10
        },
        {
          scale: 1.0,
          yPercent: 0,
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom center",
            scrub: true
          }
        }
      );
    }
  }
});
