---
layout: default
title: Casos de Estudio
permalink: /case-studies/
---

<div class="container-narrow">
  <section class="section">
    <div class="section-header">
      <h2 style="margin-top: 0;">Casos de Estudio</h2>
      <p>Cada caso sigue la estructura: Problema → Arquitectura → Resultado → Impacto.</p>
    </div>

    <div class="grid grid-2">
      {% assign featured_cs = site.case-studies | where: "featured", true %}
      {% assign other_cs = site.case-studies | where: "featured", false %}
      {% assign studies = featured_cs | concat: other_cs %}
      {% for cs in studies %}
      <div class="card">
        <div class="card-image">
          {% if cs.cover %}
          <img src="{{ cs.cover }}" alt="{{ cs.title }}">
          {% else %}
          <span class="card-icon-placeholder"><i class="fa-solid fa-diagram-project"></i></span>
          {% endif %}
        </div>
        <div class="card-tags">
          {% if cs.type == "Producción" %}
          <span class="tag tag-accent">{{ cs.type }}</span>
          {% else %}
          <span class="tag">{{ cs.type }}</span>
          {% endif %}
          {% for t in cs.tags limit:3 %}
          <span class="tag">{{ t }}</span>
          {% endfor %}
        </div>
        <h3><a href="{{ cs.url }}">{{ cs.title }}</a></h3>
        <p>{{ cs.summary }}</p>
      </div>
      {% endfor %}
    </div>
  </section>

  <section class="section text-center">
    <blockquote style="max-width: 600px; margin: 0 auto;">
      Los proyectos de <strong>Demo Técnica</strong> son implementaciones completas diseñadas para demostrar arquitectura y capacidad técnica. Los proyectos de <strong>Producción</strong> son sistemas activos en entornos reales.
    </blockquote>
  </section>
</div>
