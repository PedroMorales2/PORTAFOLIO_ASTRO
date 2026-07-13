# Pedro Morales — Portafolio

Portafolio personal de **Pedro Morales Serrato**, Ingeniero de Software (Full Stack · IA · Backend · Móvil · Cloud). Reconstrucción completa v2.0 con una arquitectura de islas y una experiencia visual de nivel producto.

## Stack

| Capa | Tecnología |
| --- | --- |
| Framework | [Astro 5](https://astro.build) (SSG, arquitectura de islas) |
| Lenguaje | TypeScript (strict) |
| Estilos | Tailwind CSS v4 (tokens vía `@theme` en CSS) |
| 3D | Three.js + React Three Fiber + Drei (isla React `client:only`) |
| Animación | GSAP + ScrollTrigger, Lenis (scroll suave), Framer Motion (cursor) |
| Iconos | Lucide |
| Fuentes | Space Grotesk (display) · Inter (texto) · JetBrains Mono (detalles) — self-hosted vía Fontsource |

## Arquitectura

```
src/
├── data/            # Única fuente de verdad del contenido (perfil, proyectos, skills…)
├── styles/          # global.css: design system completo (tokens, utilidades, a11y)
├── scripts/         # app.ts: Lenis + GSAP + reveals + interacciones magnéticas
├── layouts/         # BaseLayout.astro: SEO, OG, fuentes, cursor, scripts
├── components/
│   ├── ui/          # Piezas reutilizables (SectionHeading…)
│   ├── sections/    # Hero, Sobre mí, Trayectoria, Stack, Proyectos, Filosofía, Contacto
│   ├── three/       # HeroScene.tsx — experiencia 3D (isla React)
│   └── interactive/ # Cursor.tsx — cursor personalizado (isla React)
└── pages/           # index.astro, 404.astro
```

**Principios:**

- **Islas mínimas**: solo se hidratan la escena 3D y el cursor. Todo lo demás es HTML estático renderizado en build.
- **Rendimiento**: fuentes self-hosted, imágenes lazy, JS diferido, DPR limitado en el canvas, render 3D pausado fuera del viewport.
- **Accesibilidad**: HTML semántico, skip-link, navegación por teclado, `aria-*` en iconos y controles, y respeto total a `prefers-reduced-motion` (las animaciones y el 3D se desactivan).
- **Contenido honesto**: los datos viven en `src/data/`. Lo que falta está marcado con `TODO` — nada inventado.

## Comandos

```bash
npm install     # instalar dependencias
npm run dev     # servidor de desarrollo (localhost:4321)
npm run build   # build de producción en dist/
npm run preview # previsualizar el build
npm run check   # chequeo de tipos con astro check
```

## TODO pendientes de contenido

- [x] CV en PDF (`public/cv.pdf`) enlazado en el hero
- [x] Foto de perfil en alta resolución (`src/assets/foto-perfil.png`, optimizada con astro:assets)
- [x] Constancias y certificados oficiales en `public/docs/`, enlazados desde Trayectoria
- [ ] Repos/demos pendientes: Recepcionista IA, CRM WhatsApp, MORA, Tinkuy (`src/data/projects.ts`)
- [ ] Métricas pendientes: detector de fatiga, recepcionista IA, CRM WhatsApp
- [ ] Certificación de inglés B1 y «ABC de la Interculturalidad»: institución y fechas (`src/data/certifications.ts`)
- [ ] Reconocimientos: fecha del hackathon USAT y detalles de la tutoría par
- [ ] Reemplazar las portadas SVG por capturas reales de cada proyecto
- [ ] Definir el dominio final en `astro.config.ts` (`site`)
