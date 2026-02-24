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

  // ── Swirling Vortex Effect (DagsHub-style) ──
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

    // Mouse tracking with smooth follow
    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var cx = mx, cy = my; // smoothed cursor position
    var onPage = false;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      onPage = true;
    });
    document.addEventListener('mouseleave', function () {
      onPage = false;
    });

    // Vortex arms — large glowing blobs that orbit the cursor
    var NUM_ARMS = 7;
    var arms = [];
    for (var i = 0; i < NUM_ARMS; i++) {
      arms.push({
        angle: (Math.PI * 2 / NUM_ARMS) * i,
        radius: 30 + i * 18,         // orbit distance from center
        size: 200 - i * 12,           // blob size (largest at center)
        speed: 0.8 + i * 0.15,       // angular speed
        phase: i * 0.9,              // phase offset
        hue: 90 + i * 15,            // green → yellow range
      });
    }

    var time = 0;

    function drawBlob(x, y, r, h, s, l, a) {
      var g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0,   'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')');
      g.addColorStop(0.3, 'hsla(' + h + ',' + s + '%,' + (l - 5) + '%,' + (a * 0.7) + ')');
      g.addColorStop(0.6, 'hsla(' + h + ',' + (s - 10) + '%,' + (l - 15) + '%,' + (a * 0.3) + ')');
      g.addColorStop(1,   'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    (function animate() {
      var W = window.innerWidth, H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      time += 0.012;

      // Smooth cursor follow
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;

      ctx.globalCompositeOperation = 'lighter';

      // === Outer ambient glow ===
      drawBlob(cx, cy, 350, 140, 60, 25, 0.06);
      drawBlob(cx, cy, 250, 120, 70, 30, 0.08);

      // === Swirling arm blobs ===
      for (var i = 0; i < NUM_ARMS; i++) {
        var arm = arms[i];

        // Spiral motion: radius pulses, angle rotates
        var spiralR = arm.radius + Math.sin(time * 1.5 + arm.phase) * 25;
        var a = arm.angle + time * arm.speed;

        // Position in orbit
        var ax = cx + Math.cos(a) * spiralR;
        var ay = cy + Math.sin(a) * spiralR;

        // Add secondary wobble for organic feel
        ax += Math.sin(time * 2.3 + i * 2) * 15;
        ay += Math.cos(time * 1.8 + i * 1.7) * 12;

        // Size pulses
        var size = arm.size + Math.sin(time * 1.2 + arm.phase) * 30;

        // Hue shifts slowly
        var h = arm.hue + Math.sin(time * 0.5 + i) * 20;

        // Outer soft glow
        drawBlob(ax, ay, size, h, 80, 50, 0.15);

        // Middle layer — brighter
        drawBlob(ax, ay, size * 0.55, h + 10, 90, 60, 0.25);

        // Inner bright core
        drawBlob(ax, ay, size * 0.25, h + 20, 95, 75, 0.4);
      }

      // === Bright central core (where arms overlap = white-hot) ===
      // Main bright center
      drawBlob(cx, cy, 120, 80, 90, 70, 0.45);
      drawBlob(cx, cy, 70,  70, 95, 80, 0.55);
      drawBlob(cx, cy, 35,  60, 100, 90, 0.7);

      // === Trailing afterimages — secondary vortex delayed ===
      var tx = cx + (cx - mx) * 1.5; // trails behind cursor
      var ty = cy + (cy - my) * 1.5;
      for (var i = 0; i < 4; i++) {
        var ta = time * (0.6 + i * 0.1) + i * 1.5;
        var tr = 50 + i * 30;
        var ttx = tx + Math.cos(ta) * tr;
        var tty = ty + Math.sin(ta) * tr;
        drawBlob(ttx, tty, 140 - i * 15, 100 + i * 20, 75, 45, 0.08);
      }

      ctx.globalCompositeOperation = 'source-over';
      requestAnimationFrame(animate);
    })();
  }
})();
