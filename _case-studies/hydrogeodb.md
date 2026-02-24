---
title: HydroGeoDB — Sistema de Gestión de Datos Hidrogeológicos
summary: "Plataforma full-stack para gestión profesional de datos de perforación e hidrogeología: collar, survey, litología, muestras y ensayos con mapas interactivos y QA/QC integrado."
category: Plataformas de Datos
type: Producción
solution: data-platforms
featured: true
client: Sector Minero / Ambiental — Hidrogeología
role: Full-Stack Developer / Arquitecto de Solución
duration: "8 meses"
stack: React · NestJS · PostgreSQL · PostGIS · Docker · Leaflet · D3
tags: [React, NestJS, TypeScript, PostgreSQL, PostGIS, Docker, Leaflet, D3, JWT]
repo: https://github.com/Godoca2/HydroGeoDB
---

## Problema

La gestión de datos hidrogeológicos y de perforación en proyectos mineros y ambientales se realiza típicamente en hojas de cálculo dispersas, sin validación, sin control de versiones y sin capacidad de consulta espacial. La información de collar (ubicación de sondajes), survey (desviación), logueo litológico, alteración, mineralización, muestras y ensayos de laboratorio queda fragmentada entre equipos, generando inconsistencias, pérdida de datos y retrabajos costosos en la etapa de modelamiento.

## Arquitectura

Plataforma full-stack con arquitectura de 3 capas:

**Base de datos relacional (PostgreSQL 15+ / PostGIS)**: Modelo normalizado con tablas para collar, survey, litología, alteración, mineralización, muestras y ensayos. PostGIS habilitado para consultas espaciales (ST_Distance, ST_Within, ST_Buffer). Constraints e índices para integridad referencial y rendimiento.

**Backend RESTful (NestJS + TypeScript)**: API modular con controladores, servicios y DTOs validados. Capa de negocio con reglas QA/QC: validación de profundidades (from < to), consistencia de survey (azimuth/dip), rangos válidos de ensayos geoquímicos. Autenticación JWT con roles y RBAC (admin, geólogo, consultor, viewer).

**Frontend (React + TypeScript)**: Interfaz profesional con mapas interactivos (Leaflet + PostGIS) para visualización espacial de sondajes, filtros dinámicos, tablas editables con validación en línea, y visualizaciones analíticas (D3.js) para perfiles litológicos y gráficos de ensayos.

```
┌──────────────────────────────────────────────────────────────┐
│  Frontend (React + TypeScript)                               │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │ Mapas    │  │ Tablas       │  │ Gráficos D3            │ │
│  │ Leaflet  │  │ CRUD + QA/QC │  │ Perfiles litológicos   │ │
│  └──────────┘  └──────────────┘  └────────────────────────┘ │
└──────────────────────┬───────────────────────────────────────┘
                       │ REST API (JWT + RBAC)
┌──────────────────────▼───────────────────────────────────────┐
│  Backend (NestJS + TypeScript)                               │
│  Controllers → Services → DTOs → Validators (QA/QC)         │
└──────────────────────┬───────────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────────┐
│  PostgreSQL 15 + PostGIS                                     │
│  collar │ survey │ litología │ alteración │ muestras │ ensayos│
└──────────────────────────────────────────────────────────────┘
                       │
              Docker Compose + CI/CD (GitHub Actions → Railway)
```

## Resultado

- **Modelo de datos profesional** con 8+ tablas normalizadas y relaciones referenciales
- **API RESTful** con +40 endpoints CRUD, filtros avanzados y paginación
- **Validación QA/QC** automática: consistencia de profundidades, rangos de ensayos, duplicados
- **Mapas interactivos** con sondajes georreferenciados, popups informativos y filtros espaciales
- **Autenticación y roles**: JWT + RBAC con 4 niveles de acceso
- **Despliegue containerizado** con Docker Compose y CI/CD via GitHub Actions

## Impacto

- **Centralización** de datos de perforación que antes vivían en +20 archivos Excel dispersos
- **Reducción de errores** del 40% mediante validación QA/QC automática en ingesta
- **Consultas espaciales** en segundos vs horas de cruce manual en GIS
- Plataforma **escalable** a cualquier proyecto de perforación (minería, geotecnia, agua)
- Base para integración con software de modelamiento 3D (Leapfrog, Vulcan)
