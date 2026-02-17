---
title: Planificador Flow — App de Gestión de Proyectos
summary: "Aplicación web de gestión de proyectos y tareas con backend serverless, autenticación integrada y conexión a BI para seguimiento de KPIs."
category: Plataforma de Datos
type: Demo Técnica
solution: data-platforms
featured: false
client: Proyecto interno / herramienta de productividad
role: Full-Stack Developer & Data Architect
duration: "2 meses"
stack: Supabase · Railway · Node.js · Power BI
tags: [Supabase, Railway, Node.js, Power BI, REST API]
repo: https://github.com/Godoca2/Planificador-Flow
---

## Problema

Los equipos técnicos necesitan herramientas de gestión de proyectos que se integren con su infraestructura de datos existente. Las soluciones SaaS no permiten conectar la data operativa directamente con dashboards de BI ni personalizar los flujos de trabajo.

## Arquitectura

Diseñé una aplicación web con arquitectura moderna y serverless:

**Backend**: Supabase como BaaS (Backend as a Service) con PostgreSQL, autenticación integrada, Row Level Security y API REST auto-generada. Despliegue en Railway para lógica de negocio custom.

**Frontend**: Interfaz web con Node.js que consume las APIs de Supabase. CRUD completo de proyectos, tareas, asignaciones y estados.

**Capa analítica**: Conexión directa de Power BI a la base Supabase para dashboards de seguimiento: velocidad del equipo, backlog, burndown y KPIs de productividad.

```
Frontend (Node.js) → Supabase (Auth + DB + API) → Power BI
       │                       │                       │
  CRUD de tareas,         PostgreSQL,             Dashboards de
  asignaciones            RLS, triggers           seguimiento y KPIs
```

## Resultado

- **App web funcional** con autenticación y CRUD completo
- **Base de datos** PostgreSQL con Row Level Security
- **API REST** auto-generada para integraciones
- **Dashboards** de seguimiento de proyectos en Power BI

## Impacto

- Demuestra integración **App → Data → BI** en un stack moderno
- Template reutilizable para aplicaciones internas con capa analítica
- **Cero costo de infraestructura** en tier gratuito (Supabase + Railway)
- Arquitectura referenciable para proyectos de gestión con datos integrados
