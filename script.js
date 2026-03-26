/* =============================================
   AYAAN ASIF MISTRY — SPACE PORTFOLIO
   script.js
   ============================================= */

// ===== STARFIELD =====
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx    = canvas.getContext('2d');
  let stars    = [];
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 280; i++) {
      stars.push({
        x:    Math.random() * W,
        y:    Math.random() * H,
        r:    Math.random() * 1.4 + 0.2,
        a:    Math.random(),
        da:   (Math.random() * 0.004 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
        spd:  Math.random() * 0.15 + 0.05,
        hue:  Math.random() < 0.12 ? `hsl(${Math.random()*60+180},80%,75%)` : '#f0f6ff'
      });
    }
    // A few big glittering stars
    for (let i = 0; i < 18; i++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 2.5 + 1.2,
        a: Math.random(), da: (Math.random() * 0.008 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
        spd: 0,
        hue: `hsl(${Math.random()*60+190},90%,85%)`
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.a += s.da;
      if (s.a > 1 || s.a < 0.05) s.da *= -1;
      s.y += s.spd;
      if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.hue;
      ctx.globalAlpha = s.a;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
})();


// ===== CUSTOM CURSOR =====
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  dot.style.transition = 'none';

  const hoverables = 'a, button, .cert-card, .project-card, .social-btn, .nav-link';

  document.querySelectorAll(hoverables).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });

  function tick() {
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  }
  tick();

  // Hide cursor on touch devices
  document.addEventListener('touchstart', () => {
    dot.style.display  = 'none';
    ring.style.display = 'none';
  }, { once: true });
})();


// ===== NAVBAR SCROLL =====
(function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Hamburger
  const ham   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      ham.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();


// ===== TYPEWRITER =====
(function initTypewriter() {
  const phrases = [
    'AI-Assisted Developer',
    'Full Stack Engineer',
    'HTML + CSS + JS Expert',
    'AI/ML Enthusiast',
    'Campus Ambassador',
    'Problem Solver'
  ];
  const el = document.getElementById('typewriter');
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const current = phrases[pi];
    el.textContent = deleting
      ? current.slice(0, ci--)
      : current.slice(0, ci++);

    let delay = deleting ? 55 : 85;
    if (!deleting && ci > current.length) { delay = 1800; deleting = true; }
    if (deleting && ci < 0)              { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; delay = 400; }
    setTimeout(type, delay);
  }
  type();
})();


// ===== SCROLL REVEAL (timeline + sections) =====
(function initScrollReveal() {
  const items = document.querySelectorAll('.timeline-item');
  items.forEach((item, i) => {
    const dir = i % 2 === 0 ? -40 : 40;
    item.style.transform = `translateY(30px) translateX(${dir}px)`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => observer.observe(item));

  // Generic fade-in for cards
  const cards = document.querySelectorAll('.about-card, .project-card, .cert-card');
  const cardObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.opacity = '0';
        e.target.style.transform = 'translateY(24px)';
        setTimeout(() => {
          e.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, 80 * (Array.from(e.target.parentElement.children).indexOf(e.target)));
        cardObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  cards.forEach(c => cardObs.observe(c));
})();


// ===== ACTIVE NAV HIGHLIGHT =====
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    links.forEach(l => {
      l.style.color = l.getAttribute('href') === '#' + cur ? 'var(--cyan)' : '';
    });
  });
})();


// ===== CERTIFICATE LIGHTBOX =====
let certList    = ['certificate1.jpeg','certificate2.jpeg','certificate3.jpeg','certificate4.jpeg','certificate5.jpeg'];
let certCurrent = 0;

function openCert(src, num) {
  certCurrent = num - 1;
  const lb  = document.getElementById('certLightbox');
  const img = document.getElementById('certLightboxImg');
  const ctr = document.getElementById('certCounter');
  img.src   = src;
  ctr.textContent = `${num} / ${certList.length}`;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCert(e, force) {
  if (force || (e && e.target === document.getElementById('certLightbox'))) {
    document.getElementById('certLightbox').classList.remove('active');
    document.body.style.overflow = '';
  }
}

function navCert(dir) {
  certCurrent = (certCurrent + dir + certList.length) % certList.length;
  const img = document.getElementById('certLightboxImg');
  const ctr = document.getElementById('certCounter');
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.2s';
  setTimeout(() => {
    img.src = certList[certCurrent];
    ctr.textContent = `${certCurrent + 1} / ${certList.length}`;
    img.style.opacity = '1';
  }, 200);
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', e => {
  const lb = document.getElementById('certLightbox');
  if (!lb.classList.contains('active')) return;
  if (e.key === 'Escape')     closeCert(null, true);
  if (e.key === 'ArrowRight') navCert(1);
  if (e.key === 'ArrowLeft')  navCert(-1);
});

// Touch swipe for lightbox
(function initSwipe() {
  const lb = document.getElementById('certLightbox');
  let startX = 0;
  lb.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  lb.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) navCert(dx < 0 ? 1 : -1);
  });
})();


// ===== CONTACT FORM =====
function handleFormSubmit(e) {
  e.preventDefault();
  const btn     = e.target.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');
  btn.textContent = 'Transmitting...';
  btn.disabled    = true;
  setTimeout(() => {
    btn.innerHTML = 'Launch Message <i class="fas fa-paper-plane"></i>';
    btn.disabled  = false;
    success.classList.add('show');
    e.target.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1500);
}


// ===== SMOOTH SECTION REVEAL ON LOAD =====
(function initPageLoad() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
})();


// ===== NEBULA PARALLAX =====
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const hero = document.querySelector('.hero::before');
  // subtle parallax via CSS var
  document.documentElement.style.setProperty('--scroll-y', y + 'px');
});


// ===== RE-REGISTER CURSOR HOVERS for dynamically styled elements =====
document.addEventListener('DOMContentLoaded', () => {
  const ring = document.querySelector('.cursor-ring');
  document.querySelectorAll('a, button, .cert-card, .project-card, .social-btn, .nav-link').forEach(el => {
    el.addEventListener('mouseenter', () => ring && ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring && ring.classList.remove('hovered'));
  });
});