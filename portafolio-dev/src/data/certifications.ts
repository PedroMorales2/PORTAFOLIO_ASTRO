export interface Certification {
  title: string;
  org: string;
  date: string;
  detail?: string;
  /** Ruta al PDF del certificado en /public/docs */
  credential?: string;
  todo?: boolean;
}

/** Cursos y certificaciones — verificados con documentos oficiales. */
export const CERTIFICATIONS: Certification[] = [
  {
    title: "Especialización en Sistemas Integrados de Gestión — ISO 9001 · ISO 14001 · ISO 45001",
    org: "IED Stratton, avalado por el CIP (CD Pasco) y la Cámara de Comercio de Lima",
    date: "Nov — Dic 2025",
    detail:
      "150 horas académicas · Nota 20/20 · Incluye ISO 31000 (riesgos) y auditorías internas ISO 19011",
    credential: "/docs/certificado-sig-iso.pdf",
  },
  {
    title: "Ciberseguridad 360: Protegiendo el presente, asegurando el futuro",
    org: "Colegio de Ingenieros del Perú — CD Lambayeque",
    date: "Nov 2025",
    detail: "2 horas académicas · Asistente",
    credential: "/docs/certificado-ciberseguridad.pdf",
  },
  {
    title: "Bootcamp Internacional Tech & Innovation 2025",
    org: "Universidad Nacional Pedro Ruiz Gallo — Vicerrectorado de Investigación (GITD)",
    date: "Sep 2025",
    detail: "36 horas académicas · Modalidad híbrida internacional (España, Singapur, Perú, Paraguay, México)",
    credential: "/docs/constancia-bootcamp-unprg.pdf",
  },
  {
    title: "Inglés — Nivel B1",
    org: "TODO: institución o plataforma",
    date: "2024",
    todo: true,
  },
  {
    title: "El ABC de la Interculturalidad",
    org: "TODO: institución, duración y fecha exacta",
    date: "2025",
    todo: true,
  },
];

export interface Recognition {
  title: string;
  org: string;
  date: string;
  detail?: string;
  link?: string;
  /** Ruta al PDF del certificado en /public/docs */
  credential?: string;
  todo?: boolean;
}

export const RECOGNITIONS: Recognition[] = [
  {
    title: "Proyecto ganador — Hackathon universitario USAT",
    org: "Universidad Católica Santo Toribio de Mogrovejo",
    date: "TODO: fecha",
    link: "https://github.com/PedroMorales2/hackaton-usat_v1",
  },
  {
    title: "1er Hackathon de Soluciones Innovadoras en la Prestación de Servicios Públicos",
    org: "Municipalidad Provincial de Chiclayo · CIP CD Lambayeque",
    date: "Nov 2025",
    detail: "Integrante del equipo «Black Coffee»",
    credential: "/docs/certificado-hackathon-chiclayo.pdf",
  },
  {
    title: "TEDxUSAT — Asistente",
    org: "USAT · Facultad de Ciencias Empresariales",
    date: "Nov 2025",
    credential: "/docs/constancia-tedxusat.pdf",
  },
  {
    title: "Tutor par",
    org: "TODO: programa, institución y fecha",
    date: "TODO",
    todo: true,
  },
];
