// ── Theme Toggle ──
(function () {
  const STORAGE_KEY = 'theme-preference';
  const toggle = document.getElementById('theme-toggle');

  function getPreference() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    if (toggle) {
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }
  }

  setTheme(getPreference());

  if (toggle) {
    toggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ── Mobile Nav Toggle ──
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', navMenu.classList.contains('is-open'));
    });
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Cursor Glow Effect (DagsHub-style) ──
  var glow = document.querySelector('.cursor-glow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    var mx = 0, my = 0, gx = 0, gy = 0;
    var hue = 270; // start purple

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      if (!glow.classList.contains('is-active')) {
        glow.classList.add('is-active');
      }
    });

    document.addEventListener('mouseleave', function () {
      glow.classList.remove('is-active');
    });

    (function animate() {
      // Smooth interpolation — glow follows cursor with easing
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;
      glow.style.left = gx + 'px';
      glow.style.top = gy + 'px';

      // Slow color shift
      hue = (hue + 0.15) % 360;
      var c1 = 'hsla(' + hue + ', 70%, 65%, 0.15)';
      var c2 = 'hsla(' + ((hue + 60) % 360) + ', 60%, 55%, 0.08)';
      glow.style.background = 'radial-gradient(circle, ' + c1 + ' 0%, ' + c2 + ' 40%, transparent 70%)';

      requestAnimationFrame(animate);
    })();
  }
})();
