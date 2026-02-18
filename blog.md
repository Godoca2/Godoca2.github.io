---
layout: default
title: Blog
permalink: /blog/
description: "Artículos sobre ciencia de datos, geoespacial, IA/ML, tips técnicos y reflexiones profesionales."
---

<div class="container-narrow">

  <section class="section">
    <div class="section-header">
      <h2 style="margin-top: 0;">Blog</h2>
      <p>Artículos sobre ciencia de datos, geoespacial, inteligencia artificial, tips técnicos y reflexiones profesionales.</p>
    </div>

    {% if site.posts.size > 0 %}

    <!-- Featured post (most recent) -->
    {% assign latest = site.posts | first %}
    <div class="blog-featured">
      <div class="card-image blog-featured-image">
        {% if latest.cover %}
        <img src="{{ latest.cover }}" alt="{{ latest.title }}">
        {% else %}
        <span class="card-icon-placeholder"><i class="fa-solid fa-pen-nib"></i></span>
        {% endif %}
      </div>
      <div class="blog-featured-content">
        <div class="blog-post-meta">
          <time datetime="{{ latest.date | date_to_xmlschema }}">{{ latest.date | date: "%d %b %Y" }}</time>
          {% if latest.category %}
          <span class="blog-post-category">{{ latest.category }}</span>
          {% endif %}
        </div>
        <h3><a href="{{ latest.url }}">{{ latest.title }}</a></h3>
        <p>{{ latest.excerpt | strip_html | truncate: 180 }}</p>
        <a class="btn btn-ghost" href="{{ latest.url }}">Leer artículo →</a>
      </div>
    </div>

    <!-- All posts grid -->
    {% if site.posts.size > 1 %}
    <div class="grid grid-2" style="margin-top: var(--space-3xl);">
      {% for post in site.posts offset:1 %}
      <div class="blog-card">
        <div class="card-image">
          {% if post.cover %}
          <img src="{{ post.cover }}" alt="{{ post.title }}">
          {% else %}
          <span class="card-icon-placeholder"><i class="fa-solid fa-pen-nib"></i></span>
          {% endif %}
        </div>
        <div class="blog-post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d %b %Y" }}</time>
          {% if post.category %}
          <span class="blog-post-category">{{ post.category }}</span>
          {% endif %}
        </div>
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <p>{{ post.excerpt | strip_html | truncate: 140 }}</p>
      </div>
      {% endfor %}
    </div>
    {% endif %}

    {% else %}

    <!-- Empty state -->
    <div class="blog-empty">
      <i class="fa-solid fa-pen-nib"></i>
      <h3>Próximamente</h3>
      <p>Estoy preparando los primeros artículos. Vuelve pronto para leer sobre ciencia de datos, geoespacial, IA y tips técnicos.</p>
    </div>

    {% endif %}

  </section>
</div>
