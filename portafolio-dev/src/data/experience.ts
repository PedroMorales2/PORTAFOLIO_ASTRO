export interface ExperienceItem {
  period: string;
  title: string;
  org: string;
  location?: string;
  description: string;
  tags?: string[];
  /** Ruta al PDF de la constancia oficial en /public/docs */
  credential?: string;
  todo?: boolean;
}

/**
 * Trayectoria profesional y académica — fechas verificadas con constancias oficiales.
 * Orden: más reciente primero.
 */
export const EXPERIENCE: ExperienceItem[] = [
  {
    period: "May — Jun 2026",
    title: "Operador del Centro de Cómputo",
    org: "ONPE — ODPE Chiclayo · Segunda Elección Presidencial 2026",
    credential: "/docs/constancia-onpe-segunda-vuelta.pdf",
    location: "Chiclayo, Perú",
    description:
      "Operación y soporte técnico de los equipos de cómputo durante la segunda vuelta electoral, aplicando protocolos de control de calidad y verificación de datos bajo estándares ONPE.",
    tags: ["Soporte técnico", "Control de calidad", "Procesos electorales"],
  },
  {
    period: "Mar — Abr 2026",
    title: "Operador de Cómputo",
    org: "ONPE — ODPE Chiclayo · Elecciones Generales 2026",
    credential: "/docs/constancia-onpe-elecciones-generales.pdf",
    location: "Chiclayo, Perú",
    description:
      "Digitalización de actas electorales con altos estándares de precisión y confidencialidad. Control de calidad del software del proceso electoral —reporte de incidencias y validación de resultados— y configuración y mantenimiento de los servicios informáticos del centro de cómputo.",
    tags: ["Digitalización", "QA de software", "Servicios informáticos"],
  },
  {
    period: "Nov 2025",
    title: "Operador Informático",
    org: "Universidad ESAN · Concurso Beca 18, Convocatoria 2026",
    credential: "/docs/constancia-esan-beca18.pdf",
    description:
      "Soporte informático en las jornadas del proceso de convocatoria de Beca 18 (9, 15 y 16 de noviembre de 2025).",
    tags: ["Soporte informático"],
  },
  {
    period: "Mar — Jul 2025",
    title: "Practicante de Cómputo",
    org: "Municipalidad Distrital de Reque · Unidad Funcional de Informática",
    credential: "/docs/constancia-practicas-muni-reque.pdf",
    location: "Reque, Lambayeque, Perú",
    description:
      "Prácticas preprofesionales (350 horas). Desarrollé el sistema de registro y seguimiento de incidencias ciudadanas que hoy es la base de mi tesis de pregrado. Además: mantenimiento preventivo y correctivo de equipos municipales e instalación de cableado estructurado y cámaras de seguridad.",
    tags: ["Flask", "Desarrollo de software", "Redes", "Soporte"],
  },
  {
    period: "2020 — Actualidad",
    title: "Estudiante de Ingeniería de Sistemas y Computación",
    org: "Universidad Católica Santo Toribio de Mogrovejo (USAT)",
    credential: "/docs/constancia-estudios-usat.pdf",
    location: "Chiclayo, Lambayeque, Perú",
    description:
      "Egreso 2026 · 193 créditos y 60 asignaturas aprobadas. Tesis en curso: aplicativo móvil y central para la gestión de incidencias con georreferenciación y análisis predictivo (Municipalidad de Reque). Cursos clave aprobados: Inteligencia Artificial, Desarrollo de Sistemas Inteligentes, Minería de Datos y Big Data, Sistemas Distribuidos, Seguridad Informática e Ingeniería y Calidad de Software (20/20).",
    tags: ["IA", "Ingeniería de Software", "Tesis con IA aplicada"],
  },
];
