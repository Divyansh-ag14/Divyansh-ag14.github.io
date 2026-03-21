/* ============================================
   Portfolio Main JavaScript
   ============================================ */

/* ===== 1. PARTICLES CANVAS ===== */
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width, height;
  const colors = ['#667eea', '#764ba2', '#38bdf8', '#4facfe', '#a78bfa', '#818cf8'];
  const PARTICLE_COUNT = 50;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.2 + 0.08,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseOffset: Math.random() * Math.PI * 2,
    };
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  let time = 0;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    time += 1;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Gentle pulse effect
      const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.3 + 0.7;
      const currentSize = p.size * pulse;

      ctx.beginPath();
      ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity * pulse;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = 0.04 * (1 - dist / 160);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  init();
  animate();
  window.addEventListener('resize', function () {
    resize();
  });
})();


/* ===== 2. MOUSE FOLLOWER + CUSTOM CURSOR ===== */
(function () {
  var glow = document.querySelector('.mouse-glow');

  // Only enable custom cursor on hover-capable devices
  var hasHover = window.matchMedia('(hover: hover)').matches;
  if (!hasHover) return;

  var mouseX = -100;
  var mouseY = -100;
  var ringX = -100;
  var ringY = -100;
  var glowX = -100;
  var glowY = -100;

  // Create cursor elements
  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  var ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(ring);

  // Track mouse position
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hover detection for interactive elements
  var hoverSelectors = 'a, button, .skill-card, .timeline-content, .cert-card, .featured-card, .blog-card, .wid-card, .project-card, .btn';

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(hoverSelectors)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(hoverSelectors)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  function update() {
    // Dot follows exactly
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';

    // Ring follows with lerp (easing)
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    // Original mouse glow follows with lerp
    if (glow) {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      glow.style.transform = 'translate(-50%, -50%)';
    }

    requestAnimationFrame(update);
  }

  update();
})();


/* ===== 3. NAVBAR ===== */
(function () {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }
})();


/* ===== 4. SCROLL PROGRESS BAR ===== */
(function () {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', function () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = percent + '%';
  });
})();


/* ===== 5. SCROLL REVEAL (Intersection Observer) ===== */
(function () {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '-60px', threshold: 0.1 }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ===== 6. TYPING ANIMATION ===== */
(function () {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const roles = ['Data Engineering', 'Data Science', 'Machine Learning', 'LLMs', 'Agentic AI'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const current = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      el.textContent = current.substring(0, charIndex);
    } else {
      charIndex++;
      el.textContent = current.substring(0, charIndex);
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 200;
    }

    setTimeout(tick, delay);
  }

  tick();
})();


/* ===== 7. ACTIVE NAV LINK HIGHLIGHT ===== */
(function () {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          document.querySelectorAll('.nav-link').forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-30% 0px -70% 0px' }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();


/* ===== 8. DARK MODE TOGGLE ===== */
(function () {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  const saved = localStorage.getItem('theme');
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
})();


/* ===== 9. ANIMATED STATS COUNTERS ===== */
(function () {
  const stats = document.querySelectorAll('.stat-number[data-target]');
  if (!stats.length) return;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  stats.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ===== 10. MEDIUM BLOG FEED ===== */
(function () {
  const grid = document.getElementById('blog-grid');
  const skeleton = document.getElementById('blog-skeleton');
  if (!grid) return;

  const feedUrl =
    'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@divyanshagarwal188';

  function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function extractImage(content) {
    const match = content.match(/<img[^>]+src=["']([^"']+)["']/);
    return match ? match[1] : '';
  }

  function createCard(item) {
    const image = item.thumbnail || extractImage(item.content || item.description || '');
    const excerpt = stripHtml(item.description || '').substring(0, 120) + '...';
    const date = formatDate(item.pubDate);

    const card = document.createElement('div');
    card.className = 'blog-card reveal';

    const imgHtml = image
      ? '<div class="blog-card-image"><img src="' +
        image +
        '" alt="' +
        (item.title || '').replace(/"/g, '&quot;') +
        '" loading="lazy"></div>'
      : '';

    card.innerHTML =
      imgHtml +
      '<div class="blog-card-content">' +
      '<span class="blog-card-date">' + date + '</span>' +
      '<h3 class="blog-card-title">' + (item.title || '') + '</h3>' +
      '<p class="blog-card-excerpt">' + excerpt + '</p>' +
      '<a href="' + item.link + '" target="_blank" rel="noopener noreferrer" class="blog-card-link">Read more &rarr;</a>' +
      '</div>';

    return card;
  }

  fetch(feedUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data.status !== 'ok' || !data.items || !data.items.length) {
        throw new Error('No items');
      }

      const items = data.items.slice(0, 6);

      if (skeleton) skeleton.remove();

      items.forEach(function (item) {
        grid.appendChild(createCard(item));
      });

      // Re-observe newly added reveal elements for scroll animation
      const newReveals = grid.querySelectorAll('.reveal');
      if (newReveals.length) {
        const obs = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
              }
            });
          },
          { rootMargin: '-60px', threshold: 0.1 }
        );
        newReveals.forEach(function (el) {
          obs.observe(el);
        });
      }
    })
    .catch(function () {
      if (skeleton) skeleton.remove();
      grid.innerHTML =
        '<div class="blog-fallback">' +
        '<p>Unable to load blog posts at the moment.</p>' +
        '<a href="https://medium.com/@divyanshagarwal188" target="_blank" rel="noopener noreferrer">Visit my Medium profile &rarr;</a>' +
        '</div>';
    });
})();


/* ===== 11. PROJECT FILTERING (projects.html) ===== */
(function () {
  const searchInput = document.getElementById('search-input');
  const filterTabs = document.querySelectorAll('.filter-tab[data-filter]');
  const projectCards = document.querySelectorAll('.project-card');
  const noResults = document.getElementById('no-results');
  const comingSoon = document.getElementById('coming-soon');
  const projectsCountEl = document.getElementById('projects-count');

  if (!projectCards.length) return;

  let activeFilter = 'all';

  function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;
    const categoryCounts = {};

    // Initialize counts for each tab
    filterTabs.forEach(function (tab) {
      const f = tab.getAttribute('data-filter');
      if (f) categoryCounts[f] = 0;
    });

    projectCards.forEach(function (card) {
      const titleEl = card.querySelector('h3') || card.querySelector('.project-title');
      const summaryEl = card.querySelector('.project-summary') || card.querySelector('p');
      const title = titleEl ? titleEl.textContent.toLowerCase() : '';
      const summary = summaryEl ? summaryEl.textContent.toLowerCase() : '';
      const tech = (card.getAttribute('data-tech') || '').toLowerCase();
      var techPills = card.querySelectorAll('.tech-tag');
      var techPillText = Array.prototype.map.call(techPills, function(el) { return el.textContent.toLowerCase(); }).join(' ');
      const categories = (card.getAttribute('data-categories') || '').toLowerCase();

      const matchesSearch =
        !query ||
        title.indexOf(query) !== -1 ||
        summary.indexOf(query) !== -1 ||
        tech.indexOf(query) !== -1 ||
        techPillText.indexOf(query) !== -1;

      const matchesFilter =
        activeFilter === 'all' || categories.indexOf(activeFilter.toLowerCase()) !== -1;

      if (matchesSearch && matchesFilter) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }

      // Update category counts (matching search only)
      if (matchesSearch) {
        Object.keys(categoryCounts).forEach(function (f) {
          if (f === 'all' || categories.indexOf(f.toLowerCase()) !== -1) {
            categoryCounts[f] = (categoryCounts[f] || 0) + 1;
          }
        });
      }
    });

    // Update filter count badges
    filterTabs.forEach(function (tab) {
      const f = tab.getAttribute('data-filter');
      const badge = tab.querySelector('.filter-count');
      if (badge && f && categoryCounts[f] !== undefined) {
        badge.textContent = categoryCounts[f];
      }
    });

    // Show/hide no results and coming soon
    const isFilterWithZeroProjects = activeFilter !== 'all' &&
      categoryCounts[activeFilter] === 0 && !query;

    if (noResults) {
      noResults.style.display = (visibleCount === 0 && !isFilterWithZeroProjects) ? 'block' : 'none';
    }
    if (comingSoon) {
      comingSoon.style.display = isFilterWithZeroProjects ? 'block' : 'none';
    }

    // Update project count text
    if (projectsCountEl) {
      const countSpan = projectsCountEl.querySelector('.gradient-text');
      if (countSpan) countSpan.textContent = visibleCount;
      const filterLabels = {
        'all': 'across AI, Healthcare & Data Engineering',
        'LLM Projects': 'in Gen AI / LLMs',
        'Healthcare Related Projects': 'in Healthcare',
        'Data Engineering Projects': 'in Data Engineering',
        'Agentic AI': 'in Agentic AI'
      };
      const suffix = filterLabels[activeFilter] || '';
      const word = visibleCount === 1 ? 'project' : 'projects';
      projectsCountEl.innerHTML = '<span class="gradient-text" style="font-weight:700;">' + visibleCount + '</span> ' + word + ' ' + suffix;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      filterTabs.forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      activeFilter = tab.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  // Sticky filter bar shadow on scroll
  const stickyBar = document.getElementById('filter-bar-sticky');
  if (stickyBar) {
    window.addEventListener('scroll', function () {
      const sectionHeader = document.querySelector('.projects-hero .section-header');
      if (sectionHeader) {
        const rect = sectionHeader.getBoundingClientRect();
        if (rect.bottom < 70) {
          stickyBar.classList.add('stuck');
        } else {
          stickyBar.classList.remove('stuck');
        }
      }
    });
  }
})();


/* ===== 12. PROJECT DETAILS TOGGLE ===== */
window.toggleDetails = function (btn) {
  if (!btn) return;
  const parent = btn.closest('.project-card') || btn.closest('.project-card-inner') || btn.parentElement;
  if (!parent) return;
  const details = parent.querySelector('.project-details');
  if (details) {
    details.classList.toggle('open');
  }
  btn.classList.toggle('active');
};


/* ===== 13. 3D TILT EFFECT ON CARDS ===== */
(function () {
  var selectors = '.skill-card, .timeline-content, .cert-card, .featured-card, .blog-card, .wid-card';
  var cards = document.querySelectorAll(selectors);
  if (!cards.length) return;

  // Skip on touch devices
  if (!window.matchMedia('(hover: hover)').matches) return;

  cards.forEach(function (card) {
    var ticking = false;

    card.style.willChange = 'transform';

    card.addEventListener('mousemove', function (e) {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var rect = card.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;
        var mouseX = e.clientX - centerX;
        var mouseY = e.clientY - centerY;

        var rotateX = -(mouseY / (rect.height / 2)) * 6;
        var rotateY = (mouseX / (rect.width / 2)) * 6;

        // Clamp to max degrees
        rotateX = Math.max(-7, Math.min(7, rotateX));
        rotateY = Math.max(-7, Math.min(7, rotateY));

        card.style.transform =
          'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
        ticking = false;
      });
    });

    card.addEventListener('mouseleave', function () {
      card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      ticking = false;
      // Reset transition after animation completes
      setTimeout(function () {
        card.style.transition = '';
      }, 500);
    });
  });
})();


/* ===== 14. BACK TO TOP BUTTON ===== */
(function () {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ===== 15. SMOOTH ANCHOR SCROLLING ===== */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();


/* ===== 16. MAGNETIC BUTTONS ===== */
(function () {
  // Skip on touch devices
  if (!window.matchMedia('(hover: hover)').matches) return;

  var buttons = document.querySelectorAll('.btn, .btn-primary, .btn-outline');
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      var dx = e.clientX - centerX;
      var dy = e.clientY - centerY;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var maxDist = 80;
      var maxTranslate = 6;

      if (dist < maxDist) {
        var strength = (1 - dist / maxDist) * maxTranslate;
        var tx = (dx / dist) * strength || 0;
        var ty = (dy / dist) * strength || 0;
        btn.style.transform = 'translate(' + tx + 'px, ' + ty + 'px)';
      }
    });

    btn.addEventListener('mouseleave', function () {
      btn.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
      btn.style.transform = 'translate(0, 0)';
      setTimeout(function () {
        btn.style.transition = '';
      }, 400);
    });
  });
})();


/* ===== 17. TEXT SCRAMBLE EFFECT ON SECTION HEADINGS ===== */
(function () {
  var chars = '!<>-_\\/[]{}—=+*^?#';
  var sectionTitles = document.querySelectorAll('.section-title');
  if (!sectionTitles.length) return;

  function scrambleText(el) {
    // Collect text nodes and preserve HTML element nodes
    var nodes = [];
    var fullText = '';
    el.childNodes.forEach(function (child) {
      if (child.nodeType === 3) {
        // Text node
        nodes.push({ type: 'text', node: child, original: child.textContent });
        fullText += child.textContent;
      } else if (child.nodeType === 1) {
        // Element node (e.g. <span class="gradient-text">)
        var innerText = child.textContent;
        nodes.push({ type: 'element', node: child, original: innerText });
        fullText += innerText;
      }
    });

    if (!fullText.trim()) return;

    var totalLen = fullText.length;
    var duration = 800;
    var startTime = performance.now();

    function update(now) {
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var revealedCount = Math.floor(progress * totalLen);

      var globalIndex = 0;
      nodes.forEach(function (item) {
        var text = item.original;
        var result = '';
        for (var i = 0; i < text.length; i++) {
          if (globalIndex < revealedCount) {
            result += text[i];
          } else if (text[i] === ' ') {
            result += ' ';
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
          globalIndex++;
        }
        if (item.type === 'text') {
          item.node.textContent = result;
        } else {
          item.node.textContent = result;
        }
      });

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Ensure final text is exact original
        nodes.forEach(function (item) {
          if (item.type === 'text') {
            item.node.textContent = item.original;
          } else {
            item.node.textContent = item.original;
          }
        });
      }
    }

    requestAnimationFrame(update);
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          scrambleText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '-60px', threshold: 0.1 }
  );

  sectionTitles.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ===== 18. STAGGERED CARD CASCADE ===== */
(function () {
  var cardSelectors = '.skill-card, .cert-card, .blog-card, .featured-card, .wid-card, .timeline-content';
  var cards = document.querySelectorAll(cardSelectors);
  if (!cards.length) return;

  // Group cards by parent
  var parentMap = new Map();
  cards.forEach(function (card) {
    // Find the reveal ancestor (the card itself or its parent may have .reveal)
    var revealEl = card.closest('.reveal') || card;
    var parent = revealEl.parentElement;
    if (!parentMap.has(parent)) {
      parentMap.set(parent, []);
    }
    parentMap.get(parent).push({ card: card, reveal: revealEl });
  });

  parentMap.forEach(function (items) {
    items.forEach(function (item, index) {
      var revealEl = item.reveal;
      // Set dynamic delay based on index
      revealEl.style.transitionDelay = (index * 0.1) + 's';

      // Add horizontal offset: even index -> 20px, odd index -> -20px
      var offsetX = index % 2 === 0 ? 20 : -20;
      // Only modify if not yet active
      if (!revealEl.classList.contains('active')) {
        revealEl.style.transform = 'translateY(40px) translateX(' + offsetX + 'px) scale(0.97)';
      }
    });
  });

  // Override the active state to clear horizontal offset
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
          entry.target.style.opacity = '1';
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '-60px', threshold: 0.1 }
  );

  parentMap.forEach(function (items) {
    items.forEach(function (item) {
      if (!item.reveal.classList.contains('active')) {
        observer.observe(item.reveal);
      }
    });
  });
})();


/* ===== 19. PARALLAX DEPTH ===== */
(function () {
  // Skip on mobile / reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;

  var canvas = document.getElementById('particles-canvas');
  var blobs = document.querySelectorAll('.ambient-blob');
  if (!canvas && !blobs.length) return;

  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var scrollY = window.scrollY;
      var offset = scrollY * 0.3;
      var transformValue = 'translateY(' + offset + 'px)';

      if (canvas) {
        canvas.style.transform = transformValue;
      }
      blobs.forEach(function (blob) {
        blob.style.transform = transformValue;
      });

      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ===== 20. SMOOTH PAGE TRANSITIONS ===== */
(function () {
  var overlay = document.getElementById('page-transition');
  if (!overlay) return;

  // On page load, fade out the overlay
  document.addEventListener('DOMContentLoaded', function () {
    // Small delay to ensure the overlay is rendered as active first
    requestAnimationFrame(function () {
      overlay.classList.remove('active');
    });
  });

  // If DOM already loaded (script at bottom of body)
  if (document.readyState !== 'loading') {
    requestAnimationFrame(function () {
      overlay.classList.remove('active');
    });
  }

  // Internal link detection
  var internalPages = ['index.html', 'projects.html', 'resume.html'];

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href) return;

    // Skip external links, anchors, download links, new tab links
    if (link.target === '_blank') return;
    if (link.hasAttribute('download')) return;
    if (href.startsWith('#')) return;
    if (href.startsWith('http') || href.startsWith('mailto:')) return;

    // Check if it's an internal page link
    var page = href.split('#')[0].split('?')[0];
    var isInternal = false;
    for (var i = 0; i < internalPages.length; i++) {
      if (page === internalPages[i] || page.endsWith('/' + internalPages[i])) {
        isInternal = true;
        break;
      }
    }

    if (!isInternal) return;

    e.preventDefault();
    overlay.classList.add('active');

    setTimeout(function () {
      window.location.href = href;
    }, 300);
  });
})();


/* ===== 21. SCROLL SPOTLIGHT ===== */
(function () {
  var spotlight = document.getElementById('scroll-spotlight');
  if (!spotlight) return;
  if (window.innerWidth < 768) return;

  document.addEventListener('mousemove', function (e) {
    var offsetY = ((e.clientY / window.innerHeight) - 0.5) * 100;
    spotlight.style.transform = 'translate(-50%, calc(-50% + ' + offsetY + 'px))';
  });
})();


