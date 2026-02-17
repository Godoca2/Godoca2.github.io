---
title: Ciencia de Redes — Modelamiento de Acuíferos
summary: "Modelamiento de flujos subterráneos mediante teoría de grafos para identificar rutas de flujo críticas, centralidades y vulnerabilidades en sistemas acuíferos."
category: Inteligencia Geoespacial
type: Investigación Aplicada
solution: geospatial-intelligence
featured: true
client: Investigación Geocientífica
role: Data Scientist & Arquitecto de Solución
duration: "3 meses"
stack: Python · NetworkX · GeoPandas
tags: [Python, NetworkX, Graph Theory, GIS, Hydrogeology]
repo: https://github.com/Godoca2/Proyecto-Ciencia-Redes
---

## Problema

El análisis tradicional de acuíferos se basa en modelos numéricos complejos que requieren software especializado y meses de calibración. Se necesitaba un enfoque complementario que permitiera identificar rápidamente las rutas de flujo principales, puntos de vulnerabilidad y la estructura topológica del sistema subterráneo.

## Arquitectura

Implementé un enfoque de ciencia de redes aplicada a hidrogeología:

**Modelamiento del grafo**: Representación del acuífero como una red dirigida donde los nodos son puntos de monitoreo/pozos y las aristas representan conexiones hidráulicas ponderadas por gradiente y transmisividad.

**Análisis de centralidades**: Cálculo de betweenness, closeness y degree centrality para identificar nodos críticos en el flujo subterráneo.

**Rutas de flujo**: Algoritmos de caminos más cortos y flujo máximo para modelar las rutas preferenciales del agua subterránea.

```
Datos geoespaciales → Construcción del grafo → Análisis de redes → Visualización
       │                      │                       │                  │
  Pozos, niveles,       NetworkX,              Centralidades,      Mapas + métricas
  geología              grafos dirigidos       rutas de flujo      interpretativas
```

## Resultado

- **Grafo dirigido** del sistema acuífero con ponderación hidráulica
- **Métricas de centralidad** que identifican pozos estratégicos
- **Rutas de flujo** modeladas con algoritmos de caminos óptimos
- **Visualizaciones interpretativas** para comunicar hallazgos a no-especialistas

## Impacto

- Enfoque complementario que **reduce meses a semanas** en el análisis preliminar
- Identificación de **puntos de vulnerabilidad** no evidentes con métodos tradicionales
- Framework reutilizable para cualquier sistema acuífero georreferenciado
- Publicación técnica potencial en análisis de redes hidrogeológicas
