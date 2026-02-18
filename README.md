# César Godoy Delaigue — Technical Profile

**Data Systems Engineer** · GIS · Data Scientist

Sitio profesional estático construido con Jekyll + GitHub Pages.

## Stack del sitio

- **Engine**: Jekyll (GitHub Pages nativo)
- **CSS**: Custom design system con dark/light theme (sin frameworks)
- **JS**: Vanilla JS (~50 líneas: theme toggle, mobile nav)
- **Fonts**: Inter + JetBrains Mono (Google Fonts)
- **Icons**: Font Awesome 6

## Estructura

```
_solutions/        → Dominios de solución (Data, GIS, AI)
_case-studies/     → Casos de estudio (Problema→Arquitectura→Resultado→Impacto)
_layouts/          → Plantillas: default, page, case-study, solution
_includes/         → Componentes: nav, head, footer
_data/             → Datos: navigation, skills, metrics
assets/css/        → Design system completo
assets/js/         → Theme toggle + interacciones
```

## Desarrollo local

```bash
gem install bundler jekyll
bundle install
bundle exec jekyll serve
```

## Mantenimiento

Ver [MAINTENANCE.md](MAINTENANCE.md) para instrucciones detalladas.

## Licencia

© César Godoy Delaigue. Todos los derechos reservados.




