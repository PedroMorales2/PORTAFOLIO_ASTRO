export const PROFILE = {
  name: "Pedro Morales",
  fullName: "Pedro Estefan Morales Serrato",
  role: "Ingeniero de Software",
  headline: "Construyo software inteligente, de extremo a extremo.",
  tagline:
    "IA aplicada · Full Stack · Móvil · Automatización. Convierto problemas reales en productos que escalan.",
  location: "Chiclayo, Perú",
  availability: "Disponible para oportunidades y freelance",
  // Independiente formal: RUC activo, emite recibos por honorarios (el número de RUC no se publica)
  freelanceNote:
    "Trabajo como independiente formal: emito recibos por honorarios para proyectos freelance.",
  email: "electronico4208978@gmail.com",
  phone: "+51 923 505 083",
  whatsapp: "https://wa.me/51923505083",
  education: {
    degree: "Ingeniería de Sistemas y Computación",
    org: "Universidad Católica Santo Toribio de Mogrovejo (USAT)",
    graduation: "Egreso 2026",
  },
  languages: ["Español — nativo", "Inglés — B1"],
  links: {
    github: "https://github.com/PedroMorales2",
    linkedin: "https://www.linkedin.com/in/pedro-morales-568a62300/",
    resume: "/cv.pdf",
  },
} as const;

export const NAV_LINKS = [
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Trayectoria", href: "#trayectoria" },
  { label: "Stack", href: "#stack" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Filosofía", href: "#filosofia" },
  { label: "Contacto", href: "#contacto" },
] as const;
