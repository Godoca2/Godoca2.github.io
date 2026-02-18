---
layout: default
title: Vuelos & Drone — Fotogrametría y Topografía Aérea
permalink: /drone/
description: "Planificación de vuelo, fotogrametría, avances topográficos y servicios de captura aérea con equipo drone profesional."
---

<div class="container-narrow">

  <section class="section">
    <div class="section-header">
      <h2 style="margin-top: 0;">Vuelos & Equipo Drone</h2>
      <p>Planificación de vuelo, fotogrametría, topografía aérea y captura de datos geoespaciales con drone profesional.</p>
    </div>

    <!-- Intro -->
    <div class="drone-intro">
      <p>Opero equipo drone profesional para captura de datos geoespaciales de alta precisión. Mi trabajo combina <strong>planificación de vuelo técnica</strong>, <strong>fotogrametría</strong> y <strong>procesamiento de datos topográficos</strong> para entregar productos como ortomosaicos, modelos digitales de elevación (DEM), nubes de puntos y avances topográficos.</p>
    </div>
  </section>

  <!-- Servicios Drone -->
  <section class="section">
    <div class="section-header">
      <h2>Capacidades</h2>
    </div>

    <div class="grid grid-3">
      <div class="drone-service-card">
        <span class="drone-service-icon"><i class="fa-solid fa-route"></i></span>
        <h3>Planificación de Vuelo</h3>
        <p>Diseño de planes de vuelo optimizados según el terreno, cobertura requerida y resolución espacial objetivo. Configuración de overlap frontal/lateral, altura de vuelo y GSD.</p>
      </div>
      <div class="drone-service-card">
        <span class="drone-service-icon"><i class="fa-solid fa-camera"></i></span>
        <h3>Fotogrametría</h3>
        <p>Procesamiento fotogramétrico de imágenes aéreas para generar ortomosaicos, modelos 3D, nubes de puntos densas y modelos digitales de superficie (DSM/DEM).</p>
      </div>
      <div class="drone-service-card">
        <span class="drone-service-icon"><i class="fa-solid fa-mountain"></i></span>
        <h3>Topografía Aérea</h3>
        <p>Avances topográficos para proyectos mineros e industriales. Cubicaciones, perfiles, curvas de nivel y comparativas temporales para seguimiento de movimientos de tierra.</p>
      </div>
      <div class="drone-service-card">
        <span class="drone-service-icon"><i class="fa-solid fa-image"></i></span>
        <h3>Fotografía Aérea</h3>
        <p>Captura de fotografías aéreas de alta resolución para documentación de proyectos, inspecciones de infraestructura y registro visual georreferenciado.</p>
      </div>
      <div class="drone-service-card">
        <span class="drone-service-icon"><i class="fa-solid fa-industry"></i></span>
        <h3>Vuelos en Minería</h3>
        <p>Operaciones de vuelo en faenas mineras para control de avance, monitoreo de botaderos, cubicación de stock piles y seguimiento de movimientos de tierra.</p>
      </div>
      <div class="drone-service-card">
        <span class="drone-service-icon"><i class="fa-solid fa-map"></i></span>
        <h3>Cartografía y GIS</h3>
        <p>Integración de productos drone con sistemas GIS para análisis espacial, generación de mapas temáticos y actualización de bases de datos geoespaciales.</p>
      </div>
    </div>
  </section>

  <!-- Galería de proyectos drone -->
  <section class="section">
    <div class="section-header">
      <h2>Proyectos</h2>
      <p>Selección de trabajos realizados con equipo drone.</p>
    </div>

    <div class="grid grid-2">
      {% for project in site.data.drone_projects %}
      <div class="drone-project-card">
        <div class="card-image">
          {% if project.image %}
          <img src="{{ project.image }}" alt="{{ project.title }}">
          {% else %}
          <span class="card-icon-placeholder"><i class="fa-solid fa-helicopter"></i></span>
          {% endif %}
        </div>
        <div class="card-tags">
          {% for t in project.tags %}
          <span class="tag">{{ t }}</span>
          {% endfor %}
        </div>
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
      </div>
      {% endfor %}
    </div>
  </section>

  <!-- Flujo de trabajo -->
  <section class="section">
    <div class="section-header">
      <h2>Flujo de Trabajo</h2>
    </div>

    <div class="method-steps">
      <div class="method-step">
        <span class="step-number">1</span>
        <h3>Planificación</h3>
        <p>Definición de área, GSD objetivo, overlap y plan de vuelo según las condiciones del terreno.</p>
      </div>
      <div class="method-step">
        <span class="step-number">2</span>
        <h3>Captura</h3>
        <p>Ejecución del vuelo con puntos de control (GCPs) y captura de imágenes georreferenciadas.</p>
      </div>
      <div class="method-step">
        <span class="step-number">3</span>
        <h3>Procesamiento</h3>
        <p>Fotogrametría, generación de productos (ortomosaico, DEM, nube de puntos) e integración GIS.</p>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section">
    <h2>¿Necesitas un vuelo drone?</h2>
    <p>Si requieres levantamiento aéreo, fotogrametría o topografía con drone para tu proyecto, conversemos.</p>
    <a class="btn btn-primary" href="/contact/">Solicitar vuelo</a>
  </section>

</div>
