// =====================================================
// SPLASH SCREEN — Horizontal Formation with Delayed Text
// =====================================================
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  if (!splash) return;

  const imagesContainer = splash.querySelector(".splash-images");

  const hasNav = sessionStorage.getItem("navClick");
  const visitCount = parseInt(localStorage.getItem("visitCount") || "0");
  const referrer = document.referrer;

  localStorage.setItem("visitCount", visitCount + 1);

  const isFirstVisit = visitCount === 0;
  const refreshedAfter10 = visitCount % 10 === 0;
  const fromExternal = referrer && !referrer.includes(window.location.hostname);
  const shouldShowSplash = isFirstVisit || refreshedAfter10 || fromExternal;

  if (!shouldShowSplash || hasNav === "true") {
    splash.remove();
    // Apply saved theme immediately when splash is skipped
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-mode");
    }
    return;
  }

  // Apply saved theme to splash screen background
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    splash.style.background = "#fff";
    const splashTitle = splash.querySelector(".splash-title");
    const enterHint = splash.querySelector(".enter-hint");
    if (splashTitle) splashTitle.style.color = "#000";
    if (enterHint) enterHint.style.color = "rgba(0,0,0,0.7)";
  }

  // Step 1: Images fade in (handled by CSS animation)
  // Step 2: Smoothly spread into horizontal line from center
  setTimeout(() => {
    imagesContainer.classList.add("splash-line");
  }, 5200);

  // Step 3: Fade in title + enter text right after line finishes
  setTimeout(() => {
    splash.classList.add("splash-visible");
  }, 6200);

  // Step 4: Close splash
  function closeSplash() {
    splash.classList.add("fade-out");
    setTimeout(() => {
      splash.remove();
      // Apply saved theme after splash closes
      if (savedTheme === "light") {
        document.body.classList.add("light-mode");
      }
    }, 1400);
  }

  splash.addEventListener("click", closeSplash);
  window.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") closeSplash();
  });
  window.addEventListener("wheel", closeSplash, { once: true });

  sessionStorage.removeItem("navClick");
});

// =====================================================
// NAVBAR HIGHLIGHT
// =====================================================
const navLinks = document.querySelectorAll('nav a');

// Highlight the current page link on load
const currentPage = window.location.pathname.split("/").pop();

// Only highlight if the page matches a navbar link
navLinks.forEach(link => {
  const href = link.getAttribute('href').split("/").pop();
  if (href === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// Highlight clicked link (optional)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});


// =====================================================
// LIGHT / DARK MODE TOGGLE (WORKS ON ALL DEVICES)
// =====================================================
const toggleBtn = document.getElementById("themeToggle");

if (toggleBtn) {
  // Load saved theme preference on page load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Function to toggle theme
  function toggleTheme(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");

    toggleBtn.innerHTML = isLight
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';

    // Save preference
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }

  // Desktop: mousedown for immediate response
  toggleBtn.addEventListener("mousedown", function(e) {
    toggleTheme(e);
  });

  // Mobile: touchend for reliable tap detection
  toggleBtn.addEventListener("touchend", function(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme(e);
  }, { passive: false });

  // Prevent click event from firing after touch
  toggleBtn.addEventListener("click", function(e) {
    e.preventDefault();
  });

  // Make button touch-friendly
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.style.userSelect = 'none';
  toggleBtn.style.webkitTapHighlightColor = 'transparent';
  toggleBtn.style.touchAction = 'manipulation';
}


// =====================================================
// Homepage: PROJECTS — Brighten Text on Scroll
// =====================================================
const projectsSection = document.querySelector('.projects.container');
const projectsHeader = document.querySelector('.section-header-large');
const projectTexts = document.querySelectorAll('.project-text h1, .project-text p');

if (projectsSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // brighten text when section in view
          projectsHeader.classList.add('active');
          projectTexts.forEach(el => el.classList.add('active'));
        } else {
          // return to dimmed state when out of view
          projectsHeader.classList.remove('active');
          projectTexts.forEach(el => el.classList.remove('active'));
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(projectsSection);
}

// =====================================================
// EXPLORATORY WORK — Brighten Text on Scroll
// =====================================================
const exploratoryHeader = document.querySelector('#exploratory-header');
const exploratoryItems = document.querySelectorAll('.exploratory-item');

exploratoryItems.forEach(item => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Brighten header and item
          if (exploratoryHeader) exploratoryHeader.classList.add('active');
          item.classList.add('active');
          item.querySelector('h3').classList.add('active');
          item.querySelector('p').classList.add('active');
        } else {
          // Remove brightening if you want it to revert
          if (exploratoryHeader) exploratoryHeader.classList.remove('active');
          item.classList.remove('active');
          item.querySelector('h3').classList.remove('active');
          item.querySelector('p').classList.remove('active');
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(item);
});

// =====================================================
// ABOUT PAGE — Brighten Text on Scroll
// =====================================================
const aboutPage = document.querySelector('.about-intro-wrapper') || document.querySelector('.about-section');

if (aboutPage) {
  // Target all text elements on about page
  const aboutElements = document.querySelectorAll(
    '.about-intro-wrapper h1, .about-intro-wrapper p, ' +
    '.about-section h1, .about-section h2, .about-section p, ' +
    '.experience-section h2, .experience-item h3, .experience-item p, .experience-date'
  );

  aboutElements.forEach(element => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(element);
  });
}

// =====================================================
// Actual Project Full Page Scroll Fade (FIXED - EXCLUDES CAROUSEL)
// =====================================================

const projectPage = document.querySelector('.project-page');

if (projectPage) {
  // Select all fadeable elements BUT EXCLUDE carousel images
  const fadeElements = projectPage.querySelectorAll(
    'h1, h2, h3, p, li, .project-meta, .design-content, video, i, img:not(.carousel img)'
  );

  function fadeOnScrollFull() {
    const windowH = window.innerHeight;
    const isLightMode = document.body.classList.contains('light-mode');

    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const fadeStart = 150; // fade slightly before entering viewport
      const opacityFactor = Math.min(Math.max((windowH - rect.top + fadeStart) / windowH, 0.4), 1);

      // Apply opacity for media elements (video, img)
      if (el.tagName === 'VIDEO' || el.tagName === 'IMG') {
        el.style.opacity = opacityFactor;
      } else {
        // Text fade (colour adjustment)
        if (isLightMode) {
          el.style.color = `rgba(0,0,0,${opacityFactor})`;
        } else {
          el.style.color = `rgba(255,255,255,${opacityFactor})`;
        }
      }
    });
  }

  // Trigger fade on scroll
  window.addEventListener('scroll', fadeOnScrollFull);

  // Trigger once in case page is not at top
  fadeOnScrollFull();
}

// =====================================================
// Map expansions
// =====================================================

const images = document.querySelectorAll('.click-expand-img');
const overlay = document.getElementById('imgOverlay');
const overlayImg = document.getElementById('overlayImg');

if (overlay && overlayImg) {
  images.forEach(img => {
    img.addEventListener('click', () => {
      overlay.style.display = 'flex';
      overlayImg.src = img.src;
    });
  });

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
}


// =====================================================
// UNIVERSAL CAROUSEL SCRIPT (handles multiple carousels)
// =====================================================
document.addEventListener("DOMContentLoaded", function() {
  console.log("🎠 Carousel Script Initializing...");
  
  const carousels = document.querySelectorAll('.carousel');
  console.log(`Found ${carousels.length} carousel(s)`);
  
  carousels.forEach((carousel, carouselIndex) => {
    const carouselInner = carousel.querySelector('.carousel-inner');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');

    if (!carouselInner) {
      console.error(`❌ Carousel ${carouselIndex}: Missing .carousel-inner`);
      return;
    }
    if (!prevBtn) {
      console.error(`❌ Carousel ${carouselIndex}: Missing .prev button`);
      return;
    }
    if (!nextBtn) {
      console.error(`❌ Carousel ${carouselIndex}: Missing .next button`);
      return;
    }

    const totalImages = carouselInner.children.length;
    console.log(`✅ Carousel ${carouselIndex}: Found ${totalImages} images`);
    
    let currentIndex = 0;

    function updateCarousel() {
      const offset = -currentIndex * 100;
      carouselInner.style.transform = `translateX(${offset}%)`;
      console.log(`📍 Carousel ${carouselIndex} → Image ${currentIndex + 1}/${totalImages}`);
    }

    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(`◀️ Prev button clicked on carousel ${carouselIndex}`);
      
      currentIndex = (currentIndex <= 0) ? totalImages - 1 : currentIndex - 1;
      updateCarousel();
    });

    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(`▶️ Next button clicked on carousel ${carouselIndex}`);
      
      currentIndex = (currentIndex >= totalImages - 1) ? 0 : currentIndex + 1;
      updateCarousel();
    });

    // Add touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next image
        currentIndex = (currentIndex >= totalImages - 1) ? 0 : currentIndex + 1;
        updateCarousel();
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous image
        currentIndex = (currentIndex <= 0) ? totalImages - 1 : currentIndex - 1;
        updateCarousel();
      }
    }
    
    // Initialize at first image
    updateCarousel();
    console.log(`✅ Carousel ${carouselIndex} initialized successfully!`);
  });
  
  console.log("🎉 All carousels initialized!");
});