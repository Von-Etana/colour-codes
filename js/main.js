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

  // --- FOCUS RAIL 3D CAROUSEL CONTROLLER ---
  const focusRailTrack = document.getElementById("focus-rail-track");
  if (focusRailTrack) {
    const items = [
      {
        id: "wales",
        title: "Architectural Renaissance",
        description: "Visual Identity & Brand Guidelines",
        meta: "WALES",
        imageSrc: "assets/wales.png",
        href: "branding.html"
      },
      {
        id: "un-agency",
        title: "Strategic Repositioning",
        description: "Brand Strategy / NGO Heritage / UN Agency",
        meta: "UN AGENCY",
        imageSrc: "assets/future.png",
        href: "#",
        modalTrigger: true
      },
      {
        id: "gunclub",
        title: "Abuja Leisure",
        description: "High-End Corporate Assets",
        meta: "GUN CLUB",
        imageSrc: "assets/gunclub.png",
        href: "branding.html"
      },
      {
        id: "tokyo",
        title: "Neon Tokyo",
        description: "Experience the vibrant nightlife and illuminated streets of Shinjuku.",
        meta: "Urban • Travel",
        imageSrc: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop",
        href: "#"
      },
      {
        id: "nordic",
        title: "Nordic Silence",
        description: "Minimalist architecture meeting the raw beauty of the Icelandic coast.",
        meta: "Design • Nature",
        imageSrc: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1000&auto=format&fit=crop",
        href: "#"
      }
    ];

    const blurImg = document.getElementById("focus-rail-blur-img");
    const metaSpan = document.getElementById("focus-rail-item-meta");
    const titleH3 = document.getElementById("focus-rail-item-title");
    const descP = document.getElementById("focus-rail-item-desc");
    const exploreLink = document.getElementById("focus-rail-explore-link");
    const prevBtn = document.getElementById("focus-rail-prev");
    const nextBtn = document.getElementById("focus-rail-next");
    const indicator = document.getElementById("focus-rail-indicator");
    const stage = document.getElementById("focus-rail-stage");

    let activeIndex = 0;
    const count = items.length;

    // Render cards
    const createCards = () => {
      focusRailTrack.innerHTML = "";
      items.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "focus-rail-card";
        card.dataset.index = index;
        
        const img = document.createElement("img");
        img.src = item.imageSrc;
        img.alt = item.title;
        
        const lighting = document.createElement("div");
        lighting.className = "focus-rail-card-lighting";
        
        const shadow = document.createElement("div");
        shadow.className = "focus-rail-card-shadow";
        
        card.appendChild(img);
        card.appendChild(lighting);
        card.appendChild(shadow);
        
        card.addEventListener("click", () => {
          if (index !== activeIndex) {
            activeIndex = index;
            updateCarousel();
          }
        });
        
        focusRailTrack.appendChild(card);
      });
    };

    const wrapValue = (min, max, v) => {
      const rangeSize = max - min;
      return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
    };

    const updateCarousel = () => {
      const cards = focusRailTrack.querySelectorAll(".focus-rail-card");
      const activeItem = items[activeIndex];

      // Update ambient background image
      if (blurImg) blurImg.src = activeItem.imageSrc;

      // Update details panel with a smooth fade
      const metaContent = document.getElementById("focus-rail-meta-content");
      if (metaContent) {
        metaContent.style.opacity = "0";
        metaContent.style.transform = "translateY(8px)";
        metaContent.style.transition = "opacity 0.25s ease, transform 0.25s ease";

        setTimeout(() => {
          if (metaSpan) metaSpan.textContent = activeItem.meta;
          if (titleH3) titleH3.textContent = activeItem.title;
          if (descP) descP.textContent = activeItem.description || "";
          if (exploreLink) {
            exploreLink.href = activeItem.href;
            if (activeItem.modalTrigger) {
              exploreLink.setAttribute("onclick", "openCaseStudyModal(); return false;");
            } else {
              exploreLink.removeAttribute("onclick");
            }
          }

          metaContent.style.opacity = "1";
          metaContent.style.transform = "translateY(0)";
        }, 250);
      }

      // Update index indicators
      if (indicator) {
        indicator.textContent = `${activeIndex + 1} / ${count}`;
      }

      // Loop through cards and place them based on offsets
      cards.forEach((card, idx) => {
        let offset = idx - activeIndex;
        
        const half = count / 2;
        if (offset > half) offset -= count;
        if (offset < -half) offset += count;

        const isCenter = offset === 0;
        const dist = Math.abs(offset);

        if (dist > 2) {
          card.style.opacity = "0";
          card.style.visibility = "hidden";
          card.style.pointerEvents = "none";
          card.style.transform = `translateX(${offset * 320}px) translateZ(-400px) rotateY(${offset * -20}deg)`;
          return;
        }

        card.style.visibility = "visible";
        card.style.pointerEvents = "all";
        
        const screenWidth = window.innerWidth;
        const spacing = screenWidth < 768 ? 220 : 320;
        
        const xOffset = offset * spacing;
        const zOffset = -dist * 180;
        const scale = isCenter ? 1 : 0.82;
        const rotateY = offset * -22;
        const opacity = isCenter ? 1 : Math.max(0.12, 1 - dist * 0.45);
        const blur = isCenter ? 0 : dist * 6;
        const brightness = isCenter ? 1 : 0.45;
        
        card.style.opacity = opacity;
        card.style.filter = `blur(${blur}px) brightness(${brightness})`;
        card.style.zIndex = 20 - dist;
        card.style.transform = `translateX(${xOffset}px) translateZ(${zOffset}px) scale(${scale}) rotateY(${rotateY}deg)`;
      });
    };

    const handlePrev = () => {
      activeIndex = wrapValue(0, count, activeIndex - 1);
      updateCarousel();
    };

    const handleNext = () => {
      activeIndex = wrapValue(0, count, activeIndex + 1);
      updateCarousel();
    };

    if (prevBtn) prevBtn.addEventListener("click", handlePrev);
    if (nextBtn) nextBtn.addEventListener("click", handleNext);

    // Keyboard listener
    document.addEventListener("keydown", (e) => {
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    });

    // Wheel listener (debounced horizontal scroll)
    let lastWheelTime = 0;
    if (stage) {
      stage.addEventListener("wheel", (e) => {
        const now = Date.now();
        if (now - lastWheelTime < 450) {
          e.preventDefault();
          return;
        }
        
        const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
        const delta = isHorizontal ? e.deltaX : e.deltaY;
        
        if (Math.abs(delta) > 25) {
          e.preventDefault();
          if (delta > 0) {
            handleNext();
          } else {
            handlePrev();
          }
          lastWheelTime = now;
        }
      }, { passive: false });

      // Swipe / drag gestures
      let startX = 0;
      let isDragging = false;
      
      stage.addEventListener("mousedown", (e) => {
        startX = e.clientX;
        isDragging = true;
      });

      document.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diffX = e.clientX - startX;
        if (Math.abs(diffX) > 80) {
          if (diffX > 0) {
            handlePrev();
          } else {
            handleNext();
          }
        }
      });

      stage.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      }, { passive: true });

      stage.addEventListener("touchend", (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diffX = e.changedTouches[0].clientX - startX;
        if (Math.abs(diffX) > 60) {
          if (diffX > 0) {
            handlePrev();
          } else {
            handleNext();
          }
        }
      }, { passive: true });
    }

    // Init
    createCards();
    updateCarousel();
    window.addEventListener("resize", updateCarousel);
  }

  // --- CIRCULAR GALLERY 3D CONTROLLER ---
  const circularGalleryTrack = document.getElementById("circular-gallery-track");
  if (circularGalleryTrack) {
    const galleryItems = [
      {
        common: 'Brand Strategy',
        binomial: 'Visual Systems & Positioning',
        photo: {
          url: 'https://images.unsplash.com/photo-1542744094-3a3121699563?w=900&auto=format&fit=crop&q=80',
          text: 'Brand strategy presentation meeting',
          pos: '50% 35%',
          by: 'Unsplash'
        }
      },
      {
        common: 'Media Production',
        binomial: 'Commercial Photography & Motion',
        photo: {
          url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&auto=format&fit=crop&q=80',
          text: 'Professional camera setup',
          pos: '50% 50%',
          by: 'Unsplash'
        }
      },
      {
        common: 'Corporate Gifting',
        binomial: 'Executive Merchandise & Packaging',
        photo: {
          url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=900&auto=format&fit=crop&q=80',
          text: 'Luxury gift box package',
          pos: '50% 50%',
          by: 'Unsplash'
        }
      },
      {
        common: 'Print & Signage',
        binomial: 'Pantone Precision at Scale',
        photo: {
          url: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=900&auto=format&fit=crop&q=80',
          text: 'Large format printing machine',
          pos: '50% 50%',
          by: 'Unsplash'
        }
      },
      {
        common: 'Corporate Events',
        binomial: 'Summit & Institutional Branding',
        photo: {
          url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&auto=format&fit=crop&q=80',
          text: 'Stage lighting and conference event',
          pos: '50% 40%',
          by: 'Unsplash'
        }
      },
      {
        common: 'Government Parastatals',
        binomial: 'Procurement-Compliant Documentation',
        photo: {
          url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format&fit=crop&q=80',
          text: 'Modern corporate architecture building',
          pos: '50% 30%',
          by: 'Unsplash'
        }
      },
      {
        common: 'Multinational Ventures',
        binomial: 'Global Standards & Local Resonance',
        photo: {
          url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80',
          text: 'Diverse agency team collaborating',
          pos: '50% 50%',
          by: 'Unsplash'
        }
      },
      {
        common: 'Digital Storytelling',
        binomial: 'Interactive Web & Motion Design',
        photo: {
          url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80',
          text: 'Designer working on digital interface',
          pos: '50% 50%',
          by: 'Unsplash'
        }
      }
    ];

    let rotation = 0;
    let isScrolling = false;
    let scrollTimeout = null;
    const radius = window.innerWidth < 768 ? 320 : 520;
    const autoRotateSpeed = 0.05;
    const anglePerItem = 360 / galleryItems.length;

    // Create cards
    circularGalleryTrack.innerHTML = "";
    const cardNodes = galleryItems.map((item, i) => {
      const card = document.createElement("div");
      card.className = "circular-gallery-card";
      card.setAttribute("role", "group");
      card.setAttribute("aria-label", item.common);
      card.style.position = "absolute";
      card.style.width = window.innerWidth < 768 ? "220px" : "280px";
      card.style.height = window.innerWidth < 768 ? "300px" : "380px";
      card.style.left = "50%";
      card.style.top = "50%";
      card.style.marginLeft = window.innerWidth < 768 ? "-110px" : "-140px";
      card.style.marginTop = window.innerWidth < 768 ? "-150px" : "-190px";
      card.style.transition = "opacity 0.3s linear";

      card.innerHTML = `
        <div class="circular-gallery-card-inner" style="position: relative; width: 100%; height: 100%; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.15); background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(12px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);">
          <img src="${item.photo.url}" alt="${item.photo.text}" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: ${item.photo.pos || 'center'};" />
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 16px; background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent); color: #ffffff;">
            <h3 style="font-size: 1.15rem; font-weight: 700; margin: 0 0 4px 0; color: #ffffff;">${item.common}</h3>
            <em style="font-size: 0.85rem; font-style: italic; opacity: 0.8; display: block;">${item.binomial}</em>
            <p style="font-size: 0.75rem; margin-top: 6px; opacity: 0.7;">Photo by: ${item.photo.by}</p>
          </div>
        </div>
      `;
      circularGalleryTrack.appendChild(card);
      return card;
    });

    const updateGalleryTransforms = () => {
      circularGalleryTrack.style.transform = `rotateY(${rotation}deg)`;
      const totalRotation = rotation % 360;

      cardNodes.forEach((card, i) => {
        const itemAngle = i * anglePerItem;
        const relativeAngle = (itemAngle + totalRotation + 360) % 360;
        const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
        const opacity = Math.max(0.35, 1 - (normalizedAngle / 180));
        card.style.transform = `rotateY(${itemAngle}deg) translateZ(${radius}px)`;
        card.style.opacity = opacity;
      });
    };

    const handleScroll = () => {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      rotation = scrollProgress * 360;
      updateGalleryTransforms();

      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const animateAutoRotate = () => {
      if (!isScrolling) {
        rotation += autoRotateSpeed;
        updateGalleryTransforms();
      }
      requestAnimationFrame(animateAutoRotate);
    };

    updateGalleryTransforms();
    requestAnimationFrame(animateAutoRotate);
  }
});
