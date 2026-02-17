---
title: Portal Gestor Hídrico
summary: "Sistema unificado de análisis, control y visualización para el estándar hídrico con modelo de datos centralizado, ETL automatizado y dashboards ejecutivos."
category: Plataforma de Datos
type: Producción
solution: data-platforms
featured: true
client: Sector Hídrico / Ambiental
role: Arquitecto de Datos & Líder Técnico
duration: "6+ meses (evolución continua)"
stack: PostgreSQL · Power BI · ArcGIS Pro · Python
tags: [PostgreSQL, Power BI, ArcGIS Pro, ETL, QA/QC]
repo: https://github.com/Godoca2/Portal-Gestor-Hidrico
---

## Problema

La gestión de recursos hídricos operaba con datos fragmentados en múltiples hojas de cálculo, bases locales desconectadas y reportes manuales. Los equipos técnicos dedicaban más del 60% de su tiempo a buscar, limpiar y consolidar datos antes de poder analizarlos. No existía una fuente única de verdad ni trazabilidad de los datos.

## Arquitectura

Diseñé un sistema de datos centralizado con tres capas:

**Capa de almacenamiento**: Modelo relacional en PostgreSQL con esquemas normalizados para niveles freáticos, caudales, concentraciones químicas y datos meteorológicos. Extensión PostGIS para la dimensión espacial.

**Capa de procesamiento**: Pipelines ETL automatizados con validaciones QA/QC integradas (rangos, consistencia temporal, duplicados, outliers). Cada registro incluye metadata de origen, fecha de ingesta y estado de validación.

**Capa de presentación**: Tableros ejecutivos en Power BI conectados directamente a la base de datos, con mapas temáticos generados en ArcGIS Pro para reportes regulatorios.

```
Fuentes diversas → ETL + QA/QC → PostgreSQL/PostGIS → Power BI + ArcGIS Pro
     │                  │               │                      │
  CSV, APIs,       Validación,     Modelo central,      Tableros ejecutivos,
  sensores         trazabilidad    auditoría             mapas temáticos
```

## Resultado

- Modelo de datos centralizado con **4 dominios** (niveles, caudales, concentraciones, meteorología)
- Pipeline ETL con **validaciones QA/QC** automatizadas y trazabilidad completa
- **Tableros ejecutivos** con actualización periódica automática
- **Mapas temáticos** integrados para reportes regulatorios

## Impacto

- **70%** de reducción en tiempo de preparación de reportes
- **Fuente única de verdad** para toda la organización
- Auditoría completa de cada dato desde su origen hasta el dashboard
- Base escalable para incorporar nuevas fuentes de datos sin rediseño
