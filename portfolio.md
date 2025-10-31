---
layout: default
title: Portafolio
---


# Portafolio
Listado completo de proyectos públicos. Para más, visita mi GitHub.


{% assign items = site.projects %}
<div class="grid">
{% for p in items %}
<div class="card">
<h3>{{ p.title }}</h3>
<p class="meta">{{ p.stack }}</p>
<p>{{ p.summary }}</p>
<p><a class="btn" href="{{ p.url }}">Ver</a></p>
</div>
{% endfor %}
</div>
