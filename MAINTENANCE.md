# Guía de Mantenimiento del Sitio

## Arquitectura del Repositorio

```
/
├── _config.yml                    # Configuración global del sitio
├── _data/
│   ├── navigation.yml             # Enlaces de navegación
│   ├── metrics.yml                # Métricas destacadas del hero
│   └── skills.yml                 # Stack tecnológico por categoría
├── _includes/
│   ├── head.html                  # <head> con meta, fonts, CSS
│   ├── nav.html                   # Barra de navegación responsive
│   └── footer.html                # Pie de página con social links
├── _layouts/
│   ├── default.html               # Layout base (nav + main + footer)
│   ├── page.html                  # Páginas genéricas (about, contact)
│   ├── case-study.html            # Caso de estudio (Problema→Arq→Resultado→Impacto)
│   ├── solution.html              # Página de dominio de solución
│   └── project.html               # Legacy redirect → case-study
├── _solutions/                    # Colección: Dominios de solución
│   ├── data-platforms.md
│   ├── geospatial-intelligence.md
│   └── ai-ml-systems.md
├── _case-studies/                 # Colección: Casos de estudio detallados
│   ├── portal-gestor-hidrico.md
│   ├── network-science-aquifers.md
│   ├── predictive-ml-pipeline.md
│   ├── bivariate-geospatial.md
│   └── planificador-flow.md
├── assets/
│   ├── css/styles.css             # Sistema de diseño completo con dark/light
│   ├── js/main.js                 # Theme toggle, mobile nav, smooth scroll
│   └── images/
│       ├── covers/                # Imágenes de portada de casos
│       └── diagrams/              # Diagramas de arquitectura (PNG/SVG)
├── index.md                       # Homepage
├── portfolio.md                   # → /case-studies/ (listing de casos)
├── services.md                    # → /solutions/ (listing de soluciones)
├── architecture.md                # → /architecture/ (diagramas)
├── about.md                       # → /about/
├── contact.md                     # → /contact/
├── README.md                      # Documentación del repo
└── MAINTENANCE.md                 # Esta guía
```

---

## Cómo Agregar un Nuevo Caso de Estudio

1. Crear un archivo `.md` en `_case-studies/` con el nombre slug:
   ```
   _case-studies/nombre-del-proyecto.md
   ```

2. Usar esta plantilla de front matter:
   ```yaml
   ---
   title: "Título del Caso"
   summary: "Frase de una línea que describe qué se construyó."
   category: "Plataforma de Datos"  # o "Inteligencia Geoespacial" o "AI / ML"
   type: "Producción"               # o "Demo Técnica" o "Investigación Aplicada"
   solution: "data-platforms"        # slug de la solución relacionada
   featured: true                    # true = aparece en homepage
   client: "Sector / Cliente"
   role: "Rol que desempeñaste"
   duration: "X meses"
   stack: "Tech1 · Tech2 · Tech3"
   tags: [Tech1, Tech2, Tech3]
   repo: "https://github.com/..."   # opcional
   ---
   ```

3. Escribir el contenido con estas secciones:
   ```markdown
   ## Problema
   ¿Qué problema existía? ¿Por qué importaba?

   ## Arquitectura
   ¿Cómo diseñaste la solución? Incluir diagrama ASCII o imagen.

   ## Resultado
   ¿Qué se entregó concretamente?

   ## Impacto
   Métricas, reducciones porcentuales, mejoras medibles.
   ```

---

## Cómo Agregar una Nueva Solución

1. Crear un archivo en `_solutions/`:
   ```yaml
   ---
   title: "Nombre del Dominio"
   description: "Qué resuelve este dominio."
   icon: "🔧"                      # Emoji para el card
   tags: [Tech1, Tech2]
   order: 4                         # Orden de aparición
   slug: "nombre-slug"              # Para vincular case-studies
   ---
   ```

2. Secciones sugeridas: `## El problema`, `## Mi enfoque`, `## Stack técnico`, `## Resultados típicos`.

---

## Cómo Modificar la Navegación

Editar `_data/navigation.yml`:
```yaml
- title: Nueva Página
  url: /nueva-pagina/
```

---

## Cómo Actualizar Métricas

Editar `_data/metrics.yml`:
```yaml
- value: "15+"
  label: "Nueva Métrica"
```

---

## Cómo Actualizar Skills

Editar `_data/skills.yml` — estructurado por categorías.

---

## Tema Oscuro / Claro

El sistema usa CSS custom properties con `data-theme="light"` / `data-theme="dark"` en `<html>`.
La preferencia se guarda en `localStorage` como `theme-preference`.
El toggle está implementado en `assets/js/main.js`.

Para modificar colores, editar las secciones `:root` y `[data-theme="dark"]` en `assets/css/styles.css`.

---

## Deploy

El sitio se despliega automáticamente con GitHub Pages en cada push a la rama principal.

1. Hacer cambios locales
2. `git add .`
3. `git commit -m "Descripción del cambio"`
4. `git push origin main`

El sitio se reconstruye automáticamente en 1-2 minutos.

---

## Checklist antes de Publicar

- [ ] ¿El front matter de cada caso tiene `title`, `summary`, `type`, `solution`, `tags`?
- [ ] ¿Las imágenes están optimizadas (< 200KB, formato WebP/PNG)?
- [ ] ¿Los links internos apuntan a las URLs correctas?
- [ ] ¿Se probó en modo claro y oscuro?
- [ ] ¿La página se ve correcta en móvil?
- [ ] ¿El `_data/navigation.yml` refleja la estructura actual?
