// =====================================================================
// Isuranga Nipun Kumara — Portfolio interaction layer
// No dependencies. No build step. Safe to run as a static file.
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {
  initScanLine();
  initNav();
  initScrollSpy();
  initGalleryFilter();
  initYear();
});

/* One-time boot "scan" moment across the top of the viewport. */
function initScanLine(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const line = document.createElement('div');
  line.className = 'scan-line';
  document.body.appendChild(line);
  line.addEventListener('animationend', () => line.remove());
}

/* Mobile nav toggle */
function initNav(){
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Highlight the current section in the nav as the user scrolls */
function initScrollSpy(){
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const map = new Map();
  navLinks.forEach(link => {
    const id = link.getAttribute('href').replace('#', '');
    map.set(id, link);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = map.get(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting){
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

/* Gallery category filter */
function initGalleryFilter(){
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(item => {
        const show = cat === 'all' || item.dataset.category === cat;
        item.hidden = !show;
      });
    });
  });
}

function initYear(){
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------------------
   Image fallback: if a photo hasn't been added to /images/ yet (or a
   filename doesn't match), swap it for a generated placeholder instead
   of showing a broken-image icon. Drop the real files into /images/
   using the exact names in README.md and this stops firing on its own.
   ------------------------------------------------------------------- */
function imgFallback(imgEl){
  imgEl.onerror = null;
  const label = imgEl.dataset.label || imgEl.alt || 'image pending';
  imgEl.src = placeholderSvg(label);
  imgEl.classList.add('is-placeholder');
}

function placeholderSvg(label){
  const safe = label.length > 34 ? label.slice(0, 31) + '…' : label;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="480" height="480">
      <rect width="100%" height="100%" fill="#0D1219"/>
      <rect x="10" y="10" width="460" height="460" fill="none" stroke="#1D2733" stroke-width="1"/>
      <rect x="20" y="20" width="440" height="440" fill="none" stroke="#24343F" stroke-width="1" stroke-dasharray="4 6"/>
      <g fill="none" stroke="#35D6D0" stroke-width="1.4">
        <path d="M240 150 L275 168 V206 C275 240 258 262 240 272 C222 262 205 240 205 206 V168 Z"/>
        <path d="M225 210 L237 222 L258 198" stroke-width="2"/>
      </g>
      <text x="50%" y="320" fill="#8B98A9" font-family="IBM Plex Mono, monospace" font-size="13" text-anchor="middle">${escapeXml(safe)}</text>
      <text x="50%" y="344" fill="#56626F" font-family="IBM Plex Mono, monospace" font-size="11" text-anchor="middle">awaiting upload — see /images/README</text>
    </svg>`.trim();
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function escapeXml(str){
  return str.replace(/[<>&'"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c]));
}
