/* ============================================
   AYAAN ASIF MISTRY — PORTFOLIO SCRIPTS
   ============================================ */

// ===== CUSTOM CURSOR =====
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .project-card, .cert-card, .contact-card, .chip').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

// Hide cursor on mobile
if ('ontouchstart' in window) {
  dot.style.display = 'none';
  ring.style.display = 'none';
}

// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let W = window.innerWidth, H = window.innerHeight;

canvas.width = W; canvas.height = H;

window.addEventListener('resize', () => {
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = W; canvas.height = H;
  initParticles();
});

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.size = Math.random() * 2 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '0, 212, 255' : '0, 119, 255';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
    ctx.fill();
  }
}

function initParticles() {
  const count = Math.floor((W * H) / 12000);
  particles = [];
  for (let i = 0; i < count; i++) particles.push(new Particle());
}

function connectParticles() {
  const maxDist = 120;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.15;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop, bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
  });
}

// ===== TYPEWRITER =====
const phrases = [
  'Web Applications',
  'AI-Powered Tools',
  'Full Stack Apps',
  'Intelligent Systems',
  'Digital Experiences',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typeEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typeEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
setTimeout(type, 800);

// ===== 3D CARD TILT =====
const card3d = document.getElementById('card3d');
if (card3d) {
  const wrap = card3d.parentElement;
  wrap.addEventListener('mousemove', e => {
    const rect = wrap.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    card3d.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });
  wrap.addEventListener('mouseleave', () => {
    card3d.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}

// ===== AOS (Animate On Scroll) =====
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('aos-animate'), delay);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

aosElements.forEach(el => aosObserver.observe(el));

// ===== PERCENTAGE BARS (animate when in view) =====
const pctFills = document.querySelectorAll('.pct-fill');
const pctObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const pct = fill.dataset.pct;
      setTimeout(() => { fill.style.width = pct + '%'; }, 200);
      pctObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });
pctFills.forEach(el => pctObserver.observe(el));

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== HERO PHOTO FALLBACK =====
const heroPhoto = document.getElementById('heroPhoto');
if (heroPhoto) {
  heroPhoto.addEventListener('error', () => {
    heroPhoto.style.display = 'none';
    const wrap = heroPhoto.closest('.photo-hex-frame');
    if (wrap) {
      wrap.style.background = 'linear-gradient(135deg, #0a1020, #0d2040)';
      wrap.innerHTML = `
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;">
          <div style="font-family:'Orbitron',sans-serif;font-size:2.8rem;font-weight:900;color:#00d4ff;letter-spacing:2px;">AAM</div>
          <div style="font-family:'Space Mono',monospace;font-size:0.65rem;color:rgba(0,212,255,0.5);letter-spacing:3px;">DEVELOPER</div>
        </div>`;
    }
  });
}

// ===== SMOOTH REVEAL ON LOAD =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

// ===== SECTION COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

// ===== PARALLAX HERO =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && scrollY < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
    heroContent.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
  }
});

// ===== GLITCH ON HOVER =====
document.querySelectorAll('.glitch').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.animation = 'glitch1 0.3s steps(1) 3';
    setTimeout(() => el.style.animation = '', 900);
  });
});

// ===== RIPPLE EFFECT ON CARDS =====
document.querySelectorAll('.project-card, .contact-card').forEach(card => {
  card.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute;border-radius:50%;
      background:rgba(0,212,255,0.15);
      width:200px;height:200px;
      transform:translate(-50%,-50%) scale(0);
      left:${e.clientX - rect.left}px;
      top:${e.clientY - rect.top}px;
      animation:ripple 0.6s ease-out forwards;
      pointer-events:none;z-index:0;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to { transform: translate(-50%, -50%) scale(3); opacity: 0; }
  }
`;
document.head.appendChild(style);

console.log('%c Ayaan Asif Mistry | Portfolio ', 'background:#060b14;color:#00d4ff;font-size:14px;padding:10px 20px;border:1px solid #00d4ff;font-family:monospace;letter-spacing:2px;');
console.log('%c AI-Assisted Full Stack Developer ', 'color:#00ffb3;font-size:11px;font-family:monospace;');