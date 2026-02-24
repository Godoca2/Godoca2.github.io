---
title: Telemetría Minera — Monitoreo de Flotas de Alto Tonelaje
summary: "Sistema de telemetría para monitoreo en tiempo real de flotas de camiones mineros: volumen de carga, consumo de combustible, ciclos operacionales y mantenimiento predictivo."
category: Plataformas de Datos
solution: data-platforms
featured: true
client: Sector Minero — Operaciones Mina
stack: Python · IoT Sensors · SCADA · PostgreSQL · Grafana
tags: [Python, IoT, Telemetry, Mining, SCADA, Time Series, Grafana]
---

## Problema

Las operaciones mineras de gran escala dependen de flotas de camiones de alto tonelaje (CAT 797F, Komatsu 980E) que operan 24/7. El monitoreo manual de variables críticas — volumen de carga, consumo de combustible, horas de operación y estado mecánico — genera datos fragmentados, reportes tardíos y decisiones reactivas en lugar de predictivas. La falta de integración entre los sistemas de sensores, despacho y mantenimiento impide optimizar la productividad y reducir costos operacionales.

## Arquitectura

Sistema de telemetría end-to-end con 4 capas:

**Capa de Adquisición**: Sensores embarcados en cada camión (GPS, acelerómetros, caudalímetros de combustible, sensores de carga/payload) transmitiendo datos vía red MESH/WiFi industrial hacia el servidor de despacho.

**Capa de Ingesta**: Pipeline de ingesta en tiempo real que recibe, valida y normaliza los datos crudos de sensores. Transformación de señales analógicas a series temporales estructuradas con timestamps sincronizados.

**Capa de Almacenamiento**: Base de datos PostgreSQL con extensión TimescaleDB para series temporales de alta frecuencia. Particionamiento automático por equipo y período. Retención configurable (raw → agregado → archivado).

**Capa de Visualización y Alertas**: Dashboards operacionales en Grafana con paneles de KPIs en tiempo real: toneladas/hora, consumo específico (L/ton·km), disponibilidad mecánica, MTBF/MTTR. Sistema de alertas configurables por umbrales.

```
Sensores (GPS, payload, fuel)  →  Gateway IoT  →  Pipeline Ingesta
                                                        │
                                          ┌─────────────┤
                                          ▼             ▼
                                     PostgreSQL    Validación QA/QC
                                     TimescaleDB        │
                                          │             ▼
                                          └──→  Grafana Dashboards
                                                    │
                                              Alertas / Reportes
```

## Resultado

- **Monitoreo en tiempo real** de +50 camiones de alto tonelaje con latencia <5 segundos
- **Reducción del consumo de combustible** mediante detección de patrones de ralentí excesivo y rutas ineficientes
- **Mantenimiento predictivo**: alertas tempranas basadas en tendencias de vibración, temperatura y horas de operación
- **Dashboard operacional** con KPIs: disponibilidad mecánica, factor de carga, ciclos/hora, consumo específico
- **Reportes automáticos** diarios y mensuales para gerencia de operaciones mina

## Impacto

- Optimización del **factor de carga** al detectar sub-carga y sobre-carga en cada ciclo
- **Reducción de tiempos muertos** mediante análisis de ciclos de carguío-transporte-descarga
- Framework de telemetría **escalable** a equipos de perforación, palas y equipos auxiliares
- Base para evolución hacia **gemelo digital** de la operación minera
