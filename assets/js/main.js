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

  // ── Aurora Wisps Effect (DagsHub-style) ──
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

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var onPage = false;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      onPage = true;
    });
    document.addEventListener('mouseleave', function () {
      onPage = false;
    });

    // ── Wisp (flowing aurora ribbon) ──
    // Each wisp is a chain of nodes that follow the cursor at different speeds
    var NUM_WISPS = 5;
    var NODES_PER_WISP = 25;
    var wisps = [];

    // DagsHub palette: green → teal → cyan → yellow-green (aurora colors)
    var wispConfigs = [
      { hue: 155, sat: 80, light: 55, width: 180, speed: 0.020, offsetX: 0,   offsetY: 0,   alpha: 0.07 },
      { hue: 130, sat: 75, light: 50, width: 140, speed: 0.013, offsetX: 80,  offsetY: -60, alpha: 0.06 },
      { hue: 175, sat: 85, light: 50, width: 160, speed: 0.016, offsetX: -70, offsetY: 40,  alpha: 0.055 },
      { hue: 60,  sat: 70, light: 55, width: 120, speed: 0.010, offsetX: 50,  offsetY: 80,  alpha: 0.045 },
      { hue: 190, sat: 80, light: 45, width: 100, speed: 0.008, offsetX: -90, offsetY: -40, alpha: 0.04  },
    ];

    for (var w = 0; w < NUM_WISPS; w++) {
      var nodes = [];
      for (var n = 0; n < NODES_PER_WISP; n++) {
        nodes.push({ x: mx, y: my });
      }
      wisps.push(nodes);
    }

    var time = 0;

    (function animate() {
      var W = window.innerWidth, H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      time += 0.008;

      // Update each wisp
      for (var w = 0; w < NUM_WISPS; w++) {
        var cfg = wispConfigs[w];
        var nodes = wisps[w];

        // Target: cursor + unique offset that orbits slowly
        var orbitAngle = time * (0.3 + w * 0.15) + w * 1.2;
        var orbitRadius = 40 + w * 25;
        var targetX = mx + cfg.offsetX + Math.sin(orbitAngle) * orbitRadius;
        var targetY = my + cfg.offsetY + Math.cos(orbitAngle * 0.7) * orbitRadius;

        // Head follows target
        var headEase = cfg.speed * 3;
        nodes[0].x += (targetX - nodes[0].x) * headEase;
        nodes[0].y += (targetY - nodes[0].y) * headEase;

        // Each subsequent node follows the previous with decreasing easing
        for (var n = 1; n < NODES_PER_WISP; n++) {
          var ease = cfg.speed * (1.0 - n * 0.025);
          if (ease < 0.003) ease = 0.003;

          // Add perpendicular wave motion for flowing feel
          var waveAngle = time * (1.5 + w * 0.2) + n * 0.3;
          var waveAmp = 15 + n * 3;
          var prevDx = n > 1 ? nodes[n-1].x - nodes[n-2].x : nodes[0].x - targetX;
          var prevDy = n > 1 ? nodes[n-1].y - nodes[n-2].y : nodes[0].y - targetY;
          var len = Math.sqrt(prevDx * prevDx + prevDy * prevDy) || 1;
          var perpX = -prevDy / len;
          var perpY = prevDx / len;

          var tx = nodes[n-1].x + perpX * Math.sin(waveAngle) * waveAmp;
          var ty = nodes[n-1].y + perpY * Math.sin(waveAngle) * waveAmp;

          nodes[n].x += (tx - nodes[n].x) * ease;
          nodes[n].y += (ty - nodes[n].y) * ease;
        }

        // ── Render wisp as gradient ribbon ──
        if (nodes.length < 3) continue;

        // Draw multiple layered strokes for soft glow effect
        var layers = [
          { widthMul: 1.0, alphaMul: 0.3 },
          { widthMul: 0.6, alphaMul: 0.5 },
          { widthMul: 0.25, alphaMul: 0.8 },
          { widthMul: 0.08, alphaMul: 1.0 },
        ];

        for (var li = 0; li < layers.length; li++) {
          var layer = layers[li];
          ctx.beginPath();
          ctx.moveTo(nodes[0].x, nodes[0].y);

          for (var n = 1; n < nodes.length - 1; n++) {
            var xc = (nodes[n].x + nodes[n + 1].x) / 2;
            var yc = (nodes[n].y + nodes[n + 1].y) / 2;
            ctx.quadraticCurveTo(nodes[n].x, nodes[n].y, xc, yc);
          }

          var last = nodes[nodes.length - 1];
          ctx.lineTo(last.x, last.y);

          // Hue shifts along the wisp
          var h1 = cfg.hue;
          var h2 = (cfg.hue + 40) % 360;

          // Create gradient along path (approximate with start→end)
          var grad = ctx.createLinearGradient(
            nodes[0].x, nodes[0].y,
            last.x, last.y
          );
          var a = cfg.alpha * layer.alphaMul;
          grad.addColorStop(0, 'hsla(' + h1 + ',' + cfg.sat + '%,' + cfg.light + '%,' + a + ')');
          grad.addColorStop(0.5, 'hsla(' + ((h1 + h2) / 2) + ',' + cfg.sat + '%,' + (cfg.light + 5) + '%,' + (a * 0.8) + ')');
          grad.addColorStop(1, 'hsla(' + h2 + ',' + cfg.sat + '%,' + cfg.light + '%,' + (a * 0.3) + ')');

          ctx.strokeStyle = grad;
          ctx.lineWidth = cfg.width * layer.widthMul;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalCompositeOperation = 'lighter';
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      requestAnimationFrame(animate);
    })();
  }
})();
