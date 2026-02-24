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

    // Mouse state
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

    // History of recent cursor positions (paint trail)
    var HISTORY_LEN = 50;
    var history = [];

    // Color palette – DagsHub-inspired greens/teals/cyans/purples
    var palette = [
      [140, 90, 68],  // green
      [165, 85, 60],  // teal
      [185, 80, 65],  // cyan
      [200, 75, 62],  // light blue
      [260, 70, 65],  // purple
      [290, 65, 60],  // magenta
      [120, 85, 55],  // lime-green
      [175, 90, 58],  // aqua
    ];
    var colorIdx = 0;
    var colorT = 0;

    function lerpColor(a, b, t) {
      // Lerp hue on shortest path
      var dh = b[0] - a[0];
      if (dh > 180) dh -= 360;
      if (dh < -180) dh += 360;
      return [
        (a[0] + dh * t + 360) % 360,
        a[1] + (b[1] - a[1]) * t,
        a[2] + (b[2] - a[2]) * t
      ];
    }

    function getCurrentColor() {
      var a = palette[colorIdx % palette.length];
      var b = palette[(colorIdx + 1) % palette.length];
      return lerpColor(a, b, colorT);
    }

    function drawGlow(x, y, radius, h, s, l, alpha) {
      if (alpha < 0.002) return;
      var grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, 'hsla(' + h + ',' + s + '%,' + l + '%,' + alpha + ')');
      grad.addColorStop(0.3, 'hsla(' + h + ',' + s + '%,' + (l - 5) + '%,' + (alpha * 0.5) + ')');
      grad.addColorStop(0.7, 'hsla(' + h + ',' + (s - 15) + '%,' + (l - 10) + '%,' + (alpha * 0.15) + ')');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    var time = 0;

    (function animate() {
      var W = window.innerWidth, H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      // Calculate velocity (px/frame)
      var dx = mx - prevMx;
      var dy = my - prevMy;
      var speed = Math.sqrt(dx * dx + dy * dy);
      // Smooth velocity with decay
      velocity += (speed - velocity) * 0.15;
      // Decay velocity when cursor stops
      if (speed < 0.5) velocity *= 0.92;

      // Intensity from velocity (0 = stopped, 1 = fast)
      var intensity = Math.min(velocity / 40, 1);
      // Ease it for smoother transitions
      intensity = intensity * intensity * (3 - 2 * intensity); // smoothstep

      // Advance color cycling (speed-dependent)
      colorT += 0.003 + intensity * 0.012;
      if (colorT >= 1) {
        colorT -= 1;
        colorIdx = (colorIdx + 1) % palette.length;
      }

      time += 0.016;

      // Record position in history when moving
      if (onPage && intensity > 0.01) {
        var col = getCurrentColor();
        history.push({
          x: mx, y: my,
          vx: dx * 0.3, vy: dy * 0.3,
          radius: 180 + intensity * 220,
          alpha: 0.22 + intensity * 0.35,
          h: col[0], s: col[1], l: col[2],
          life: 1.0,
          decay: 0.012 + (1 - intensity) * 0.008
        });
        // Spawn extra particles when moving fast
        if (intensity > 0.3) {
          var col2 = lerpColor(
            palette[(colorIdx + 2) % palette.length],
            palette[(colorIdx + 3) % palette.length],
            colorT
          );
          history.push({
            x: mx + (Math.random() - 0.5) * 60,
            y: my + (Math.random() - 0.5) * 60,
            vx: dx * 0.15 + (Math.random() - 0.5) * 3,
            vy: dy * 0.15 + (Math.random() - 0.5) * 3,
            radius: 120 + Math.random() * 160,
            alpha: 0.15 + intensity * 0.2,
            h: col2[0], s: col2[1], l: col2[2],
            life: 1.0,
            decay: 0.015 + Math.random() * 0.01
          });
        }
      }

      // Cap history
      if (history.length > HISTORY_LEN) {
        history = history.slice(history.length - HISTORY_LEN);
      }

      // Render
      if (history.length > 0) {
        ctx.globalCompositeOperation = 'lighter';

        for (var i = history.length - 1; i >= 0; i--) {
          var p = history[i];
          // Drift
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
          // Fade
          p.life -= p.decay;

          if (p.life <= 0) {
            history.splice(i, 1);
            continue;
          }

          var fadeIn = Math.min(p.life * 5, 1); // quick fade-in
          var fadeOut = p.life * p.life; // quadratic fade-out
          var a = p.alpha * fadeIn * fadeOut;

          // Organic size pulse
          var pulse = 1 + Math.sin(time * 3 + i * 0.7) * 0.08;
          var r = p.radius * pulse * (0.5 + p.life * 0.5);

          drawGlow(p.x, p.y, r, p.h, p.s, p.l, a);

          // Inner brighter core
          if (a > 0.08) {
            drawGlow(p.x, p.y, r * 0.35, p.h, p.s + 5, p.l + 12, a * 0.6);
          }
        }

        // Hot core at cursor when moving
        if (onPage && intensity > 0.05) {
          var col = getCurrentColor();
          var coreA = intensity * 0.55;
          drawGlow(mx, my, 90 + intensity * 60, col[0], col[1], col[2] + 10, coreA);
          drawGlow(mx, my, 40 + intensity * 30, (col[0] + 30) % 360, col[1] + 5, col[2] + 20, coreA * 0.7);
        }

        ctx.globalCompositeOperation = 'source-over';
      }

      prevMx = mx;
      prevMy = my;
      requestAnimationFrame(animate);
    })();
  }
})();
