/* =============================================
   AYAAN ASIF MISTRY — PORTFOLIO JS (FIXED)
   ============================================= */

'use strict';

// ===== PARTICLES =====
(function particles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = ['rgba(255,60,172,','rgba(120,75,160,','rgba(255,122,24,','rgba(43,134,197,'];
  const count  = window.innerWidth < 600 ? 36 : 70;

  function mkParticle() {
    return {
      x:    Math.random() * window.innerWidth,
      y:    Math.random() * window.innerHeight,
      r:    Math.random() * 1.8 + 0.4,
      vx:   (Math.random() - 0.5) * 0.2,
      vy:   -(Math.random() * 0.35 + 0.08),
      a:    Math.random() * 0.5 + 0.1,
      col:  colors[Math.floor(Math.random() * colors.length)],
      phase: Math.random() * Math.PI * 2,
      freq:  Math.random() * 0.015 + 0.005,
    };
  }

  const pts = Array.from({ length: count }, mkParticle);

  function loop() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.phase += p.freq;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      const a = p.a * (0.5 + 0.5 * Math.abs(Math.sin(p.phase)));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + a + ')';
      ctx.fill();
    });
    requestAnimationFrame(loop);
  }
  loop();
})();


// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


// ===== HAMBURGER / MOBILE MENU =====
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobOverlay = document.getElementById('mobOverlay');
const mobClose   = document.getElementById('mobClose');

function openMenu() {
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  mobOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  mobOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});
mobClose.addEventListener('click', closeMenu);
mobOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', closeMenu));


// ===== INTERSECTION OBSERVER — SCROLL REVEAL =====
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

// Timeline items
document.querySelectorAll('.tl-reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
  revealObs.observe(el);
});

// Other reveal cards — stagger per section
document.querySelectorAll('.reveal-card').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  revealObs.observe(el);
});

// Use tl-reveal class on timeline items
document.querySelectorAll('.timeline-item').forEach(el => {
  el.classList.add('tl-reveal');
  revealObs.observe(el);
});


// ===== TYPING EFFECT =====
(function typing() {
  const el = document.getElementById('typedRole');
  if (!el) return;
  const texts = [
    'AI-Assisted Full Stack Developer',
    'HTML + CSS + JavaScript Expert',
    'Campus Ambassador @ Mentversity',
    'B.Tech CSE (AI & ML) Student',
  ];
  let ti = 0, ci = 0, del = false;
  const T = { type: 68, del: 32, pause: 2000 };

  function run() {
    const cur = texts[ti];
    if (!del) {
      el.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { del = true; setTimeout(run, T.pause); return; }
    } else {
      el.textContent = cur.slice(0, --ci);
      if (ci === 0) { del = false; ti = (ti + 1) % texts.length; }
    }
    setTimeout(run, del ? T.del : T.type);
  }
  setTimeout(run, 1200);
})();


// ===== PHOTO 3D TILT =====
const photoFrame = document.querySelector('.photo-frame');
if (photoFrame && window.innerWidth > 900) {
  photoFrame.addEventListener('mousemove', e => {
    const r  = photoFrame.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    photoFrame.style.transform = `perspective(900px) rotateX(${-dy * 7}deg) rotateY(${dx * 7}deg)`;
  });
  photoFrame.addEventListener('mouseleave', () => {
    photoFrame.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
  });
}


// ===== CERTIFICATE LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');

function openCert(src) {
  lbImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCert() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { if (!lightbox.classList.contains('open')) lbImg.src = ''; }, 380);
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCert(); });

window.openCert  = openCert;
window.closeCert = closeCert;


// ===== CURSOR GLOW (desktop only) =====
if (window.innerWidth > 900) {
  const glow = document.createElement('div');
  glow.style.cssText = [
    'position:fixed','width:320px','height:320px','border-radius:50%',
    'pointer-events:none','z-index:0',
    'background:radial-gradient(circle,rgba(255,60,172,0.04),transparent 70%)',
    'transform:translate(-50%,-50%)',
    'transition:left 0.14s ease,top 0.14s ease',
    'will-change:left,top',
  ].join(';');
  document.body.appendChild(glow);
  let ticking = false;
  document.addEventListener('mousemove', e => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
      ticking = false;
    });
  });
}


// ===== BLOB PARALLAX =====
if (window.innerWidth > 900) {
  let ticking2 = false;
  document.addEventListener('mousemove', e => {
    if (ticking2) return;
    ticking2 = true;
    requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      document.querySelectorAll('.blob').forEach((b, i) => {
        const f = (i + 1) * 0.45;
        b.style.transform = `translate(${x * f}px, ${y * f}px)`;
      });
      ticking2 = false;
    });
  });
}


// ===== HERO STAGGER ENTRANCE =====
(function heroEntrance() {
  const els = document.querySelectorAll(
    '.badge-row,.hero-name,.hero-role,.hero-sub,.hero-btns,.tech-pills,.photo-frame'
  );
  els.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.75s ease ${i * 0.09 + 0.15}s, transform 0.75s ease ${i * 0.09 + 0.15}s`;
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      }, 60);
    });
  });
})();


// ===== ACTIVE NAV HIGHLIGHT =====
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const navObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? '#fff' : '';
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => navObs.observe(s));