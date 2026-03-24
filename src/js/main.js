/* ═══════════════════════════════════════
   SWEARBY BRAND GUIDELINES
   Interactive functionality
   ═══════════════════════════════════════ */

// ── Toast notifications ──

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 2000);
}

// ── Copy color hex on swatch click ──

function copyColor(hex) {
  navigator.clipboard.writeText(hex).then(() => {
    showToast('Copied ' + hex);
  });
}

// ── Copy code snippet ──

function copySnippet(btn) {
  const pre = btn.parentElement.querySelector('pre');
  const text = pre.textContent;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

// ── Logo tab switching ──

function switchLogoTab(tab, btn) {
  document.querySelectorAll('.logo-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.logo-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('logo-' + tab).classList.add('active');
  btn.classList.add('active');
}

// ── Lightbox ──

function initLightbox() {
  // Create lightbox element if it doesn't exist
  let lightbox = document.querySelector('.lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<img src="" alt="">';
    document.body.appendChild(lightbox);
    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('open');
    });
  }

  const lightboxImg = lightbox.querySelector('img');

  document.querySelectorAll('.logo-card img, .brand-element-preview img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
}

// Run on load
initLightbox();

// ── Scroll-triggered fade-in animations ──

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ── Active sidebar link tracking ──

const sections = document.querySelectorAll('section[id]');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  sidebarLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});
