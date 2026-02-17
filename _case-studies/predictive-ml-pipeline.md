---
title: Pipeline ML — Predicción de Propinas NYC
summary: "Pipeline modular de machine learning con feature engineering, tracking de experimentos con MLflow y evaluación automatizada por cohortes temporales."
category: AI / ML
type: Demo Técnica
solution: ai-ml-systems
featured: true
client: Proyecto de demostración técnica
role: ML Engineer
duration: "2 meses"
stack: Python · MLflow · Scikit-learn
tags: [Python, MLflow, Scikit-learn, MLOps, Feature Engineering]
repo: https://github.com/Godoca2/NYC-Tips-ML
---

## Problema

La mayoría de proyectos de ML funcionan como notebooks monolíticos sin reproducibilidad, sin tracking de experimentos y sin una estrategia de evaluación que considere la dimensión temporal. Este proyecto demuestra cómo diseñar un pipeline de ML listo para producción.

## Arquitectura

Diseñé un pipeline modular con separación clara de responsabilidades:

**Feature Store simple**: Transformaciones documentadas y versionadas que alimentan cualquier modelo del pipeline. Cada feature tiene su lógica de cálculo registrada.

**Tracking de experimentos**: Integración con MLflow para registrar hiperparámetros, métricas, artefactos y modelos. Cada ejecución es trazable y comparable.

**Evaluación temporal**: Sistema de evaluación por cohortes mensuales que detecta degradación del modelo y genera reportes comparativos automáticos.

```
Datos crudos → Feature Engineering → Train/Eval → MLflow Tracking → Reportes
     │                │                   │              │              │
  NYC Taxi         Feature store,     Scikit-learn,   Experimentos,  Métricas por
  dataset          transformaciones   XGBoost         artefactos     cohorte
```

## Resultado

- **Pipeline reproducible** con 5 etapas independientes y testeables
- **Feature store** con 15+ features documentadas
- **Tracking** completo de 20+ experimentos con MLflow
- **Evaluación automatizada** mensual con detección de drift

## Impacto

- Demuestra la brecha entre "notebook ML" y **"sistema ML"**
- Template reutilizable para cualquier problema de regresión/clasificación
- **70% de reducción** en tiempo de ciclo experimentación → evaluación
- Documentación técnica que sirve como referencia de MLOps pragmático
