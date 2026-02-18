---
layout: default
title: César Godoy Delaigue — Data Systems Engineer
---

<section class="hero">
  <h1 class="hero-name">César Godoy Delaigue</h1>
  <p class="hero-subtitle">Data Systems Engineer</p>
  <p class="hero-bio">Diseño e implemento plataformas de datos, pipelines de inteligencia artificial y soluciones de inteligencia geoespacial para organizaciones que necesitan tomar decisiones basadas en datos reales. Mi trabajo abarca data engineering, geospatial intelligence y AI/ML.</p>
  <div class="hero-links">
    <a href="{{ site.github }}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> GitHub</a>
    <a href="{{ site.linkedin }}" target="_blank" rel="noopener"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
    <a href="mailto:{{ site.email }}"><i class="fa-solid fa-envelope"></i> Email</a>
    <a href="/about/"><i class="fa-solid fa-file-lines"></i> Sobre mí</a>
  </div>
</section>

<div class="container-narrow">

  <!-- Solutions -->
  <section class="section">
    <div class="section-header">
      <h2>Dominios de Solución</h2>
    </div>

    <div class="grid grid-3">
      {% assign sorted_solutions = site.solutions | sort: "order" %}
      {% for sol in sorted_solutions %}
      <div class="solution-card">
        {% if sol.icon %}<span class="solution-icon">{{ sol.icon }}</span>{% endif %}
        <h3><a href="{{ sol.url }}">{{ sol.title }}</a></h3>
        <p>{{ sol.description }}</p>
        <div class="card-tags">
          {% for t in sol.tags %}
          <span class="tag">{{ t }}</span>
          {% endfor %}
        </div>
      </div>
      {% endfor %}
    </div>
  </section>

  <!-- Featured Case Studies -->
  <section class="section">
    <div class="section-header">
      <h2>Casos de Estudio</h2>
      <p>Problema → Arquitectura → Resultado → Impacto</p>
    </div>

    <div class="grid grid-2">
      {% assign featured = site.case-studies | where: "featured", true %}
      {% for cs in featured limit:4 %}
      <div class="card">
        <div class="card-image">
          {% if cs.cover %}
          <img src="{{ cs.cover }}" alt="{{ cs.title }}">
          {% else %}
          <span class="card-icon-placeholder"><i class="fa-solid fa-diagram-project"></i></span>
          {% endif %}
        </div>
        <div class="card-tags">
          {% for t in cs.tags limit:3 %}
          <span class="tag">{{ t }}</span>
          {% endfor %}
        </div>
        <h3><a href="{{ cs.url }}">{{ cs.title }}</a></h3>
        <p>{{ cs.summary }}</p>
      </div>
      {% endfor %}
    </div>

    <p class="text-center" style="margin-top: var(--space-2xl);">
      <a class="btn btn-ghost" href="/case-studies/">Ver todos los casos →</a>
    </p>
  </section>

  <!-- Metrics -->
  <section class="section">
    <div class="metrics">
      {% for m in site.data.metrics %}
      <div class="metric">
        <span class="value">{{ m.value }}</span>
        <span class="label">{{ m.label }}</span>
      </div>
      {% endfor %}
    </div>
  </section>

  <!-- Drone -->
  <section class="section">
    <div class="section-header">
      <h2>Vuelos & Equipo Drone</h2>
      <p>Fotogrametría, topografía aérea y cartografía con drones</p>
    </div>

    <div class="grid grid-3">
      {% for proj in site.data.drone_projects limit:3 %}
      <div class="drone-project-card">
        <div class="card-image">
          {% if proj.image %}
          <img src="{{ proj.image }}" alt="{{ proj.title }}">
          {% else %}
          <span class="card-icon-placeholder"><i class="fa-solid fa-helicopter"></i></span>
          {% endif %}
        </div>
        <div class="card-tags">
          {% for t in proj.tags limit:3 %}
          <span class="tag">{{ t }}</span>
          {% endfor %}
        </div>
        <h3>{{ proj.title }}</h3>
        <p>{{ proj.description | truncate: 100 }}</p>
      </div>
      {% endfor %}
    </div>

    <p class="text-center" style="margin-top: var(--space-2xl);">
      <a class="btn btn-ghost" href="/drone/">Ver portafolio drone →</a>
    </p>
  </section>

  <!-- Blog -->
  <section class="section">
    <div class="section-header">
      <h2>Blog</h2>
      <p>Artículos sobre Data Science, GIS y tecnología</p>
    </div>

    {% assign latest_posts = site.posts | slice: 0, 2 %}
    {% if latest_posts.size > 0 %}
    <div class="grid grid-2">
      {% for post in latest_posts %}
      <div class="blog-card">
        <div class="blog-post-meta">
          <span class="blog-post-category">{{ post.category }}</span>
          <span>{{ post.date | date: "%d %b %Y" }}</span>
        </div>
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <p>{{ post.excerpt_text | default: post.excerpt | strip_html | truncate: 120 }}</p>
      </div>
      {% endfor %}
    </div>
    <p class="text-center" style="margin-top: var(--space-2xl);">
      <a class="btn btn-ghost" href="/blog/">Ver todos los artículos →</a>
    </p>
    {% else %}
    <div class="blog-empty">
      <h3>Próximamente</h3>
      <p>Estoy preparando contenido técnico. Vuelve pronto.</p>
    </div>
    {% endif %}
  </section>

  <!-- Skills -->
  <section class="section">
    <div class="section-header">
      <h2>Stack Tecnológico</h2>
    </div>

    <div class="skills-grid">
      {% for group in site.data.skills %}
      <div class="skill-group">
        <h4>{{ group.category }}</h4>
        <ul>
          {% for item in group.items %}
          <li>{{ item }}</li>
          {% endfor %}
        </ul>
      </div>
      {% endfor %}
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section">
    <h2>¿Necesitas una solución de datos?</h2>
    <p>Si buscas diseñar una plataforma de datos, implementar inteligencia geoespacial o automatizar procesos con IA, conversemos.</p>
    <a class="btn btn-primary" href="/contact/">Iniciar conversación</a>
  </section>

</div>
