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

  // ── Liquid Cursor Effect (DagsHub-style) ──
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

    var mx = -9999, my = -9999;
    var prevMx = mx, prevMy = my;
    var velocity = 0;
    var onPage = false;

    document.addEventListener('mousemove', function (e) {
      prevMx = mx; prevMy = my;
      mx = e.clientX;
      my = e.clientY;
      onPage = true;
    });
    document.addEventListener('mouseleave', function () {
      onPage = false;
    });

    // === Ribbon trail – stores recent positions ===
    var RIBBON_LEN = 80;
    var ribbon = []; // {x, y, dx, dy, age}

    // === Floating blobs – large swirling masses ===
    var BLOB_MAX = 35;
    var blobs = [];

    // DagsHub palette: deep reds, hot pinks, magentas, warm oranges
    var palette = [
      [350, 90, 55],  // crimson red
      [0,   85, 50],  // pure red
      [15,  90, 55],  // red-orange
      [330, 80, 50],  // hot pink
      [345, 85, 45],  // deep rose
      [310, 75, 50],  // magenta
      [20,  95, 58],  // orange
      [340, 90, 48],  // ruby
    ];
    var colorIdx = 0;
    var colorT = 0;

    function lerpHSL(a, b, t) {
      var dh = b[0] - a[0];
      if (dh > 180) dh -= 360;
      if (dh < -180) dh += 360;
      return [
        (a[0] + dh * t + 360) % 360,
        a[1] + (b[1] - a[1]) * t,
        a[2] + (b[2] - a[2]) * t
      ];
    }

    function getColor(offset) {
      var idx = (colorIdx + (offset || 0)) % palette.length;
      var next = (idx + 1) % palette.length;
      return lerpHSL(palette[idx], palette[next], colorT);
    }

    var time = 0;
    var frameCount = 0;

    (function animate() {
      var W = window.innerWidth, H = window.innerHeight;

      // Soft fade instead of full clear – this creates the SMEAR/TRAIL effect
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, W, H);

      // Velocity
      var dx = mx - prevMx;
      var dy = my - prevMy;
      var speed = Math.sqrt(dx * dx + dy * dy);
      velocity += (speed - velocity) * 0.2;
      if (speed < 0.5) velocity *= 0.94;

      var intensity = Math.min(velocity / 30, 1);
      intensity = intensity * intensity;

      // Advance color
      colorT += 0.004 + intensity * 0.015;
      if (colorT >= 1) { colorT -= 1; colorIdx = (colorIdx + 1) % palette.length; }

      time += 0.018;
      frameCount++;

      // --- Record ribbon points ---
      if (onPage && speed > 1) {
        ribbon.push({ x: mx, y: my, dx: dx, dy: dy, age: 0 });
        if (ribbon.length > RIBBON_LEN) ribbon.shift();
      }
      // Age ribbon
      for (var i = ribbon.length - 1; i >= 0; i--) {
        ribbon[i].age++;
        if (ribbon[i].age > 120) { ribbon.splice(i, 1); }
      }

      // --- Spawn blobs when moving ---
      if (onPage && intensity > 0.02 && frameCount % 2 === 0) {
        var col = getColor(0);
        blobs.push({
          x: mx + (Math.random() - 0.5) * 30,
          y: my + (Math.random() - 0.5) * 30,
          vx: dx * (0.2 + Math.random() * 0.15),
          vy: dy * (0.2 + Math.random() * 0.15),
          radius: 150 + intensity * 250 + Math.random() * 80,
          h: col[0], s: col[1], l: col[2],
          alpha: 0.18 + intensity * 0.30,
          life: 1.0,
          decay: 0.004 + Math.random() * 0.004
        });

        // Extra large swirl blob periodically
        if (frameCount % 6 === 0 && intensity > 0.15) {
          var col2 = getColor(3);
          blobs.push({
            x: mx + (Math.random() - 0.5) * 80,
            y: my + (Math.random() - 0.5) * 80,
            vx: dx * 0.08 + (Math.random() - 0.5) * 2,
            vy: dy * 0.08 + (Math.random() - 0.5) * 2,
            radius: 300 + Math.random() * 200,
            h: col2[0], s: col2[1], l: col2[2],
            alpha: 0.12 + intensity * 0.15,
            life: 1.0,
            decay: 0.002 + Math.random() * 0.003
          });
        }
      }

      // Cap blobs
      while (blobs.length > BLOB_MAX) blobs.shift();

      // === RENDER ===
      ctx.globalCompositeOperation = 'lighter';

      // -- Draw ribbon (connected liquid trail) --
      if (ribbon.length > 2) {
        for (var w = 0; w < 3; w++) {
          var widths = [60, 30, 8];
          var alphas = [0.06, 0.1, 0.2];
          ctx.beginPath();
          ctx.moveTo(ribbon[0].x, ribbon[0].y);

          for (var i = 1; i < ribbon.length - 1; i++) {
            var xc = (ribbon[i].x + ribbon[i + 1].x) / 2;
            var yc = (ribbon[i].y + ribbon[i + 1].y) / 2;
            ctx.quadraticCurveTo(ribbon[i].x, ribbon[i].y, xc, yc);
          }
          var last = ribbon[ribbon.length - 1];
          ctx.lineTo(last.x, last.y);

          var ribbonCol = getColor(w);
          ctx.strokeStyle = 'hsla(' + ribbonCol[0] + ',' + ribbonCol[1] + '%,' + ribbonCol[2] + '%,' + alphas[w] + ')';
          ctx.lineWidth = widths[w];
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }

      // -- Draw blobs --
      for (var i = blobs.length - 1; i >= 0; i--) {
        var b = blobs[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.97;
        b.vy *= 0.97;
        // Slight swirl rotation
        var angle = time * 0.5 + i;
        b.vx += Math.sin(angle) * 0.15;
        b.vy += Math.cos(angle) * 0.12;

        b.life -= b.decay;
        if (b.life <= 0) { blobs.splice(i, 1); continue; }

        var fadeOut = b.life * b.life;
        var a = b.alpha * fadeOut;
        var r = b.radius * (0.4 + b.life * 0.6);

        // Outer glow
        var grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        grad.addColorStop(0, 'hsla(' + b.h + ',' + b.s + '%,' + b.l + '%,' + a + ')');
        grad.addColorStop(0.25, 'hsla(' + b.h + ',' + b.s + '%,' + (b.l - 5) + '%,' + (a * 0.6) + ')');
        grad.addColorStop(0.6, 'hsla(' + b.h + ',' + (b.s - 10) + '%,' + (b.l - 10) + '%,' + (a * 0.2) + ')');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Hot inner core
        if (a > 0.06) {
          var grad2 = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r * 0.3);
          grad2.addColorStop(0, 'hsla(' + ((b.h + 15) % 360) + ',' + (b.s + 5) + '%,' + (b.l + 15) + '%,' + (a * 0.8) + ')');
          grad2.addColorStop(1, 'transparent');
          ctx.fillStyle = grad2;
          ctx.beginPath();
          ctx.arc(b.x, b.y, r * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // -- Bright core at cursor when moving --
      if (onPage && intensity > 0.04) {
        var cc = getColor(0);
        var coreA = intensity * 0.6;

        var g1 = ctx.createRadialGradient(mx, my, 0, mx, my, 100 + intensity * 80);
        g1.addColorStop(0, 'hsla(' + cc[0] + ',' + cc[1] + '%,' + (cc[2] + 15) + '%,' + coreA + ')');
        g1.addColorStop(0.4, 'hsla(' + cc[0] + ',' + cc[1] + '%,' + cc[2] + '%,' + (coreA * 0.4) + ')');
        g1.addColorStop(1, 'transparent');
        ctx.fillStyle = g1;
        ctx.beginPath();
        ctx.arc(mx, my, 100 + intensity * 80, 0, Math.PI * 2);
        ctx.fill();

        // White-hot center
        var g2 = ctx.createRadialGradient(mx, my, 0, mx, my, 25 + intensity * 20);
        g2.addColorStop(0, 'hsla(' + ((cc[0] + 20) % 360) + ', 100%, 85%,' + (coreA * 0.9) + ')');
        g2.addColorStop(1, 'transparent');
        ctx.fillStyle = g2;
        ctx.beginPath();
        ctx.arc(mx, my, 25 + intensity * 20, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';

      prevMx = mx;
      prevMy = my;
      requestAnimationFrame(animate);
    })();
  }
})();
