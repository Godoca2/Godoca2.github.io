---
title: Mapas Bivariados — Análisis Territorial Choapa
summary: "Visualización cartográfica bivariada de temperatura y precipitación para comunicar patrones geoclimáticos complejos en informes técnicos."
category: Inteligencia Geoespacial
type: Producción
solution: geospatial-intelligence
featured: true
client: Sector Ambiental / Hídrico
role: GIS Analyst & Data Visualization
duration: "1 mes"
stack: Python · GeoPandas · Matplotlib
tags: [Python, GeoPandas, Matplotlib, Cartography, Climate]
cover: /assets/images/covers/Mapa_Bivariado.png
repo: https://github.com/Godoca2/Bivariate_Maps
---

<figure class="case-study-cover">
  <img src="/assets/images/covers/Mapa_Bivariado.png" alt="Mapa Bivariado — Análisis Territorial Choapa">
</figure>

## Problema

Los informes técnicos ambientales necesitan comunicar relaciones entre múltiples variables climáticas en un mismo territorio. Los mapas univariados convencionales requieren múltiples figuras para mostrar lo que un mapa bivariado comunica en una sola visualización, perdiendo la capacidad de ver correlaciones espaciales.

## Arquitectura

Implementé un pipeline de visualización geoespacial automatizado:

**Procesamiento de datos**: Integración de series de temperatura y precipitación con geometrías territoriales usando GeoPandas. Clasificación bivariada con esquemas de corte optimizados.

**Motor de renderizado**: Sistema de generación de mapas bivariados con Matplotlib, incluyendo leyenda matricial 3×3, anotaciones interpretativas y estilos consistentes para reportes técnicos.

**Pipeline de exportación**: Generación automatizada en múltiples formatos (PNG, PDF, SVG) con resolución y márgenes configurables para inserción directa en documentos técnicos.

```
Datos climáticos + Geometrías → Clasificación bivariada → Renderizado → Export
        │                              │                       │           │
  Temperatura,                   Esquema 3×3,            Matplotlib,   PNG/PDF/SVG
  precipitación                  cortes optimizados      leyenda        para informes
```

## Resultado

- **Pipeline automatizado** de generación de mapas bivariados
- **Esquema de color** interpretable con leyenda matricial 3×3
- **Anotaciones** cartográficas automáticas
- **Exportación** en múltiples formatos para informes técnicos

## Impacto

- **Una visualización** comunica lo que antes requería 2-3 mapas
- **Automatización** de la producción cartográfica para reportes periódicos
- Estándar visual reutilizable para cualquier par de variables georreferenciadas
- Reducción de tiempo de producción cartográfica de días a minutos
