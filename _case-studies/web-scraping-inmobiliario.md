---
title: Web Scraping Inmobiliario — Pipeline de Datos Geoespaciales
summary: "Pipeline automatizado de extracción de datos inmobiliarios con Selenium, geocodificación con Google APIs y almacenamiento en SQLite para análisis de mercado."
category: Plataformas de Datos
type: Demo Técnica
solution: data-platforms
featured: false
client: Proyecto Académico — Almacenamiento de Datos
role: Data Engineer
duration: "1 mes"
stack: Python · Selenium · Google APIs · SQLite · Pandas
tags: [Python, Selenium, Web Scraping, Google APIs, SQLite, Geocoding]
cover: /assets/images/covers/web-scraping.jpg
repo: https://github.com/Godoca2/Web_Scraping
---

## Problema

El análisis del mercado inmobiliario requiere datos estructurados que los portales web no ofrecen de forma accesible. La información de propiedades, precios, ubicaciones y servicios cercanos está dispersa en páginas HTML dinámicas sin APIs públicas. Recopilar, geocodificar y almacenar estos datos manualmente es inviable a escala.

## Arquitectura

Implementé un pipeline ETL completo de 4 etapas:

**Extracción con Selenium**: Automatización del navegador Chrome para buscar propiedades en Portal Inmobiliario según filtros (tipo de contrato, tipo de inmueble, ubicación en Viña del Mar). Extracción de título, precio, enlace y dirección de cada propiedad.

**Geocodificación**: Integración con la API de Google Geocoding para convertir direcciones textuales en coordenadas (latitud, longitud), habilitando análisis espacial posterior.

**Enriquecimiento con Places API**: Identificación de lugares cercanos a cada propiedad (restaurantes, supermercados, hospitales) usando Google Places API con radios configurables.

**Almacenamiento en SQLite**: Base de datos relacional local con tablas normalizadas para inmuebles y lugares cercanos. Consultas SQL analíticas integradas (promedios de precios, ratings de servicios cercanos).

```
Portal Inmobiliario → Selenium (scraping) → Datos crudos (CSV)
                                                    │
                                    Google Geocoding API → Coordenadas
                                                    │
                                    Google Places API → Lugares cercanos
                                                    │
                                              SQLite DB → Consultas analíticas
```

## Resultado

- **Pipeline automatizado** de extracción de propiedades en arriendo
- **Geocodificación** completa de todas las propiedades extraídas
- **Base de datos SQLite** con modelo relacional (inmuebles + lugares cercanos)
- **Consultas analíticas**: precio promedio por zona, rating de servicios cercanos

## Impacto

- Reducción de horas de recopilación manual a **minutos de ejecución automatizada**
- Datos listos para análisis espacial y visualización geográfica
- Pipeline reutilizable para cualquier ciudad o tipo de propiedad
- Modelo de datos extensible para agregar nuevas fuentes
