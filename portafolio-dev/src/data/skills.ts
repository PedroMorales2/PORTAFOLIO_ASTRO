export interface SkillDomain {
  domain: string;
  icon: string; // nombre de icono lucide (referencial)
  skills: string[];
}

/**
 * Stack técnico organizado por dominios.
 * Derivado de proyectos reales, prácticas y certificaciones.
 */
export const SKILL_DOMAINS: SkillDomain[] = [
  {
    domain: "Inteligencia Artificial",
    icon: "brain",
    skills: [
      "Ollama · LLM local",
      "OpenAI API",
      "LSTM · pronóstico",
      "DBSCAN · clustering",
      "RAG · pgvector",
      "faster-whisper",
      "Piper / Kokoro",
      "OpenCV",
      "dlib",
    ],
  },
  {
    domain: "Backend",
    icon: "server",
    skills: ["Python", "Flask", "Laravel", "APIs REST", "MVC · capas"],
  },
  {
    domain: "Frontend",
    icon: "monitor",
    skills: ["React", "Astro", "TypeScript", "JavaScript", "Tailwind CSS", "Bootstrap", "HTML", "CSS"],
  },
  {
    domain: "Móvil",
    icon: "smartphone",
    skills: ["Android nativo", "OSMDroid", "Retrofit", "Geolocalización"],
  },
  {
    domain: "Mapas y geodatos",
    icon: "map",
    skills: ["Mapbox", "Leaflet", "OpenStreetMap", "Clustering espacial"],
  },
  {
    domain: "Bases de datos",
    icon: "database",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "pgvector", "Modelado de datos"],
  },
  {
    domain: "Automatización e infraestructura",
    icon: "workflow",
    skills: [
      "n8n",
      "Docker",
      "VMs Linux · systemd",
      "SSH",
      "VirtualBox",
      "Argos Translate",
      "Git · GitHub",
      "PythonAnywhere",
    ],
  },
  {
    domain: "Metodologías y marcos",
    icon: "award",
    skills: [
      "ITIL v3",
      "COBIT 2019",
      "ISO 9001 / 14001 / 45001",
      "ISO 27001 / 27005",
      "Documentación IEEE",
      "PRISMA",
    ],
  },
];
