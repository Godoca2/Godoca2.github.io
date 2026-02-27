---
layout: page
title: Sobre mí
permalink: /about/
description: "Ingeniero de Datos con más de 12 años diseñando plataformas de datos, soluciones GIS y Sistemas."
---

## Perfil Profesional

Soy **Ingeniero de Datos** con más de 12 años de experiencia diseñando e implementando plataformas de datos, soluciones de inteligencia geoespacial y sistemas de IA/ML para organizaciones del sector geocientífico.

Mi enfoque es construir **infraestructura de datos como sistemas**, no como colecciones de herramientas. Cada solución que diseño tiene un modelo de datos gobernado, pipelines automatizados con QA/QC, y una capa de presentación que transforma datos en decisiones.

## Experiencia

**Líder del Área de Tecnología** — Actualmente coordino equipos de SIG, Ingeniería de Datos y TI, con foco en gobierno de datos, calidad y entrega de proyectos con impacto medible.

**Ingeniero de Datos Senior** — He diseñado y mantenido plataformas de datos centralizadas con PostgreSQL/PostGIS, pipelines ETL automatizados y dashboards ejecutivos en Power BI y Tableau.

**Consultor GIS / Data Science** — He implementado soluciones de análisis espacial, modelos predictivos y sistemas de monitoreo ambiental para múltiples organizaciones.

## Formación

- **Máster Data Science** - (Facultad Ciencias de la ingeniería, Universidad del Desarrollo)
- **Diplomado en Business Intelligence** - (Facultad de Economia y negocios, Universidad de Chile)
- **Diplomado en Ciencia de Datos** - (Facultad de Matemáticas, Pontificia Universidad Católica de Chile)
- **Licenciado en Ingeniería Informática y Multimedia** - (Facultad de Negocios y Tecnología, UNIACC)


## Competencias Técnicas

<div class="skills-grid">
{% for group in site.data.skills %}
<div class="skill-group">
<h4>{{ group.category }}</h4>
<ul>
{% for item in group.items %}
<li>{{ item }}</li>
{% endfor %}
</ul>
</div>
{% endfor %}
</div>

## Filosofía de Trabajo

> Los datos no son un subproducto de las operaciones. Son **infraestructura estratégica** que debe ser diseñada, gobernada y mantenida con la misma rigurosidad que cualquier sistema de ingeniería.

Mis principios:
- **Sistemas sobre herramientas**: La tecnología cambia; la arquitectura bien diseñada perdura.
- **Datos gobernados**: Cada dato debe tener un origen conocido, una validación aplicada y un uso definido.
- **Pragmatismo sobre perfeccionismo**: Entregar valor incremental es mejor que diseñar la solución perfecta que nunca se implementa.
- **Documentación como código**: Si no está documentado, no existe.

---

<div class="text-center">
<a class="btn btn-primary" href="/contact/">Conversemos</a>
<a class="btn btn-ghost" href="{{ site.linkedin }}" target="_blank" rel="noopener">LinkedIn</a>
<a class="btn btn-ghost" href="{{ site.github }}" target="_blank" rel="noopener">GitHub</a>
</div>
