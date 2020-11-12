---
layout: page.njk
EPUBRoot: ".."
---
# {{metadata.dc.title}}

{% if pub.cover.src %}
![{{pub.cover.alt}}]({{EPUBRoot}}/{{pub.cover.src}})
{% endif %}