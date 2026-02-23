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

  // ── Liquid Cursor Effect (Canvas) ──
  var canvas = document.getElementById('cursor-canvas');
  if (canvas && window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;

    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    var mx = -500, my = -500;
    var isActive = false;
    var fadeAlpha = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      isActive = true;
    });
    document.addEventListener('mouseleave', function () {
      isActive = false;
    });

    // Trail of blobs – each follows the previous one
    var TRAIL_COUNT = 18;
    var trail = [];
    for (var i = 0; i < TRAIL_COUNT; i++) {
      trail.push({ x: -500, y: -500 });
    }

    var hue = 270; // starting hue (purple)
    var time = 0;

    function drawBlob(x, y, radius, h, s, l, alpha) {
      var grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, 'hsla(' + h + ',' + s + '%,' + l + '%,' + alpha + ')');
      grad.addColorStop(0.4, 'hsla(' + h + ',' + (s - 10) + '%,' + (l - 5) + '%,' + (alpha * 0.6) + ')');
      grad.addColorStop(1, 'hsla(' + h + ',' + s + '%,' + l + '%,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    (function animate() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Fade in/out
      if (isActive && fadeAlpha < 1) fadeAlpha = Math.min(fadeAlpha + 0.04, 1);
      if (!isActive && fadeAlpha > 0) fadeAlpha = Math.max(fadeAlpha - 0.02, 0);

      if (fadeAlpha > 0.001) {
        ctx.globalAlpha = fadeAlpha;

        // Update trail positions with different easing speeds
        trail[0].x += (mx - trail[0].x) * 0.25;
        trail[0].y += (my - trail[0].y) * 0.25;
        for (var i = 1; i < TRAIL_COUNT; i++) {
          var ease = 0.18 - (i * 0.008);
          if (ease < 0.03) ease = 0.03;
          trail[i].x += (trail[i - 1].x - trail[i].x) * ease;
          trail[i].y += (trail[i - 1].y - trail[i].y) * ease;
        }

        hue = (hue + 0.4) % 360;
        time += 0.02;

        // Render trailing blobs (back to front)
        ctx.globalCompositeOperation = 'lighter';

        for (var i = TRAIL_COUNT - 1; i >= 0; i--) {
          var t = i / TRAIL_COUNT;
          var blobHue = (hue + i * 12) % 360;
          var radius = 80 + (1 - t) * 120; // larger at front
          var alpha = (1 - t * 0.6) * 0.12;

          // Add organic wobble
          var wobbleX = Math.sin(time * 2 + i * 0.8) * (8 + i * 2);
          var wobbleY = Math.cos(time * 1.5 + i * 0.6) * (6 + i * 1.5);

          drawBlob(
            trail[i].x + wobbleX,
            trail[i].y + wobbleY,
            radius,
            blobHue, 85, 65, alpha
          );
        }

        // Bright core glow at cursor
        drawBlob(trail[0].x, trail[0].y, 60, hue, 90, 75, 0.35);
        drawBlob(trail[0].x, trail[0].y, 30, (hue + 30) % 360, 95, 80, 0.5);

        // Secondary accent glow (offset, different hue)
        var ax = trail[3] ? trail[3].x : trail[0].x;
        var ay = trail[3] ? trail[3].y : trail[0].y;
        drawBlob(
          ax + Math.sin(time * 3) * 20,
          ay + Math.cos(time * 2.5) * 15,
          100, (hue + 120) % 360, 80, 60, 0.1
        );

        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
      }

      requestAnimationFrame(animate);
    })();
  }
})();
