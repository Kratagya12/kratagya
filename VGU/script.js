
// Custom Cursor — desktop only
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
if (!isTouchDevice) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });
  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  })();
  document.querySelectorAll('a, button, .club-card, .card, .submit-btn').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.transform = 'translate(-50%,-50%) scale(2)'; ring.style.opacity = '0.3'; });
    el.addEventListener('mouseleave', () => { ring.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.opacity = '0.6'; });
  });
} else {
  cursor.style.display = 'none';
  ring.style.display = 'none';
}

// Hamburger Menu
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('open') ? 'hidden' : '';
}
function closeMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

// Particles
const particlesEl = document.getElementById('particles');
for (let i = 0; i < 25; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    animation-duration: ${8 + Math.random() * 12}s;
    animation-delay: ${Math.random() * 10}s;
    opacity: 0;
    width: ${1 + Math.random() * 2}px;
    height: ${1 + Math.random() * 2}px;
  `;
  particlesEl.appendChild(p);
}

// Scroll Reveal with IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .section-tag, .section-title, .section-line').forEach(el => {
  observer.observe(el);
});
document.querySelectorAll('.reveal-card').forEach((el, i) => {
  observer.observe(el);
});

// 3D Tilt on cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `translateY(-8px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.01)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
  });
});

// Parallax on scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const grid = document.querySelector('.hero-grid');
  if (grid) grid.style.transform = `perspective(600px) rotateX(20deg) translateY(${scrollY * 0.3}px)`;
});

// Form Submit
function submitForm() {
  const fname = document.getElementById('fname').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  if (!fname || !email || !message) {
    alert('Please fill in your name, email and message.');
    return;
  }
  document.getElementById('successMsg').style.display = 'block';
  ['fname','lname','email','phone','message'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('dept').selectedIndex = 0;
}