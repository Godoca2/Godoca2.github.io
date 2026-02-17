---
layout: default
title: Soluciones
permalink: /solutions/
---

<div class="container-narrow">
  <section class="section">
    <div class="section-header">
      <h2 style="margin-top: 0;">Dominios de Solución</h2>
      <p>Capacidades técnicas end-to-end para transformar datos en infraestructura estratégica.</p>
    </div>

    <div class="grid grid-3">
      {% assign sorted = site.solutions | sort: "order" %}
      {% for sol in sorted %}
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

  <section class="section">
    <div class="section-header">
      <h2>Modelo de Trabajo</h2>
      <p>Cada engagement sigue una metodología estructurada.</p>
    </div>

    <div class="method-steps">
      <div class="method-step">
        <div class="step-number">1</div>
        <h3>Diagnóstico</h3>
        <p>Evaluación del estado actual de datos, infraestructura y procesos. Identificación de brechas y oportunidades.</p>
      </div>
      <div class="method-step">
        <div class="step-number">2</div>
        <h3>Diseño</h3>
        <p>Arquitectura de la solución, modelo de datos, diagramas de flujo y plan de implementación.</p>
      </div>
      <div class="method-step">
        <div class="step-number">3</div>
        <h3>Implementación</h3>
        <p>Desarrollo iterativo con entregas incrementales, testing y documentación técnica.</p>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <h2>¿Listo para empezar?</h2>
    <p>Escríbeme con una breve descripción del reto y definimos un alcance a medida.</p>
    <a class="btn btn-primary" href="/contact/">Contactar</a>
  </section>
</div>
