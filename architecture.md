---
layout: default
title: Arquitectura
permalink: /architecture/
---

<div class="container">
  <section class="section">
    <div class="section-header">
      <h2 style="margin-top: 0;">Diagramas de Arquitectura</h2>
      <p>Patrones de diseño y arquitecturas que implemento en mis soluciones.</p>
    </div>

    <!-- Data Platform Architecture -->
    <div class="diagram-container">
      <h3 style="margin-top: 0;">Plataforma de Datos — Arquitectura General</h3>
      <pre style="background: transparent; border: none; text-align: center; font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.5; color: var(--text-secondary);">
┌─────────────────────────────────────────────────────────┐
│                    FUENTES DE DATOS                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  APIs     │  │  CSV/XLS │  │ Sensores │  │  GIS    │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬────┘ │
└───────┼──────────────┼─────────────┼─────────────┼──────┘
        │              │             │             │
        ▼              ▼             ▼             ▼
┌─────────────────────────────────────────────────────────┐
│               CAPA DE INGESTA & QA/QC                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │  ETL Pipeline: Validación → Limpieza → Carga     │   │
│  │  • Detección de duplicados y outliers             │   │
│  │  • Validación de rangos y consistencia temporal   │   │
│  │  • Metadata: origen, timestamp, estado            │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                CAPA DE ALMACENAMIENTO                    │
│  ┌────────────────┐    ┌──────────────────────────┐     │
│  │  PostgreSQL     │    │  PostGIS                  │     │
│  │  Esquemas norm. │◄──►│  Geometrías + Topología   │     │
│  │  Auditoría      │    │  Índices espaciales       │     │
│  └───────┬────────┘    └──────────┬───────────────┘     │
└──────────┼────────────────────────┼─────────────────────┘
           │                        │
           ▼                        ▼
┌─────────────────────────────────────────────────────────┐
│                 CAPA DE CONSUMO                          │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐           │
│  │  Power BI  │  │ ArcGIS Pro│  │  APIs     │           │
│  │  Tableau   │  │  QGIS     │  │  FastAPI  │           │
│  └───────────┘  └───────────┘  └───────────┘           │
└─────────────────────────────────────────────────────────┘
      </pre>
      <p class="diagram-caption">Arquitectura de referencia para plataformas de datos con componente geoespacial.</p>
    </div>

    <!-- ML Pipeline Architecture -->
    <div class="diagram-container">
      <h3 style="margin-top: 0;">Pipeline ML — Arquitectura de Referencia</h3>
      <pre style="background: transparent; border: none; text-align: center; font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.5; color: var(--text-secondary);">
┌──────────┐     ┌──────────────┐     ┌──────────────┐
│  Data     │────►│   Feature    │────►│   Training   │
│  Source   │     │   Engineering│     │   Pipeline   │
└──────────┘     └──────────────┘     └──────┬───────┘
                                              │
                        ┌─────────────────────┤
                        │                     │
                        ▼                     ▼
                 ┌──────────────┐     ┌──────────────┐
                 │   MLflow     │     │  Evaluation  │
                 │   Tracking   │     │  by Cohort   │
                 │              │     │              │
                 │ • Params     │     │ • Monthly    │
                 │ • Metrics    │     │ • Drift      │
                 │ • Artifacts  │     │ • Comparison │
                 └──────────────┘     └──────┬───────┘
                                              │
                                              ▼
                                      ┌──────────────┐
                                      │   Serving    │
                                      │   (FastAPI)  │
                                      │   + Monitor  │
                                      └──────────────┘
      </pre>
      <p class="diagram-caption">Pipeline modular con tracking de experimentos y evaluación temporal.</p>
    </div>

    <!-- Geospatial Intelligence Architecture -->
    <div class="diagram-container">
      <h3 style="margin-top: 0;">Inteligencia Geoespacial — Flujo de Análisis</h3>
      <pre style="background: transparent; border: none; text-align: center; font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.5; color: var(--text-secondary);">
┌────────────────────────────────────────────────────────────┐
│  DATOS GEOESPACIALES                                        │
│  ┌──────────┐  ┌───────────┐  ┌──────────┐  ┌───────────┐ │
│  │ Vectores  │  │ Rasters   │  │ Sensores │  │ Satellite │ │
│  │ (SHP/GDB) │  │ (GeoTIFF) │  │ (IoT)    │  │ (GEE)     │ │
│  └─────┬────┘  └─────┬─────┘  └────┬─────┘  └─────┬─────┘ │
└────────┼──────────────┼─────────────┼──────────────┼───────┘
         │              │             │              │
         ▼              ▼             ▼              ▼
┌────────────────────────────────────────────────────────────┐
│  PROCESAMIENTO ESPACIAL                                     │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  PostGIS   │  GeoPandas  │  NetworkX  │  Earth Engine │ │
│  │            │             │            │               │ │
│  │  Topología │  Análisis   │  Grafos    │  Teledetec.   │ │
│  │  Índices   │  vectorial  │  espaciales│  Temporal     │ │
│  └───────────────────────────────────────────────────────┘ │
└────────────────────────────┬───────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────┐
│  VISUALIZACIÓN & REPORTES                                   │
│  ┌───────────┐   ┌───────────┐   ┌──────────────────────┐ │
│  │ Mapas      │   │ Dashboards│   │ Reportes regulat.    │ │
│  │ temáticos  │   │ geográf.  │   │ cartografía técnica  │ │
│  └───────────┘   └───────────┘   └──────────────────────┘ │
└────────────────────────────────────────────────────────────┘
      </pre>
      <p class="diagram-caption">Stack completo para análisis geoespacial: desde la ingesta hasta la visualización territorial.</p>
    </div>

  </section>

  <section class="section text-center">
    <p>Cada arquitectura se adapta al contexto del cliente. <a href="/contact/">Conversemos</a> sobre tu caso específico.</p>
  </section>
</div>
