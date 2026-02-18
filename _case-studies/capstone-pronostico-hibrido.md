---
title: Pronóstico Híbrido Espacio-Temporal de Precipitaciones en Chile
summary: "Sistema híbrido de pronóstico de precipitaciones combinando Deep Learning (KoVAE), geoestadística (Kriging) y teledetección satelital para Chile continental."
category: Sistemas de IA & ML
type: Investigación Aplicada
solution: ai-ml-systems
featured: true
client: Universidad del Desarrollo — Tesis Magíster Data Science
role: Data Scientist / Investigador Principal
duration: "10 meses"
stack: Python · TensorFlow · Kriging · ERA5 · CHIRPS · MLflow
tags: [Python, TensorFlow, Deep Learning, Geostatistics, Kriging, Climate]
cover: /assets/images/covers/capstone-pronostico.png
repo: https://github.com/Godoca2/capstone-project-pronostico-hibrido
---

<figure class="case-study-cover">
  <img src="/assets/images/covers/capstone-pronostico.png" alt="Precipitación promedio anual 2020 — ERA5 Reanalysis, Chile continental">
  <figcaption>Precipitación promedio anual 2020 — ERA5 Reanalysis (0.25° grid, Chile continental)</figcaption>
</figure>

## Problema

Chile presenta una fuerte variabilidad espacio-temporal de precipitaciones debido a su extensión latitudinal (17°S – 56°S) y la presencia de la Cordillera de los Andes. Los modelos numéricos tradicionales tienen dificultades para representar las correlaciones espaciales y las dependencias no lineales que caracterizan el clima chileno. Los enfoques puramente estadísticos (ARIMA, SARIMA) pierden la dimensión espacial, y los modelos de Deep Learning end-to-end (ConvLSTM) sufren mode collapse con datos de precipitación (~85% ceros).

## Arquitectura

Diseñé un sistema híbrido en 3 fases con dos pipelines de modelado:

**Fase 1 — Preparación de datos y geoestadística**: Ingesta de datos ERA5 Reanalysis (0.25°, 366 días 2020, grid 157×41). Agregación horaria→diaria, análisis exploratorio por macrozona, variogramas experimentales y Kriging Ordinario para generar pesos espaciales informados físicamente.

**Fase 2A — Pipeline base AE+DMD**: Autoencoder convolucional determinístico (latent 64-dim) con loss ponderada por Kriging + Dynamic Mode Decomposition para proyección temporal. 23 modos estables identificados. Baseline: MAE = 1.934 mm/día.

**Fase 2B — Pipeline KoVAE Physics-Informed**: Variational Autoencoder con operador de Koopman (matriz 128×128) que linealiza dinámicas no lineales en espacio latente. Predicción probabilística con 30 muestras Monte Carlo e intervalos de confianza al 95%. Pérdida compuesta: L = L_recon + β·KL + γ·L_koopman.

**Fase 3 — Validación unificada**: Comparación contra datos satelitales independientes CHIRPS (0.05°, resolución 5× mejor que ERA5) como juez externo.

```
ERA5 (0.25°) → Preprocesamiento → Variogramas/Kriging → Pesos espaciales
                                                              │
                    ┌─────────────────────────────────────────┤
                    ▼                                         ▼
              AE+DMD (determinístico)              KoVAE (probabilístico)
              Latent 64-dim + 23 modos DMD         Latent 128-dim + Koopman K
                    │                                         │
                    └──────────── Validación CHIRPS ──────────┘
                                  (juez independiente)
```

## Resultado

- **KoVAE** alcanzó MAE = 1.070 mm/día — **+44.7% mejora** vs baseline AE+DMD
- **Validación CHIRPS**: +47.1% mejora vs ERA5 Reanalysis
- **Desempeño regional**: Norte +24.3%, Centro +22.9%, Sur +28.3%
- **Cuantificación de incertidumbre** con intervalos de confianza calibrados (CRPS = 3.805)
- **Benchmark** contra ConvLSTM: KoVAE supera en detección de eventos (POD = 0.815)

## Impacto

- El operador de Koopman **corrige la "lluvia fantasma"** de ERA5 en el Desierto de Atacama
- Sistema de pronóstico aplicable a **gestión hídrica, planificación agrícola y riesgo climático**
- Pipeline reproducible con 9 notebooks y código modular en `src/`
- Metodología extensible a cualquier variable geoespacial espacio-temporal
