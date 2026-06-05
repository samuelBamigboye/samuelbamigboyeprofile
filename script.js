/* ============================================================
   SAMUEL BAMIGBOYE PORTFOLIO — script.js
   ============================================================ */

'use strict';

// ── THEME TOGGLE ──────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = themeToggle.querySelector('.theme-icon');
const body        = document.body;

function applyTheme(theme) {
  body.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
  localStorage.setItem('sb-theme', theme);
}

themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

const saved = localStorage.getItem('sb-theme');
if (saved) applyTheme(saved);

// ── NAVBAR ────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ── HAMBURGER MENU ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

// ── TYPING EFFECT ─────────────────────────────────────────
const phrases = [
  'scalable web apps.',
  'data-driven insights.',
  'smart APIs.',
  'content that converts.',
  'analytics dashboards.',
  'data-driven campaigns.',
  'full-stack solutions.',
  'digital growth engines.',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const phrase = phrases[phraseIdx];
  if (deleting) {
    charIdx--;
    typingEl.textContent = phrase.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, 40);
    }
  } else {
    charIdx++;
    typingEl.textContent = phrase.slice(0, charIdx);
    if (charIdx === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
    } else {
      setTimeout(type, 70);
    }
  }
}
setTimeout(type, 800);

// ── PARTICLES CANVAS ─────────────────────────────────────
const canvas = document.getElementById('particlesCanvas');
const ctx    = canvas.getContext('2d');
let particles = [];
let animFrame;

function resize() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function createParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 18000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.5 + 0.1,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const isDark = body.getAttribute('data-theme') !== 'light';
  const goldColor = isDark ? 'rgba(201,168,76,' : 'rgba(180,140,40,';
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = goldColor + p.opacity + ')';
    ctx.fill();
  });
  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = goldColor + (0.05 * (1 - dist/100)) + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  animFrame = requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => { resize(); createParticles(); }, { passive: true });
resize();
createParticles();
drawParticles();

// ── REVEAL ANIMATIONS ─────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ── COUNTER ANIMATIONS ────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  let current  = 0;
  const step   = Math.max(1, Math.floor(target / 40));
  const timer  = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 40);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

// ── SKILL BARS ANIMATION ──────────────────────────────────
const skillBarObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) {
        setTimeout(() => {
          fill.style.width = fill.dataset.width + '%';
        }, 200);
      }
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-item').forEach(el => skillBarObserver.observe(el));

// ── SKILLS TABS ───────────────────────────────────────────
const skillsTabs   = document.querySelectorAll('.skills-tab');
const skillsPanels = document.querySelectorAll('.skills-panel');

skillsTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    skillsTabs.forEach(t => t.classList.remove('active'));
    skillsPanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    if (panel) {
      panel.classList.add('active');
      // Trigger skill bars in newly shown panel
      panel.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = '0';
        setTimeout(() => { fill.style.width = fill.dataset.width + '%'; }, 100);
      });
    }
  });
});

// ── TIMELINE EXPAND/COLLAPSE ──────────────────────────────
function toggleTimeline(idx) {
  const body   = document.querySelectorAll('.timeline-body')[idx];
  const toggle = document.querySelectorAll('.timeline-toggle')[idx];
  const isOpen = body.classList.contains('open');
  // Close all
  document.querySelectorAll('.timeline-body').forEach(b => b.classList.remove('open'));
  document.querySelectorAll('.timeline-toggle').forEach(t => t.classList.remove('open'));
  // Open clicked if it was closed
  if (!isOpen) {
    body.classList.add('open');
    toggle.classList.add('open');
  }
}
window.toggleTimeline = toggleTimeline;
// Open first by default
setTimeout(() => toggleTimeline(0), 300);

// ── PROJECT FILTERS ───────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

// ── CONTACT FORM ──────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('.form-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  // Simulate async send
  setTimeout(() => {
    formSuccess.classList.add('show');
    contactForm.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

// ── BACK TO TOP ───────────────────────────────────────────
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
window.addEventListener('scroll', () => {
  backToTop.style.opacity = window.scrollY > 500 ? '1' : '0';
}, { passive: true });
backToTop.style.opacity = '0';
backToTop.style.transition = 'opacity 0.3s';

// ── SMOOTH SCROLL ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
