export interface Project {
  slug: string;
  index: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
  results: string;
  stack: string[];
  cover: string;
  coverAlt: string;
  github?: string;
  live?: string;
  accent: string; // color de acento del case study
}

/**
 * Case studies destacados (selección: IA + emprendimiento).
 * Datos, métricas y repos reales; lo pendiente está marcado con TODO.
 */
export const PROJECTS: Project[] = [
  {
    slug: "incidencias-reque",
    index: "01",
    title: "Gestión de Incidencias con IA — Municipalidad de Reque",
    category: "GovTech · IA · Móvil — Tesis de pregrado",
    tagline:
      "Sistema central + app Android que convierte reportes ciudadanos georreferenciados en predicción de zonas de riesgo. Nació en mis prácticas municipales y hoy es mi tesis.",
    problem:
      "La Municipalidad Distrital de Reque no tenía registro ni seguimiento de incidencias ciudadanas: reportes dispersos, sin ubicación precisa, sin trazabilidad por sectores y sin datos para decidir dónde actuar primero.",
    solution:
      "Un sistema web central en Flask y una app Android con reporte georreferenciado y navegación por swipe. DBSCAN agrupa los reportes en zonas críticas y un modelo LSTM anticipa la evolución de incidencias, visualizado sobre Mapbox/Leaflet con trazabilidad por sectores.",
    architecture:
      "App Android (OSMDroid, Retrofit) → API REST Flask → base de datos relacional → pipeline de ML (DBSCAN para clustering espacial, LSTM para series temporales) → mapas Mapbox/Leaflet en el panel central.",
    challenges:
      "Calibrar DBSCAN para la densidad urbana real de Reque, conseguir series temporales limpias para el LSTM y mantener una experiencia móvil fluida con mapas offline-friendly (OSMDroid).",
    results:
      "LSTM con R² = 0.83 · 18 zonas críticas identificadas con DBSCAN · usabilidad SUS ≈ 78–83. En curso: Seminario de Tesis II (2026-I).",
    stack: ["Flask", "Python", "LSTM", "DBSCAN", "Mapbox / Leaflet", "Android", "OSMDroid", "Retrofit", "MySQL"],
    cover: "/projects/incidencias.svg",
    coverAlt: "Visual abstracto de mapa con clusters de incidencias y línea de pronóstico",
    github: "https://github.com/PedroMorales2/SISTEMA_MUNI",
    live: undefined,
    accent: "#8b9dff",
  },
  {
    slug: "recepcionista-ia",
    index: "02",
    title: "Recepcionista Virtual con IA para Salón y Spa",
    category: "IA conversacional · Cliente en producción",
    tagline:
      "Asistente conversacional con LLM local que atiende consultas del negocio, integrado al sistema de gestión que el cliente ya usa en producción.",
    problem:
      "El salón y spa atiende consultas repetitivas (servicios, precios, reservas) que consumen tiempo del personal y se pierden fuera de horario.",
    solution:
      "Un recepcionista virtual con LLM local vía Ollama —sin depender de APIs de pago—, traducción español offline con caché (Argos Translate) y un motor de reglas de negocio, montado como módulo del sistema Flask/MySQL en producción.",
    architecture:
      "Sistema de gestión Flask/MySQL en producción → módulo conversacional → Ollama (LLM local) + Argos Translate (traducción offline con caché) + motor de reglas de negocio.",
    challenges:
      "Mantener latencia aceptable con un LLM local, cachear traducciones para no penalizar cada respuesta y encajar el módulo en un sistema ya operativo sin interrumpir al cliente.",
    results:
      "Integrado al sistema en producción del cliente. Roadmap: llamadas de voz con Twilio, fuzzy matching de servicios y manejo multi-turno. TODO: métricas de atención.",
    stack: ["Ollama", "Argos Translate", "Flask", "MySQL", "Python"],
    cover: "/projects/asistente-voz.svg",
    coverAlt: "Visual abstracto de ondas conversacionales procesadas por IA",
    github: undefined, // TODO: enlace al repositorio si se publica
    live: undefined,
    accent: "#5cdfff",
  },
  {
    slug: "crm-whatsapp",
    index: "03",
    title: "CRM de WhatsApp con Automatización e IA",
    category: "Automatización · IA · Infraestructura",
    tagline:
      "Flujos conversacionales de WhatsApp con historial persistente e IA, corriendo en infraestructura propia administrada de punta a punta.",
    problem:
      "Atender clientes por WhatsApp de forma manual no escala: sin historial estructurado, sin respuestas consistentes y sin datos para hacer seguimiento comercial.",
    solution:
      "Un CRM conversacional sobre la Meta WhatsApp Cloud API orquestado con n8n: flujos con historial persistente por contacto y respuestas generadas con GPT-4o-mini, desplegado en infraestructura propia.",
    architecture:
      "Meta WhatsApp Cloud API → n8n (orquestación de flujos, en Docker) → OpenAI GPT-4o-mini → persistencia del historial. Despliegue: VM Ubuntu (VirtualBox) con IP estática, servicios systemd y autenticación SSH por llave.",
    challenges:
      "Administrar la infraestructura completa (red, servicios, seguridad de acceso), mantener el contexto conversacional por cliente y diseñar flujos de n8n mantenibles.",
    results: "Desplegado y operativo en VM propia. TODO: métricas de conversaciones y repositorio.",
    stack: ["n8n", "Docker", "Meta WhatsApp Cloud API", "GPT-4o-mini", "Ubuntu", "systemd", "SSH"],
    cover: "/projects/crm-whatsapp.svg",
    coverAlt: "Visual abstracto de burbujas de chat conectadas por flujos de automatización",
    github: undefined, // TODO
    live: undefined,
    accent: "#4be0c0",
  },
  {
    slug: "mora",
    index: "04",
    title: "MORA — Asistente Personal de IA",
    category: "IA · Hardware · Producto en planeación",
    tagline:
      "Mi JARVIS: un asistente de voz privado que vive en casa, no en la nube. Wake word «Hola Mora». Arquitectura documentada, con aspiración comercial.",
    problem:
      "Los asistentes comerciales envían tu voz a la nube, no recuerdan contexto a largo plazo y no se integran a la medida de un hogar real.",
    solution:
      "Un asistente de 3 capas: dispositivos ESP32-S3 con wake word local, un hub casero con LLM vía Ollama y capa cloud opcional. Memoria de largo plazo con RAG sobre pgvector, pipeline de voz completo y control del hogar vía Home Assistant, con visión mediante doble ESP32.",
    architecture:
      "Capa 1: ESP32-S3 (microWakeWord, audio). Capa 2: hub local — faster-whisper (STT), Ollama (razonamiento), Piper/Kokoro (TTS), RAG con pgvector (memoria). Capa 3: cloud opcional. Integración domótica: Home Assistant.",
    challenges:
      "Orquestar un pipeline de voz de baja latencia 100 % local, diseñar memoria de largo plazo útil sin degradar el contexto y mantener el BOM en un costo viable para producto.",
    results:
      "Documento maestro de arquitectura v1.1 con BOM completo. Etapa: planeación con aspiración comercial. TODO: prototipo funcional y repositorio.",
    stack: ["ESP32-S3", "Ollama", "RAG · pgvector", "faster-whisper", "Piper / Kokoro", "Home Assistant", "microWakeWord"],
    cover: "/projects/mora.svg",
    coverAlt: "Visual abstracto de un núcleo de asistente de voz con capas orbitales",
    github: undefined, // TODO
    live: undefined,
    accent: "#c9b8ff",
  },
  {
    slug: "detector-fatiga",
    index: "05",
    title: "Detector de Fatiga Facial",
    category: "Visión computacional · Seguridad vial",
    tagline:
      "Detección en tiempo real de señales de somnolencia en conductores mediante landmarks faciales, orientado a prevenir accidentes de tránsito.",
    problem:
      "La somnolencia al volante causa accidentes que podrían prevenirse si algo detectara las señales de fatiga del conductor antes del microsueño.",
    solution:
      "Un sistema de visión computacional que sigue los landmarks faciales del conductor con dlib y OpenCV, identifica patrones de somnolencia (cierre ocular, cabeceo) en tiempo real y lo expone como servicio Flask.",
    architecture:
      "Captura de video → detección de rostro y 68 landmarks (dlib) → métricas de apertura ocular y pose (OpenCV/Python) → umbrales de alerta en tiempo real → servicio Flask.",
    challenges:
      "Mantener la detección estable con poca luz y ángulos de cámara reales, y calibrar los umbrales de alerta para minimizar falsos positivos sin perder sensibilidad.",
    results: "TODO: métricas de precisión y latencia del sistema.",
    stack: ["Python", "OpenCV", "dlib", "Flask"],
    cover: "/projects/fatiga.svg",
    coverAlt: "Visual abstracto de malla facial con landmarks y alerta ocular",
    github: "https://github.com/PedroMorales2/detector-facial-fatiga",
    live: undefined,
    accent: "#ffd479",
  },
  {
    slug: "tinkuy",
    index: "06",
    title: "Tinkuy — Reserva de Canchas Deportivas",
    category: "Emprendimiento · Plataforma web",
    tagline:
      "Plataforma peruana para encontrar y reservar canchas deportivas, diseñada como negocio: modelo, API y datos definidos antes de la primera línea de código.",
    problem:
      "Reservar una cancha en Perú sigue siendo por llamada o WhatsApp: sin disponibilidad visible, sin pagos en línea y sin gestión para los dueños de los locales.",
    solution:
      "Una plataforma de reservas con disponibilidad en tiempo real para jugadores y panel de gestión para locales, con pagos vía MercadoPago en el roadmap. El proyecto parte de un business model canvas, spec de API y esquema de datos completos.",
    architecture:
      "Frontend React → API Flask → persistencia híbrida: PostgreSQL (transaccional: reservas, pagos) + MongoDB (catálogo flexible). Integración de pagos planeada con MercadoPago.",
    challenges:
      "Diseñar reservas a prueba de colisiones de horario, definir el modelo de datos híbrido SQL/NoSQL y equilibrar el producto técnico con el modelo de negocio.",
    results:
      "Business model canvas, spec de API, esquema de base de datos y estructura de Notion completos. Etapa: pre-lanzamiento. TODO: repositorio y demo.",
    stack: ["Flask", "React", "PostgreSQL", "MongoDB", "MercadoPago (roadmap)"],
    cover: "/projects/tinkuy.svg",
    coverAlt: "Visual abstracto de cancha deportiva con pin de reserva",
    github: undefined, // TODO
    live: undefined,
    accent: "#7ee787",
  },
];

export interface MiniProject {
  title: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
}

/** Proyectos adicionales — grilla compacta bajo los case studies. */
export const MORE_PROJECTS: MiniProject[] = [
  {
    title: "Sistema Salón y Spa",
    description:
      "Sistema de gestión en producción para cliente real: reservas, cotizaciones, caja y control de stock.",
    stack: ["Flask", "MySQL", "Bootstrap"],
  },
  {
    title: "Sistema COBIT 2019 — APO02",
    description:
      "Plataforma de diagnóstico digital, planeación estratégica de TI, gestión de brechas y roadmap PETI para la Municipalidad de Jayanca.",
    stack: ["Flask", "MySQL puro", "Bootstrap 5", "COBIT 2019"],
  },
  {
    title: "Hackathon USAT — proyecto ganador",
    description: "Solución ganadora del hackathon universitario de la USAT.",
    stack: ["Hackathon"],
    github: "https://github.com/PedroMorales2/hackaton-usat_v1",
  },
  {
    title: "ITIL Access Management",
    description:
      "Proyecto de gestión de accesos para la Municipalidad de Reque con documentación IEEE completa y manipulación XML a nivel DOCX (17 figuras).",
    stack: ["ITIL v3", "IEEE", "Automatización DOCX"],
  },
  {
    title: "Manual y presentación — estudio de abogados",
    description:
      "Manual de usuario de 29 secciones y presentación de 15 diapositivas para Danty Vásquez Flores & Asociados, generados con automatización de navegador sobre su sistema Next.js/Payload CMS.",
    stack: ["Automatización", "Next.js / Payload CMS"],
  },
  {
    title: "Comparativa ISO 27001 vs ISO 27005",
    description:
      "Monografía y presentación basadas en un proyecto real de seguridad de la información para la Municipalidad de Reque.",
    stack: ["ISO 27001", "ISO 27005", "Seguridad"],
  },
  {
    title: "Chiclayo Gastronómico",
    description:
      "Plataforma de turismo gastronómico (proyecto universitario): casos de uso, MoSCoW, historias de usuario y wireframes.",
    stack: ["Análisis de sistemas", "UX"],
  },
  {
    title: "SWAPP",
    description: "Interfaz de exchange de criptomonedas SOL/PEN.",
    stack: ["Frontend", "Cripto"],
  },
  {
    title: "Este portafolio",
    description:
      "Sitio construido con Astro 5, Tailwind v4, React Three Fiber y GSAP — arquitectura de islas con hidratación mínima.",
    stack: ["Astro", "Three.js", "GSAP"],
    github: "https://github.com/PedroMorales2/PORTAFOLIO_ASTRO",
  },
];
